'use client'

import { Fragment } from 'react'
import { at, useReveal } from '../useReveal'
import { SkillsExplorer } from './SkillsExplorer'
import { INDEX } from './skills'

/** 01 / The Toolkit. */
export function SkillsSection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="toolkit" aria-labelledby="toolkit-title" className="sk relative isolate bg-paper px-[7vw]">
      <div aria-hidden="true" className="sk-texture" />

      <div className="grid gap-y-14 pt-[clamp(5rem,15vh,9.5rem)] pb-[clamp(5rem,14vh,9rem)] lg:grid-cols-[38fr_62fr] lg:gap-x-[6vw]">
        <header className="flex flex-col">
          <p className="rv font-mono text-[0.75rem] tracking-[0.14em] text-neutral-500 uppercase" style={at(0)}>
            01 / The Toolkit
          </p>
          <h2
            id="toolkit-title"
            className="rv mt-5 text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
            style={at(1)}
          >
            Tools of the trade.
          </h2>
          <p
            className="rv mt-4 max-w-[30ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-snug tracking-[-0.01em] text-neutral-500"
            style={at(2)}
          >
            Things I use to turn ideas into working software.
          </p>

          <dl className="rv mt-12 grid gap-5 border-t border-ink/10 pt-6 sm:grid-cols-2 lg:grid-cols-1" style={at(3)}>
            {INDEX.map((g) => (
              <div key={g.label}>
                <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-neutral-400 uppercase">{g.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-neutral-700">
                  {g.items.map((s, n) => (
                    // names never break; lines wrap only at the space after each slash
                    <Fragment key={s}>
                      <span className="whitespace-nowrap">
                        {s}
                        {n < g.items.length - 1 && <span className="pl-1.5 text-neutral-300">/</span>}
                      </span>{' '}
                    </Fragment>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="flex min-w-0 flex-col lg:pt-[3.1rem]">
          <div className="rv rv-mask" style={at(2)}>
            <SkillsExplorer />
          </div>
          <p className="rv mt-5 font-mono text-[0.8125rem] leading-relaxed text-neutral-400" style={at(4)}>
            <span className="block">{'// competitive programming: a short-lived career.'}</span>
            <span className="block">{'// archived, not deleted.'}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
