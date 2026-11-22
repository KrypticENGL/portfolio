import { useRef, type KeyboardEvent } from 'react'
import type { SkillCategory } from './skills'

type Props = {
  categories: SkillCategory[]
  active: number
  onSelect: (i: number) => void
  idFor: (id: string, part: 'tab' | 'panel') => string
}

/**
 * File-tree style tablist. Keys (↑↓←→, j/k, g/G, Home/End) are handled only while a tab
 * has focus, so page scrolling and browser shortcuts are never intercepted.
 * Line numbers are relative to the cursor, like `:set relativenumber`.
 */
export function SkillCategoryNav({ categories, active, onSelect, idFor }: Props) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const last = categories.length - 1

  const go = (i: number) => {
    onSelect(i)
    tabs.current[i]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    let next: number
    switch (e.key) {
      case 'ArrowDown': case 'ArrowRight': case 'j': next = active === last ? 0 : active + 1; break
      case 'ArrowUp': case 'ArrowLeft': case 'k': next = active === 0 ? last : active - 1; break
      case 'Home': case 'g': next = 0; break
      case 'End': case 'G': next = last; break
      default: return
    }
    e.preventDefault()
    go(next)
  }

  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      className="sx-nav"
    >
      {categories.map((c, i) => {
        const selected = i === active
        return (
          <button
            key={c.id}
            ref={(el) => void (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={idFor(c.id, 'tab')}
            aria-selected={selected}
            aria-controls={idFor(c.id, 'panel')}
            tabIndex={selected ? 0 : -1}
            onClick={() => go(i)}
            className="sx-tab"
          >
            <span className="sx-ln" aria-hidden="true">{selected ? i + 1 : Math.abs(i - active)}</span>
            <span className="sx-tab-label">
              <span className="sx-tab-file" aria-hidden="true">{c.file}/</span>
              <span className="sx-tab-name">{c.label}</span>
            </span>
            <span className="sx-count" aria-label={`${c.skills.length} items`}>{c.skills.length}</span>
          </button>
        )
      })}
    </div>
  )
}
