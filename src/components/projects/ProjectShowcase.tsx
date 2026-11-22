'use client'

import { ArrowUpRight } from 'lucide-react'
import { SkillIcon } from '../skills/icons'
import { at, useReveal } from '../useReveal'
import { ProjectLinks } from './ProjectLinks'
import { ProjectVisual } from './ProjectVisual'
import type { Project } from './projects'

/** One editorial row: a large visual (~58%) beside the text; alternate rows flip on desktop. */
export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const ref = useReveal<HTMLElement>('-12%')
  const number = String(index + 1).padStart(2, '0')
  const href = project.repo ?? project.live ?? null
  const titleId = `project-${project.slug}`

  return (
    <article ref={ref} aria-labelledby={titleId} className="pj" data-flip={index % 2 === 1 || undefined}>
      <div className="pj-visual rv rv-mask" style={at(0)}>
        <ProjectVisual project={project} number={number} />
      </div>

      <div className="pj-body">
        <p className="rv font-mono text-[0.75rem] tracking-[0.14em] text-neutral-400" style={at(1)}>
          {number}
        </p>
        <h3 id={titleId} className="rv mt-3 text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.04em]" style={at(1)}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="pj-title">
              <span className="pj-title-text">{project.title}</span>
              <ArrowUpRight aria-hidden="true" className="pj-arrow" strokeWidth={1.75} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="pj-title-text">{project.title}</span>
          )}
        </h3>
        {project.label && (
          <p className="rv mt-2 font-mono text-[0.75rem] text-neutral-400" style={at(2)}>
            {project.label}
          </p>
        )}

        {project.summary ? (
          <p className="rv mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed tracking-[-0.01em] text-neutral-700" style={at(2)}>
            {project.summary}
          </p>
        ) : null}

        {project.highlights?.length ? (
          <ul className="rv pj-highlights" style={at(3)}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

        {project.stack?.length ? (
          <ul className="rv mt-6 flex flex-wrap gap-1.5" style={at(3)} aria-label="Built with">
            {project.stack.map((t) => (
              <li key={t.name} className="pj-tech">
                {t.icon && <SkillIcon id={t.icon} className="h-3.5 w-3.5" />}
                {t.name}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="rv mt-7" style={at(4)}>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
