import { useEffect, useRef } from 'react'
import { WATER } from './config'
import type { ImpulseKind } from './timeline'

export type WaterAPI = { impulse(kind: ImpulseKind, clientX: number, clientY: number, amp: number): void }

type Impulse = { kind: ImpulseKind; x: number; y: number; t0: number; amp: number }

const BUCKETS = 16 // opacity levels; one fill() per level instead of one per dot
const TAU = Math.PI * 2

/**
 * Dot-matrix water. Height field:
 *   h = Σ aᵢ(t)·sin(kxᵢ·x + kyᵢ·y − ωᵢt)  (travelling waves, slowly breathing amplitudes)
 *     + impulses (radial packets, a planar scan, a broad swell), each damped.
 * h drives dot lift, size and opacity; a depth factor (rows nearer the bottom read
 * closer) gives the field a faint 2.5D surface.
 */
const HERO_MASK =
  '[mask-composite:intersect] [mask-image:linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.55)_38%,#000_66%),linear-gradient(#000_62%,rgba(0,0,0,0.62))]'

type Props = {
  apiRef?: { current: WaterAPI | null }
  /** hero: full motion, settling as the hero scrolls away. calm: settles as this canvas scrolls in. */
  mode?: 'hero' | 'calm'
  /** mask utilities for the canvas edge fades */
  mask?: string
}

