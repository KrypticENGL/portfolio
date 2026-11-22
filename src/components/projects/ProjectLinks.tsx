import { ArrowUpRight } from 'lucide-react'
import { SkillIcon } from '../skills/icons'
import type { Project } from './projects'

/** GitHub when verified, live demo when supplied, "Coming soon" when a demo is expected but not live. */
export function ProjectLinks({ project }: { project: Project }) {
  const { repo, live, title } = project
  if (!repo && live === undefined) return null
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className="pj-btn" aria-label={`${title} source code on GitHub (opens in a new tab)`}>
          <SkillIcon id="github" className="h-4 w-4" />
          Source
          <ArrowUpRight aria-hidden="true" className="pj-btn-arrow h-3.5 w-3.5" strokeWidth={1.75} />
        </a>
      )}
      {typeof live === 'string' && (
        <a href={live} target="_blank" rel="noopener noreferrer" className="pj-btn pj-btn--solid" aria-label={`${title} live demo (opens in a new tab)`}>
          Live demo
          <ArrowUpRight aria-hidden="true" className="pj-btn-arrow h-3.5 w-3.5" strokeWidth={1.75} />
        </a>
      )}
      {live === null && (
        <span className="pj-soon">
          <i aria-hidden="true" />
          Coming soon
        </span>
      )}
    </div>
  )
}
