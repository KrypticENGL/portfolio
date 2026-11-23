'use client'

import { useEffect, useState } from 'react'

export const SECTIONS = [
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
] as const

/**
 * Way back once the hero's own nav has scrolled away: slides in while the reader scrolls up,
 * hides while they scroll down or are back on the hero. Hidden = visibility:hidden, so it is
 * out of the tab order and the accessibility tree until shown.
 */
export function SiteBar() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.cover')
    let lastY = scrollY
    let frame = 0
    const update = () => {
      const y = scrollY
      if (y < (hero?.offsetHeight ?? innerHeight)) setShown(false)
      else if (Math.abs(y - lastY) > 6) setShown(y < lastY)
      else return // ignore jitter; keep lastY so slow scrolls still register
      lastY = y
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header className="site-bar" data-shown={shown || undefined}>
      <a className="cover-signature" href="#intro-title">KrypticENGL<span>.</span></a>
      <nav aria-label="Jump to section">
        {SECTIONS.map((s) => (
          <a key={s.href} href={s.href}>{s.label}</a>
        ))}
      </nav>
    </header>
  )
}
