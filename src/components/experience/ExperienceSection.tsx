'use client'

import { at, useReveal } from '../useReveal'
import { ExperienceTimeline } from './ExperienceTimeline'
import { EXPERIENCE, formatRange, isComplete } from './experience'

/** 02 / Experience. Entries missing a company, role or start date are left out, never guessed. */
export function ExperienceSection() {
  const ref = useReveal<HTMLElement>()
  const entries = EXPERIENCE.filter(isComplete)
  const work = entries.filter((e) => !e.education)
  const education = entries.filter((e) => e.education)
  if (!entries.length) return null

  return (
    <section ref={ref} id="experience" aria-labelledby="experience-title" className="relative bg-paper px-[7vw]">
      <div className="border-t border-ink/10" />
      <div className="grid gap-y-14 pt-[clamp(5rem,14vh,9rem)] pb-[clamp(5rem,14vh,9rem)] lg:grid-cols-[38fr_62fr] lg:gap-x-[6vw]">
        <header className="self-start lg:sticky lg:top-[14vh]">
          <p className="rv font-mono text-[0.75rem] tracking-[0.14em] text-neutral-500 uppercase" style={at(0)}>
            02 / Experience
          </p>
          <h2
            id="experience-title"
            className="rv mt-5 text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
            style={at(1)}
          >
            Where I&rsquo;ve worked.
          </h2>
        </header>

        <div className="lg:pt-[3.1rem]">
          {work.length > 0 && <ExperienceTimeline entries={work} />}
          {education.length > 0 && (
            <div className="rv tl-edu" style={at(work.length + 1)}>
              <h3 className="tl-edu-title">Education</h3>
              <ul>
                {education.map((e) => (
                  <li key={`${e.company}-${e.role}`}>
                    {/* nbsp keeps the separator on the role's line when the company wraps */}
                    <span className="tl-edu-role">{e.role}</span>{' ·'} {e.company}
                    <time dateTime={e.start!} className="tl-edu-date">{formatRange(e)}</time>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
