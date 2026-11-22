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
    <div className="relative text-[clamp(3.6rem,8.2vw,7.5rem)] leading-none font-semibold tracking-[-0.055em] [--ill-h:calc(var(--ill-w)*0.5)] [--ill-w:clamp(184px,15.5vw,240px)]">
      <p className="sr-only">Develop, build, test, deploy.</p>
      <div aria-hidden="true" className="relative h-[calc(1.12em+var(--ill-h)+0.9rem)] overflow-hidden lg:h-[1.12em]">
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              key={step}
              className="absolute inset-x-0 top-0 flex flex-col items-start gap-[0.9rem] lg:h-full lg:flex-row lg:items-center lg:gap-[0.26em]"
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
