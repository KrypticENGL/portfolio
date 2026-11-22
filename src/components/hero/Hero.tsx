'use client'

import { useCallback, useRef } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { AnimatedWords } from './AnimatedWords'
import { DotMatrixWater, type WaterAPI } from './DotMatrixWater'
import { Portrait } from './Portrait'
import { EASE, TIMING } from './config'
import type { PhaseEvent } from './timeline'
import { usePhaseAnimation } from './usePhaseAnimation'

const HEADING: { text: string; className: string }[] = [
  { text: 'From', className: '' },
  { text: 'localhost', className: 'text-neutral-400 font-normal' },
  { text: 'to', className: '' },
  { text: '.com', className: 'font-semibold' },
]

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
    // reducedMotion="user": transforms are dropped, opacity fades remain
    <MotionConfig reducedMotion="user">
    <section
      aria-label="Introduction"
      className="relative isolate grid min-h-svh grid-cols-1 grid-rows-[auto_1fr] lg:grid-rows-1 overflow-hidden bg-paper px-[7vw] lg:h-svh lg:grid-cols-[58fr_42fr]"
    >
      <DotMatrixWater apiRef={water} />

      <div className="relative z-10 flex flex-col justify-center pt-[14svh] pb-10 lg:py-0">
        <h1 className="text-[clamp(1.9rem,3.6vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.035em]">
          {HEADING.map((w, n) => (
            <span key={w.text} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className={`inline-block ${w.className}`}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: TIMING.heading + n * 0.09, duration: 0.85, ease: EASE }}
              >
                {w.text}
              </motion.span>
              {n < HEADING.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <div className="mt-[clamp(0.75rem,2.2vh,1.75rem)] -ml-[0.04em]">
          <AnimatedWords step={step} illRef={illRef} />
        </div>

        <motion.div
          className="mt-[clamp(1.75rem,5vh,3.5rem)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TIMING.identity, duration: 0.9, ease: EASE }}
        >
          <p className="text-[clamp(1.25rem,1.9vw,1.75rem)] leading-tight font-medium tracking-[-0.02em]">
            Phanishwar Lal
          </p>
          <p className="mt-1.5 text-[clamp(0.95rem,1.15vw,1.0625rem)] tracking-[-0.005em] text-neutral-500">
            (aka KrypticENGL)
          </p>
        </motion.div>
      </div>

      <div className="relative z-20 -mx-[7vw] min-h-[46svh] lg:mr-[-7vw] lg:ml-0 lg:mt-[9svh] lg:h-auto">
        <Portrait />
      </div>
    </section>
    </MotionConfig>
  )
}