export function DotMatrixWater({ apiRef, mode = 'hero', mask = HERO_MASK }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    const waves = WATER.waves.map((w, i) => {
      const k = TAU / w.l, rad = (w.dir * Math.PI) / 180
      return { kx: k * Math.cos(rad), ky: k * Math.sin(rad), w: k * w.c, a: w.a, ph: i * 1.7 }
    })
    const ampSum = waves.reduce((s, w) => s + w.a, 0)
    const NW = waves.length
    const impulses: Impulse[] = []
    const quiet = mode === 'calm' ? 0.5 : 1 // pointer influence

    let w = 0, h = 0, cols = 0, rows = 0, pitch = WATER.spacing, ox = 0, oy = 0
    // sin/cos of the x-part per (wave, column) are fixed per layout; y/t part per frame per row.
    let colS = new Float32Array(0), colC = new Float32Array(0)
    let rowS = new Float32Array(0), rowC = new Float32Array(0)
    let raf = 0, last = 0, slow = 0, cost = 0
    // pointer (client coords), smoothed cursor (canvas coords), bulge strength, last move time
    let px = 0, py = 0, cx = 0, cy = 0, hover = 0, moved = -1e9

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pitch = Math.max(coarse ? WATER.spacingTouch : WATER.spacing, Math.sqrt((w * h) / WATER.maxDots))
      cols = Math.ceil(w / pitch) + 1
      rows = Math.ceil(h / pitch) + 1
      ox = (w - (cols - 1) * pitch) / 2
      oy = (h - (rows - 1) * pitch) / 2
      colS = new Float32Array(NW * cols)
      colC = new Float32Array(NW * cols)
      rowS = new Float32Array(NW * rows)
      rowC = new Float32Array(NW * rows)
      for (let q = 0; q < NW; q++)
        for (let i = 0; i < cols; i++) {
          const a = waves[q].kx * (ox + i * pitch)
          colS[q * cols + i] = Math.sin(a)
          colC[q * cols + i] = Math.cos(a)
        }
      draw(performance.now())
    }

    const P = WATER.impulse
    const draw = (now: number) => {
      if (!w || !h) return // not laid out yet (depth divides by h)
      const t = reduced ? 18 : now / 1000
      for (let i = impulses.length - 1; i >= 0; i--)
        if ((now - impulses[i].t0) / 1000 > P[impulses[i].kind].life) impulses.splice(i, 1)

      // per-row wave terms, amplitudes breathe slowly so the surface never loops visibly
      const amps = waves.map((wv, q) => (wv.a * (0.75 + 0.25 * Math.sin(t * 0.11 * (q + 1) + q))) / ampSum)
      for (let q = 0; q < NW; q++)
        for (let j = 0; j < rows; j++) {
          const b = waves[q].ky * (oy + j * pitch) - waves[q].w * t + waves[q].ph
          rowS[q * rows + j] = Math.sin(b) * amps[q]
          rowC[q * rows + j] = Math.cos(b) * amps[q]
        }

      const imps = impulses.map((m) => {
        const p = P[m.kind], age = (now - m.t0) / 1000
        return {
          m, p, k: TAU / p.wavelength, front: age * p.speed, reach: p.packet * 2.4,
          gain: m.amp * Math.exp(-age / p.decay) * (1 - Math.exp(-age * 4)),
        }
      })
      const n = imps.length
      // scrolling toward the next section settles the surface (full motion at top → 30%)
      const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
      const calm =
        mode === 'calm'
          ? 0.55 - 0.4 * clamp01((innerHeight - canvas.getBoundingClientRect().top) / innerHeight) // → 15% once in view
          : 1 - 0.7 * clamp01(scrollY / (h * 0.9))

      // cursor bulge: eases toward the pointer, fades in while moving and out when idle/away
      hover += ((now - moved < 1400 ? 1 : 0) - hover) * 0.06
      const rect = hover > 0.01 ? canvas.getBoundingClientRect() : null
      if (rect) {
        cx += (px - rect.left - cx) * 0.22
        cy += (py - rect.top - cy) * 0.22
      }
      const C = WATER.cursor, cR2 = C.radius * C.radius, cReach = cR2 * 9

      const paths = Array.from({ length: BUCKETS }, () => new Path2D())
      const aMax = WATER.alpha * 2.4
      for (let j = 0; j < rows; j++) {
        const y0 = oy + j * pitch
        const depth = 0.72 + 0.28 * (y0 / h) // nearer rows slightly larger/darker
        for (let i = 0; i < cols; i++) {
          let x0 = ox + i * pitch
          let v = 0, yPush = 0
          if (rect) {
            const ex = x0 - cx, ey = y0 - cy, d2 = ex * ex + ey * ey
            if (d2 < cReach) {
              const g = hover * Math.exp(-d2 / cR2)
              v += C.amp * g * quiet
              const push = (C.push * g) / Math.sqrt(d2 + 1) // dots part around the cursor
              x0 += ex * push
              yPush = ey * push
            }
          }
          for (let q = 0; q < NW; q++) v += colS[q * cols + i] * rowC[q * rows + j] + colC[q * cols + i] * rowS[q * rows + j]
          v *= 1.6 * calm // ambient sum rarely nears ±1 after normalising; lift it into range

          for (let q = 0; q < n; q++) {
            const im = imps[q]
            const ex = x0 - im.m.x, ey = y0 - im.m.y
            let d: number, fall = 1
            if (im.m.kind === 'scan') {
              d = ex - im.front
              if (d > im.reach || d < -im.reach) continue
              const band = ey / P.scan.band
              fall = Math.exp(-band * band)
            } else {
              const r2 = ex * ex + ey * ey, hi = im.front + im.reach
              if (r2 > hi * hi) continue
              const r = Math.sqrt(r2)
              d = r - im.front
              if (d < -im.reach) continue
              fall = 1 / Math.sqrt(1 + r / 140)
            }
            v += (im.gain * fall * Math.exp(-(d * d) / (im.p.packet * im.p.packet)) * Math.cos(im.k * d))
          }
          if (v > 1) v = 1
          else if (v < -1) v = -1

          const rad = WATER.radius * depth * (1 + 0.68 * v)
          const a = WATER.alpha * depth * (1 + 1.5 * v)
          let b = Math.round((a / aMax) * (BUCKETS - 1))
          if (!(b > 0)) b = 0 // also catches NaN
          else if (b >= BUCKETS) b = BUCKETS - 1
          const y = y0 + yPush - v * WATER.lift * depth
          paths[b].moveTo(x0 + rad, y)
          paths[b].arc(x0, y, rad, 0, TAU)
        }
      }

      ctx.clearRect(0, 0, w, h)
      for (let b = 1; b < BUCKETS; b++) {
        ctx.fillStyle = `rgba(${WATER.color},${((b / (BUCKETS - 1)) * aMax).toFixed(3)})`
        ctx.fill(paths[b])
      }
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      // frame throttling: if a frame costs > 9ms on this device, render at ~30fps
      if (slow && now - last < 31) return
      last = now
      const s = performance.now()
      draw(now)
      cost = cost * 0.9 + (performance.now() - s) * 0.1
      slow = cost > 9 ? 1 : cost < 5 ? 0 : slow
    }
    const start = () => {
      if (!raf && !reduced && !document.hidden && onScreen) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const impulse: WaterAPI['impulse'] = (kind, cx, cy, amp) => {
      if (reduced) return
      const rect = canvas.getBoundingClientRect()
      impulses.push({ kind, x: cx - rect.left, y: cy - rect.top, t0: performance.now(), amp })
      if (impulses.length > WATER.maxImpulses) impulses.shift()
    }
    if (apiRef) apiRef.current = { impulse }

    // Pointer: coalesce movement into sparse local impulses; mouse only.
    let lx = -1e4, ly = -1e4, lt = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const now = performance.now()
      if (hover < 0.01) {
        // bulge was gone: start it at the pointer instead of sliding in from the old spot
        const r = canvas.getBoundingClientRect()
        cx = e.clientX - r.left; cy = e.clientY - r.top
      }
      px = e.clientX; py = e.clientY; moved = now
      if (now - lt < 70 || Math.hypot(e.clientX - lx, e.clientY - ly) < 36) return
      lx = e.clientX; ly = e.clientY; lt = now
      impulse('radial', e.clientX, e.clientY, WATER.amp.pointer * quiet)
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') impulse('radial', e.clientX, e.clientY, WATER.amp.click * quiet)
    }
    const onLeave = () => (moved = -1e9)
    const onVis = () => (document.hidden ? stop() : start())

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    // no drawing while the hero is scrolled out of view
    let onScreen = true
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)
    resize()
    if (!reduced) {
      addEventListener('pointermove', onMove, { passive: true })
      addEventListener('pointerdown', onDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      document.addEventListener('visibilitychange', onVis)
      start()
    }
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerdown', onDown)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      if (apiRef) apiRef.current = null
    }
  }, [apiRef, mode])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${mask}`}
    />
  )
}
