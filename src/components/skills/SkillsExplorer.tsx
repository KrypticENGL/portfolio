'use client'

import { useId, useState } from 'react'
import { ICONS, logoUrl } from './icons'
import { NeovimStatusBar } from './NeovimStatusBar'
import { SkillCategoryNav } from './SkillCategoryNav'
import { SkillList } from './SkillList'
import { CATEGORIES } from './skills'

export function SkillsExplorer() {
  const [active, setActive] = useState(0)
  const uid = useId()
  const idFor = (id: string, part: 'tab' | 'panel') => `${uid}-${part}-${id}`

  return (
    <div className="sx">
      <div className="sx-title">
        <img src={logoUrl(ICONS.neovim.logo)} alt="" aria-hidden="true" className="sx-title-logo" />
        <span>~/toolkit</span>
        <span className="sx-dim">skills.md</span>
      </div>

      <div className="sx-body">
        <SkillCategoryNav categories={CATEGORIES} active={active} onSelect={setActive} idFor={idFor} />
        <div className="sx-panels">
          {CATEGORIES.map((c, i) => (
            <SkillList key={c.id} category={c} active={i === active} idFor={idFor} />
          ))}
        </div>
      </div>

      <NeovimStatusBar file={CATEGORIES[active].file} index={active} total={CATEGORIES.length} />
    </div>
  )
}
