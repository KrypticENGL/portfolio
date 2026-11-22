import { useEffect, useRef } from 'react'
import { DOTS } from './config'

type Ripple = { x: number; y: number; t0: number; amp: number }
export type RippleFn = (x: number, y: number, amp: number) => void

const BUCKETS = 14 // alpha levels; one fill() per level instead of one per dot

/**
 * Canvas dot field. Each ripple is a damped, outward-travelling ring packet:
 *   h = A · e^(-((r-ct)/w)²) · cos(k(r-ct)) · e^(-t/τ) / √(1 + r/150)
 * Dots read h as size, opacity and a tiny radial shift.
 */
export function DotMatrixRipple({ apiRef }: { apiRef?: { current: RippleFn | null } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ripples: Ripple[] = []
    let w = 0, h = 0, cols = 0, rows = 0, spacing = DOTS.spacing, ox = 0, oy = 0
    let raf = 0
    let dirty = true
    let nextAmbient = performance.now() + 400
    const k = (Math.PI * 2) / DOTS.wavelength

    const add: RippleFn = (x, y, amp) => {
      if (reduced) return
      ripples.push({ x, y, t0: performance.now(), amp })
      if (ripples.length > DOTS.maxRipples) ripples.shift()
      start()
    }
    if (apiRef) apiRef.current = add

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spacing = w < 640 ? DOTS.spacingMobile : DOTS.spacing
      cols = Math.ceil(w / spacing) + 1
      rows = Math.ceil(h / spacing) + 1
      ox = (w - (cols - 1) * spacing) / 2 // center the grid
      oy = (h - (rows - 1) * spacing) / 2
      dirty = true
      draw(performance.now())
    }

    const draw = (now: number) => {
      for (let i = ripples.length - 1; i >= 0; i--)
        if ((now - ripples[i].t0) / 1000 > DOTS.life) ripples.splice(i, 1)
      if (!dirty && ripples.length === 0) return
      dirty = ripples.length > 0

      const paths = Array.from({ length: BUCKETS }, () => new Path2D())
      const n = ripples.length
      const ages = ripples.map((r) => (now - r.t0) / 1000)
      const gains = ripples.map((r, i) => r.amp * Math.exp(-ages[i] / DOTS.decay) * (1 - Math.exp(-ages[i] * 3)))
      const fronts = ages.map((a) => a * DOTS.speed)
      const reach = DOTS.packet * 2.5

      for (let j = 0; j < rows; j++) {
        const y0 = oy + j * spacing
        for (let i = 0; i < cols; i++) {
          const x0 = ox + i * spacing
          let hgt = 0, dx = 0, dy = 0
          for (let q = 0; q < n; q++) {
            const rp = ripples[q]
            const ex = x0 - rp.x, ey = y0 - rp.y
            const r = Math.sqrt(ex * ex + ey * ey) || 1
            const d = r - fronts[q]
            if (d > reach || d < -reach) continue
            const env = Math.exp(-(d * d) / (DOTS.packet * DOTS.packet))
            const v = (gains[q] * env * Math.cos(k * d)) / Math.sqrt(1 + r / 150)
            hgt += v
            dx += (v * ex) / r
            dy += (v * ey) / r
          }
          if (hgt > 1) hgt = 1
          else if (hgt < -1) hgt = -1
          const rad = DOTS.radius * (1 + 0.75 * hgt)
          const a = DOTS.alpha * (1 + 1.5 * hgt)
          const b = Math.max(0, Math.min(BUCKETS - 1, Math.round((a / (DOTS.alpha * 2.5)) * (BUCKETS - 1))))
          const x = x0 + dx * DOTS.displacement
          const y = y0 + dy * DOTS.displacement
          paths[b].moveTo(x + rad, y)
          paths[b].arc(x, y, rad, 0, Math.PI * 2)
        }
      }

      ctx.clearRect(0, 0, w, h)
      for (let b = 0; b < BUCKETS; b++) {
        ctx.fillStyle = `rgba(${DOTS.color},${((b / (BUCKETS - 1)) * DOTS.alpha * 2.5).toFixed(3)})`
        ctx.fill(paths[b])
      }
    }

    const tick = (now: number) => {
      if (now >= nextAmbient) {
        const [lo, hi] = DOTS.ambientEvery
        nextAmbient = now + (lo + Math.random() * (hi - lo)) * 1000
        add(Math.random() * w, Math.random() * h, DOTS.amp.ambient * (0.7 + Math.random() * 0.3))
      }
      draw(now)
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!raf && !reduced && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // Pointer: coalesce moves into sparse, soft ripples; mouse only (touch would be noisy).
    let lastX = -1e4, lastY = -1e4, lastT = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left, y = e.clientY - rect.top
      const now = performance.now()
      if (now - lastT < 140 || Math.hypot(x - lastX, y - lastY) < 70) return
      lastX = x; lastY = y; lastT = now
      add(x, y, DOTS.amp.pointer)
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      add(e.clientX - rect.left, e.clientY - rect.top, DOTS.amp.click)
    }
    const onVis = () => {
      if (document.hidden) stop()
      else {
        nextAmbient = performance.now() + 800
        start()
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    if (!reduced) {
      addEventListener('pointermove', onMove, { passive: true })
      addEventListener('pointerdown', onDown, { passive: true })
      document.addEventListener('visibilitychange', onVis)
      start()
    }
    return () => {
      stop()
      ro.disconnect()
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVis)
      if (apiRef) apiRef.current = null
    }
  }, [apiRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_48%_42%_at_30%_50%,rgba(0,0,0,0.45),#000)]"
    />
  )
}
