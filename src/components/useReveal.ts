import { useEffect, useRef, type CSSProperties } from 'react'

/** Stagger index for `.rv` children: `style={at(2)}`. */
export const at = (i: number) => ({ '--i': i }) as CSSProperties

/**
 * Scroll reveal for an element whose `.rv` children animate in (see styles/skills.css).
 * Content is server-rendered visible; the reveal only arms itself (data-reveal="wait")
 * once JS confirms the element is still below the fold, so nothing is ever hidden
 * waiting for animation code. Skipped entirely under reduced motion.
 */
export function useReveal<T extends HTMLElement>(margin = '-18%') {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < innerHeight * 0.85) return
    el.dataset.reveal = 'wait'
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.reveal = 'in'
        io.disconnect()
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return ref
}
