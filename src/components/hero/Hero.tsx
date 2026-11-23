'use client'

import { useCallback, useRef } from 'react'
import { MotionConfig } from 'motion/react'
import { AnimatedWords } from './AnimatedWords'
import { DotMatrixWater, type WaterAPI } from './DotMatrixWater'
import { Portrait } from './Portrait'
import { TIMING } from './config'
import type { PhaseEvent } from './timeline'
import { usePhaseAnimation } from './usePhaseAnimation'

export function Hero() {
  const water = useRef<WaterAPI | null>(null)
  const illRef = useRef<HTMLDivElement | null>(null)

  // Phase events (keystrokes, hammer hits, test scan, deploy swell) disturb the water
  // at the matching point of the current illustration card.
  const onEvent = useCallback((e: PhaseEvent) => {
    const el = illRef.current
    if (!el || !water.current) return
    const r = el.getBoundingClientRect()
    water.current.impulse(e.kind, r.left + e.fx * r.width, r.top + e.fy * r.height, e.amp)
  }, [])
  const step = usePhaseAnimation(TIMING.firstWord, onEvent)

  return (
    <MotionConfig reducedMotion="user">
      <section className="cover" aria-label="Introduction">
        <DotMatrixWater apiRef={water} mask="cover-water" />
        <header className="cover-bar">
          <a className="cover-signature" href="#intro-title">KrypticENGL<span>.</span></a>
          <nav aria-label="Portfolio sections">
            <a href="#toolkit">Toolkit</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        <div className="cover-stage">
          <div className="cover-art">
            <svg className="cover-disc" viewBox="0 0 500 500" aria-hidden="true">
              {Array.from({ length: 68 }, (_, i) => (
                <circle key={i} cx="180" cy="310" r={3 + i * 7} fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.45" />
              ))}
            </svg>
            <Portrait />
          </div>
          <div className="cover-type">
            <p className="cover-byline">Phanishwar Lal</p>
            <h1 id="intro-title"><span>From</span> localhost<br /><i>to</i> <b>.com</b></h1>
            <p className="cover-role">
              Backend intern at MarketMaze and BCA student at Amity University Patna. I build native Windows tools in Rust, and web apps.
            </p>
          </div>
          <div className="cover-phase">
            <AnimatedWords step={step} illRef={illRef} />
          </div>
        </div>
        <div className="cover-foot">
          <span>Phanishwar Lal / KrypticENGL</span>
          <div className="cover-foot-links">
            <a href="#contact">Contact</a>
            <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
