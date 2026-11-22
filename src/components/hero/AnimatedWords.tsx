import { AnimatePresence, motion, type Variants } from 'motion/react'
import { EASE, TIMING } from './config'
import { PHASE_ILLUSTRATIONS } from './phases'
import { PHASES } from './timeline'

const group: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: TIMING.charStagger } },
  exit: { transition: { staggerChildren: TIMING.charStagger * 0.6 } },
}
const char: Variants = {
  initial: { y: '110%', opacity: 0 },
  animate: { y: '0%', opacity: 1, transition: { duration: TIMING.wordIn, ease: EASE } },
  exit: { y: '-110%', opacity: 0, transition: { duration: TIMING.wordOut, ease: EASE } },
}
const card: Variants = {
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: TIMING.wordIn, ease: EASE, delay: 0.08 } },
  exit: { y: -14, opacity: 0, transition: { duration: TIMING.wordOut * 0.8, ease: EASE } },
}

/**
 * Phase word + its illustration, entering and leaving as one group inside a mask.
 * `step` comes from usePhaseAnimation; a new key per step remounts the card so its
 * CSS timeline restarts from zero.
 */
export function AnimatedWords({ step, illRef }: { step: number; illRef: { current: HTMLDivElement | null } }) {
  const i = step % PHASES.length
  const Illustration = PHASE_ILLUSTRATIONS[i]
  return (
    <div className="phase-player">
      <p className="sr-only">Develop, build, test, deploy.</p>
      <div aria-hidden="true" className="phase-window">
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              key={step}
              className="phase-step"
              variants={group}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="flex whitespace-pre">
                {[...PHASES[i].word].map((c, n) => (
                  <motion.span key={n} variants={char} className="inline-block pb-[0.12em] will-change-transform">
                    {c}
                  </motion.span>
                ))}
              </span>
              {/* only the newest card claims the ref; the exiting one's null is ignored */}
              <motion.div variants={card} ref={(el) => void (el && (illRef.current = el))} className="lg:mb-[0.06em]">
                <Illustration />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
