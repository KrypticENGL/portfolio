'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { DotMatrixWater, type WaterAPI } from '../hero/DotMatrixWater'
import { SkillIcon } from '../skills/icons'
import { useReveal } from '../useReveal'
import { CopyButton } from './CopyButton'
import { CONTACT } from './contact'

/** `resume`: URL of a CV to link, or null to hide the link (resolved at build time in app/page.tsx). */
export function ContactSection({ resume }: { resume: string | null }) {
  const section = useReveal<HTMLElement>('-8%')
  const water = useRef<WaterAPI | null>(null)

  function ripple(link: HTMLAnchorElement) {
    const bounds = link.getBoundingClientRect()
    water.current?.impulse('radial', bounds.right - 10, bounds.top + bounds.height / 2, 0.85)
  }

  return (
    <section ref={section} id="contact" aria-labelledby="contact-title" className="ct-scene">
      <DotMatrixWater apiRef={water} mode="calm" mask="ct-surface" />
      <div className="ct-content">
        <p className="ct-label">04 / CONTACT</p>
        <h2 id="contact-title" className="ct-title">
          <span className="ct-line"><span className="ct-line-in">Have an idea?</span></span>{' '}
          <span className="ct-line"><span className="ct-line-in">Let&rsquo;s make it real<span className="ct-stop">.</span></span></span>
        </h2>
        <p className="ct-description">
          An interesting project, a collaboration, or just a conversation about technology? My inbox is open.
        </p>
        <div className="ct-address">
          <a href={`mailto:${CONTACT.email}`} className="ct-email"
            onPointerEnter={e => ripple(e.currentTarget)} onFocus={e => ripple(e.currentTarget)}>
            <span className="ct-email-text">{CONTACT.email}</span>
            <ArrowUpRight aria-hidden="true" className="ct-email-arrow" strokeWidth={1.6} />
          </a>
          <CopyButton text={CONTACT.email} label="Copy email address" />
        </div>
        <div className="ct-directory">
          <div className="ct-profiles">
            <a href={`tel:${CONTACT.phone.tel}`} className="ct-link">{CONTACT.phone.display}</a>
            {resume && <a href={resume} className="ct-link">Résumé (PDF)</a>}
          </div>
          <nav aria-label="Social profiles" className="ct-profiles">
            {CONTACT.socials.map(profile => (
              <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer"
                className="ct-social" aria-label={`${profile.name}, ${profile.handle} (opens in a new tab)`}>
                <SkillIcon id={profile.icon} className="ct-mono-icon" />
                {profile.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
