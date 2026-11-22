'use client'

import { useRef, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { DotMatrixWater, type WaterAPI } from '../hero/DotMatrixWater'
import { ICONS, logoUrl, type IconId } from '../skills/icons'
import { at, useReveal } from '../useReveal'
import { CopyButton } from './CopyButton'
import { CONTACT } from './contact'

// Water fades in from the section above and stays faint behind the text column.
const MASK =
  '[mask-composite:intersect] [mask-image:linear-gradient(transparent,#000_30%,#000_80%,rgba(0,0,0,0.4)),linear-gradient(90deg,rgba(0,0,0,0.35),rgba(0,0,0,0.5)_45%,#000_80%)]'

/** 05 / Contact: the closing scene. The water settles; reaching for the email sends one ripple. */
export function ContactSection() {
  const ref = useReveal<HTMLElement>('-10%')
  const water = useRef<WaterAPI | null>(null)

  // A new connection: one ripple from the email link, at most once per hover/focus.
  const ripple = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    water.current?.impulse('radial', r.left + r.width * 0.5, r.top + r.height * 0.5, 0.6)
  }

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-paper px-[7vw]"
    >
      <DotMatrixWater apiRef={water} mode="calm" mask={MASK} />
      <div className="relative border-t border-ink/10" />

      <div className="relative pt-[clamp(5rem,15vh,10rem)] pb-[clamp(5rem,14vh,9rem)]">
        <p className="rv font-mono text-[0.75rem] tracking-[0.14em] text-neutral-500 uppercase" style={at(0)}>
          05 / Contact
        </p>

        <h2
          id="contact-title"
          className="mt-6 text-[clamp(3rem,9.2vw,9.5rem)] leading-[0.98] font-semibold tracking-[-0.06em]"
        >
          <span className="ct-line">
            <span className="ct-line-in">Have an idea?</span>
          </span>
          <span className="ct-line">
            <span className="ct-line-in text-[#5c5c59]" style={{ '--d': '0.16s' } as CSSProperties}>
              Let&rsquo;s make it real.
            </span>
          </span>
        </h2>

        <div className="mt-[clamp(2.5rem,7vh,4.5rem)] grid gap-y-12 lg:grid-cols-[38fr_62fr] lg:gap-x-[6vw]">
          <p
            className="rv max-w-[34ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-snug tracking-[-0.01em] text-neutral-500"
            style={at(4)}
          >
            An interesting project, a collaboration, or just a conversation about technology? My inbox is open.
          </p>

          <div className="min-w-0">
            <p className="rv font-mono text-[0.6875rem] tracking-[0.12em] text-neutral-400 uppercase" style={at(4)}>
              Email
            </p>
            <div className="rv mt-3 flex flex-wrap items-center gap-x-5 gap-y-3" style={at(5)}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="ct-email"
                onPointerEnter={(e) => ripple(e.currentTarget)}
                onFocus={(e) => ripple(e.currentTarget)}
              >
                <span className="ct-email-text">{CONTACT.email}</span>
                <ArrowUpRight aria-hidden="true" className="ct-email-arrow" strokeWidth={1.6} />
              </a>
              <CopyButton text={CONTACT.email} label={`Copy email address ${CONTACT.email}`} />
            </div>

            <dl className="rv mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2" style={at(6)}>
              <div>
                <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-neutral-400 uppercase">Phone</dt>
                <dd className="mt-2">
                  <a href={`tel:${CONTACT.phone.tel}`} className="ct-link text-[1.0625rem] tracking-[-0.01em]">
                    {CONTACT.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-neutral-400 uppercase">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {CONTACT.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ct-social"
                      aria-label={`${s.name}: ${s.handle} (opens in a new tab)`}
                    >
                      <MonoIcon id={s.icon} />
                      {s.name}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Brand mark recoloured to the current text colour via a CSS mask, so it stays monochrome. */
function MonoIcon({ id }: { id: IconId }) {
  const entry = ICONS[id]
  const url = 'logo' in entry ? logoUrl(entry.logo) : ''
  return <span aria-hidden="true" className="ct-mono-icon" style={{ '--icon': `url("${url}")` } as CSSProperties} />
}
