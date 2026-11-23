'use client'

import { at, useReveal } from '../useReveal'
import { ProjectShowcase } from './ProjectShowcase'
import { PROJECTS } from './projects'

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
        {PROJECTS.map((p, i) => (
          <ProjectShowcase key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
