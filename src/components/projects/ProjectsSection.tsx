'use client'

import { at, useReveal } from '../useReveal'
import { ProjectLinks } from './ProjectLinks'
import { ProjectShowcase } from './ProjectShowcase'
import { PROJECTS } from './projects'

const featured = PROJECTS.filter((p) => !p.brief)
const brief = PROJECTS.filter((p) => p.brief)

/** 03 / Work. */
export function ProjectsSection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-paper px-[7vw]">
      <div className="border-t border-ink/10" />
      <header ref={ref} className="pt-[clamp(5rem,14vh,9rem)] pb-[clamp(3.5rem,9vh,6rem)]">
        <p className="rv font-mono text-[0.75rem] tracking-[0.14em] text-neutral-500 uppercase" style={at(0)}>
          03 / Work
        </p>
        <h2
          id="work-title"
          className="rv mt-5 text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
          style={at(1)}
        >
          Things I&rsquo;ve built.
        </h2>
        <p
          className="rv mt-4 max-w-[34ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-snug tracking-[-0.01em] text-neutral-500"
          style={at(2)}
        >
          A selection of experiments, tools, and applications.
        </p>
      </header>

      <div className="project-gallery">
        {featured.map((p, i) => (
          <ProjectShowcase key={p.slug} project={p} index={i} />
        ))}
      </div>

      {brief.length > 0 && (
        <section aria-labelledby="also-title" className="pj-also">
          <h3 id="also-title" className="font-mono text-[0.75rem] tracking-[0.14em] text-neutral-500 uppercase">
            Also in progress
          </h3>
          <ul>
            {brief.map((p) => (
              <li key={p.slug} className="pj-also-item">
                <div className="min-w-0">
                  <h4 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.03em]">{p.title}</h4>
                  {p.summary ? (
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-neutral-700">{p.summary}</p>
                  ) : (
                    p.label && <p className="mt-1 font-mono text-[0.75rem] text-neutral-500">{p.label}</p>
                  )}
                </div>
                <ProjectLinks project={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
