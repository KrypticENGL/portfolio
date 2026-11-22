import { at } from '../useReveal'
import { formatRange, type Experience } from './experience'

export function ExperienceEntry({ entry, index }: { entry: Experience; index: number }) {
  const { company, role, kind, location, description, logo, url } = entry
  const meta = [kind, location].filter(Boolean).join(' · ')
  return (
    <li className="tl-entry rv" style={at(index + 1)}>
      <span className="tl-node" aria-hidden="true" />
      <p className="font-mono text-[0.75rem] tracking-[0.04em] text-neutral-500">
        <time dateTime={entry.start!}>{formatRange(entry)}</time>
      </p>
      <h3 className="tl-company mt-2 flex items-center gap-3 text-[clamp(1.35rem,2vw,1.75rem)] leading-tight font-semibold tracking-[-0.03em]">
        {logo && <img src={logo} alt="" aria-hidden="true" loading="lazy" className="h-7 w-7 rounded-[4px] object-contain" />}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {company}
          </a>
        ) : (
          company
        )}
      </h3>
      <p className="mt-1.5 text-[1rem] tracking-[-0.01em] text-neutral-600">
        {role}
        {meta && <span className="text-neutral-400"> · {meta}</span>}
      </p>
      {description && <p className="tl-desc mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed">{description}</p>}
    </li>
  )
}
