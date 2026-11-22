import { SkillIcon } from './icons'
import type { SkillCategory } from './skills'

type Props = {
  category: SkillCategory
  active: boolean
  idFor: (id: string, part: 'tab' | 'panel') => string
}

/**
 * One category's skills. All panels stay mounted in the same grid cell, so the explorer
 * always takes the height of the tallest one and never jumps when switching.
 */
export function SkillList({ category, active, idFor }: Props) {
  return (
    <div
      role="tabpanel"
      id={idFor(category.id, 'panel')}
      aria-labelledby={idFor(category.id, 'tab')}
      tabIndex={active ? 0 : -1}
      data-active={active || undefined}
      className="sx-panel"
    >
      <p className="sx-panel-head" aria-hidden="true">
        <span># {category.label}</span>
        <span>{category.skills.length} {category.skills.length === 1 ? 'entry' : 'entries'}</span>
      </p>
      <ul className="sx-grid">
        {category.skills.map((s) => (
          <li key={s.name} className={s.name.length > 28 ? 'sx-item sx-item--wide' : 'sx-item'}>
            <SkillIcon id={s.icon} className="sx-icon" />
            <span className="min-w-0">
              <span className="sx-name">{s.name}</span>
              {s.note && <span className="sx-note">{s.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
