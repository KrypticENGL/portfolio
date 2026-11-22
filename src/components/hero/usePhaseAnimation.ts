import { useEffect, useRef, useState } from 'react'
import { PHASES, type PhaseEvent } from './timeline'

/**
 * The one phase clock. Returns a monotonically increasing step (-1 before the
 * first phase); phase = step % PHASES.length. Each phase's background events are
 * scheduled from the same timer chain, so word, illustration and water stay in sync.
 * Pauses while the tab is hidden and resumes with the next phase.
 */
export function usePhaseAnimation(firstDelay: number, onEvent: (e: PhaseEvent) => void) {
  const [step, setStep] = useState(-1)
  const onEventRef = useRef(onEvent)
  useEffect(() => {
    onEventRef.current = onEvent
  })

  useEffect(() => {
    let timers: number[] = []
    let current = -1
    const clear = () => {
      timers.forEach(clearTimeout)
      timers = []
    }
    const schedule = (s: number, delay: number) => {
      timers.push(
        window.setTimeout(() => {
          clear()
          current = s
          setStep(s)
          const phase = PHASES[s % PHASES.length]
          for (const e of phase.events) timers.push(window.setTimeout(() => onEventRef.current(e), e.t * 1000))
          schedule(s + 1, phase.duration)
        }, delay * 1000),
      )
    }
    const onVis = () => {
      clear()
      if (!document.hidden) schedule(current + 1, current < 0 ? firstDelay : 0.4)
    }
    schedule(0, firstDelay)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clear()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [firstDelay])

  return step
}
