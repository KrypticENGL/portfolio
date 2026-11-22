import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { EASE, TIMING, WORDS } from './config'

const word: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: TIMING.charStagger } },
  exit: { transition: { staggerChildren: TIMING.charStagger * 0.6 } },
}
const char: Variants = {
  initial: { y: '110%', opacity: 0 },
  animate: { y: '0%', opacity: 1, transition: { duration: TIMING.wordIn, ease: EASE } },
  exit: { y: '-110%', opacity: 0, transition: { duration: TIMING.wordOut, ease: EASE } },
}

export function AnimatedWords({ onWord }: { onWord?: (w: string) => void }) {
  const [i, setI] = useState(-1)

  useEffect(() => {
    let id: number
    const first = window.setTimeout(() => {
      setI(0)
      id = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), (TIMING.wordHold + TIMING.wordIn) * 1000)
    }, TIMING.firstWord * 1000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (i >= 0) onWord?.(WORDS[i])
  }, [i, onWord])

  return (
    <p className="relative h-[1.12em] overflow-hidden text-[clamp(3.6rem,8.2vw,7.5rem)] leading-none font-semibold tracking-[-0.055em]">
      <span className="sr-only">{WORDS.join(', ')}</span>
      <AnimatePresence initial>
        {i >= 0 && (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute top-0 left-0 flex whitespace-pre"
            variants={word}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...WORDS[i]].map((c, n) => (
              <motion.span key={n} variants={char} className="inline-block pb-[0.12em] will-change-transform">
                {c}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </p>
  )
}
