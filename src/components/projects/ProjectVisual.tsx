'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

import type { Project } from './projects'

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

const nodes = [[188,155],[84,99],[247,64],[314,158],[129,216],[220,233],[46,166],[346,94],[68,227]]
const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,7],[3,7],[4,8],[4,6],[5,3]]

function Preview({ project, number }: { project: Project; number: string }) {
  return (
    <div className={`plate plate-${project.motif}`}>
      <div className="plate-meta"><span>{number} / {project.slug}</span><span>{project.status}</span></div>
      {project.motif === 'ink' && <InkStudy />}
      {project.motif === 'graph' && (
        <svg className="graph-study" viewBox="0 0 400 270" aria-hidden="true">
          {Array.from({ length: 5 }, (_, layer) => (
            <g key={layer} transform={`translate(${layer * 6}, ${-layer * 9})`} opacity={0.22 + layer * 0.18}>
              {edges.map(([a,b]) => <line key={a + '-' + b} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
              {nodes.map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i === 0 ? 8 : 4} />)}
            </g>
          ))}
        </svg>
      )}
      {project.motif === 'eq' && <div className="record-study" aria-hidden="true"><i /></div>}
      {project.motif === 'frame' && <div className="film-study" aria-hidden="true">{[0,1,2,3,4].map(i => <i key={i} style={{left: i * 13 + '%', top: i * 9 + '%'}} />)}</div>}
      <span className="plate-title" aria-hidden="true">{project.title}</span>
    </div>
  )
}

/** A small drawing surface for trying Annotator's central idea. */
function InkStudy() {
  const [drawing, setDrawing] = useState(false)
  const surface = useRef<SVGSVGElement>(null)
  const ink = useRef<SVGGElement>(null)
  const pen = useRef<SVGPathElement | null>(null)

  function point(event: PointerEvent<SVGSVGElement>) {
    const matrix = surface.current?.getScreenCTM()
    if (!matrix) return null
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  }

  function begin(event: PointerEvent<SVGSVGElement>) {
    const at = point(event)
    if (!drawing || !at || !ink.current || !event.isPrimary || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M' + at + ' l0.1 0')
    ink.current.append(path)
    pen.current = path
  }

  function move(event: PointerEvent<SVGSVGElement>) {
    if (!pen.current || !event.isPrimary) return
    const at = point(event)
    if (at) pen.current.setAttribute('d', pen.current.getAttribute('d') + ' L' + at)
  }

  return <>
    <svg ref={surface} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      className="ink-study" data-drawing={drawing} onPointerDown={begin} onPointerMove={move}
      onLostPointerCapture={() => { pen.current = null }}>
      <g fill="none" stroke="currentColor" strokeWidth=".95">
        {Array.from({length: 34}, (_, i) => (
          <path key={i} d={`M -20 ${202-i} C ${50+i*2} ${204-i*4}, ${89+i} ${-10+i*2}, ${152+i} ${98+i*1.6} S ${260+i*2} ${212-i*4}, 427 ${26+i*1.4}`} />
        ))}
      </g>
      <g ref={ink} fill="none" stroke="#a72818" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <button className="ink-toggle" type="button" data-active={drawing || undefined}
      // finishing keeps the drawing; starting again begins on a clean surface
      onClick={() => { if (!drawing) ink.current?.replaceChildren(); setDrawing(!drawing) }}>
      {drawing ? 'Done' : 'Try drawing'}
    </button>
  </>
}
