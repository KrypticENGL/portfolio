import { ExperienceEntry } from './ExperienceEntry'
import type { Experience } from './experience'

/** Thin vertical rule that draws itself downward on reveal, with one node per entry. */
export function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  return (
    <div className="tl">
      <span className="tl-line" aria-hidden="true" />
      <ol className="flex flex-col gap-[clamp(2.75rem,6vh,4rem)]">
        {entries.map((e, i) => (
          <ExperienceEntry key={`${e.company}-${e.role}`} entry={e} index={i} />
        ))}
      </ol>
    </div>
  )
}
