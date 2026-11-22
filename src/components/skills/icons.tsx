import type { StaticImageData } from 'next/image'
import {
  Archive,
  Bot,
  Braces,
  Cloud,
  CodeXml,
  PenTool,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
// Official technology logos, original colours, bundled locally from Devicon.
import cplusplus from 'devicon/icons/cplusplus/cplusplus-original.svg'
import rust from 'devicon/icons/rust/rust-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import typescript from 'devicon/icons/typescript/typescript-original.svg'
import python from 'devicon/icons/python/python-original.svg'
import react from 'devicon/icons/react/react-original.svg'
import nextjs from 'devicon/icons/nextjs/nextjs-original.svg'
import expo from 'devicon/icons/expo/expo-original.svg'
import reactnative from 'devicon/icons/reactnative/reactnative-original.svg'
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg'
import express from 'devicon/icons/express/express-original.svg'
import mongodb from 'devicon/icons/mongodb/mongodb-original.svg'
import postgresql from 'devicon/icons/postgresql/postgresql-original.svg'
import linux from 'devicon/icons/linux/linux-original.svg'
import neovim from 'devicon/icons/neovim/neovim-original.svg'
import tailwindcss from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import github from 'devicon/icons/github/github-original.svg'
import linkedin from 'devicon/icons/linkedin/linkedin-plain.svg'

// Turbopack hands node_modules SVGs over as a URL string; local imports arrive as StaticImageData.
type Logo = StaticImageData | string
type Entry = { logo: Logo } | { glyph: LucideIcon }
export const logoUrl = (l: Logo) => (typeof l === 'string' ? l : l.src)

/** One place mapping every skill to its icon: brand logo where one exists, a neutral Lucide glyph otherwise. */
export const ICONS = {
  cplusplus: { logo: cplusplus },
  rust: { logo: rust },
  javascript: { logo: javascript },
  typescript: { logo: typescript },
  python: { logo: python },
  react: { logo: react },
  nextjs: { logo: nextjs },
  expo: { logo: expo },
  reactnative: { logo: reactnative },
  nodejs: { logo: nodejs },
  express: { logo: express },
  mongodb: { logo: mongodb },
  postgresql: { logo: postgresql },
  linux: { logo: linux },
  neovim: { logo: neovim },
  tailwindcss: { logo: tailwindcss },
  github: { logo: github },
  linkedin: { logo: linkedin },
  api: { glyph: Braces },
  design: { glyph: PenTool },
  webdev: { glyph: CodeXml },
  cloud: { glyph: Cloud },
  deploy: { glyph: Rocket },
  agent: { glyph: Bot },
  automation: { glyph: Workflow },
  assisted: { glyph: Sparkles },
  archive: { glyph: Archive },
} satisfies Record<string, Entry>

export type IconId = keyof typeof ICONS

/** Decorative: every icon sits next to its text label, so it is hidden from assistive tech. */
export function SkillIcon({ id, className }: { id: IconId; className?: string }) {
  const entry: Entry = ICONS[id]
  if ('logo' in entry)
    return <img src={logoUrl(entry.logo)} alt="" aria-hidden="true" loading="lazy" draggable={false} className={className} />
  const Glyph = entry.glyph
  return <Glyph aria-hidden="true" strokeWidth={1.5} className={className} />
}
