'use client'

import { useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { Motif, Project } from './projects'

/**
 * A real screenshot (with a very light parallax) when the project has one; otherwise a
 * typographic preview with an abstract motif. The preview is deliberately not styled
 * like a screenshot: no window chrome, no fake UI.
 */
export function ProjectVisual({ project, number }: { project: Project; number: string }) {
  return (
    <div className="pv">
      {project.image ? <Screenshot src={project.image.src} alt={project.image.alt} /> : <Preview project={project} number={number} />}
    </div>
  )
}

function Screenshot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y }} className="pv-shot" loading="lazy" decoding="async" />
    </div>
  )
}

function Preview({ project, number }: { project: Project; number: string }) {
  return (
    <div className="pv-preview" aria-hidden="true">
      <div className="pv-dots" />
      <div className="pv-motif">
        <MotifArt kind={project.motif} />
      </div>
      <span className="pv-corner pv-tl">
        {number} / {project.slug}
      </span>
      {project.status && <span className="pv-corner pv-tr">{project.status}</span>}
      <span className="pv-title">{project.title}</span>
    </div>
  )
}

// Nirvana's own "Electronic" equalizer preset (dB per band, 32 Hz … 16 kHz).
const EQ = [6, 5, 1, 0, -2, 1, 0, 2, 5, 6]
// A small call graph: [x, y] nodes and [from, to] edges; node 0 is the level's subject.
const NODES = [
  [250, 112], [188, 70], [322, 64], [338, 150], [196, 166], [266, 196], [130, 118], [384, 104], [140, 196],
]
const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 7], [3, 7], [4, 8], [4, 6], [5, 3],
]

function MotifArt({ kind }: { kind: Motif }) {
  if (kind === 'none') return null
  return (
    <svg viewBox="0 0 420 240" className="h-full w-full" fill="none">
      {kind === 'ink' && (
        <>
          <path
            d="M96 168 C 128 92, 176 70, 204 118 S 262 196, 300 140 S 352 62, 378 84"
            pathLength={1}
            className="pv-draw"
          />
          <circle cx="378" cy="84" r="4.5" className="pv-fill" />
          {/* a toolbar pill: grip, three swatches, mode */}
          <rect x="96" y="40" width="132" height="26" rx="13" className="pv-stroke" />
          <path d="M110 48v10M115 48v10" className="pv-stroke" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={134 + i * 17} cy="53" r="5" className={i === 0 ? 'pv-fill' : 'pv-stroke'} />
          ))}
          <text x="190" y="57" className="pv-mono">
            Draw
          </text>
        </>
      )}
      {kind === 'graph' && (
        <>
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} className="pv-edge" />
          ))}
          <circle cx={NODES[0][0]} cy={NODES[0][1]} r="15" className="pv-stroke pv-ring" />
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 5} className={i === 0 ? 'pv-fill' : 'pv-node'} />
          ))}
        </>
      )}
      {kind === 'eq' &&
        EQ.map((g, i) =>
          Array.from({ length: 4 + g }, (_, k) => (
            <circle key={`${i}-${k}`} cx={92 + i * 26} cy={196 - k * 13} r="4" className="pv-fill pv-eq" style={{ '--k': k } as CSSProperties} />
          )),
        )}
      {kind === 'frame' && (
        <>
          <rect x="120" y="44" width="196" height="110" rx="4" className="pv-stroke" />
          <path d="M208 82 L236 99 L208 116 Z" className="pv-fill" />
          <line x1="120" y1="182" x2="316" y2="182" className="pv-edge" />
          <circle cx="120" cy="182" r="4.5" className="pv-fill" />
        </>
      )}
    </svg>
  )
}
