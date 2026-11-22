import type { IconId } from './icons'

export type Skill = {
  name: string
  icon: IconId
  /** optional one-line aside, shown in mono after the name */
  note?: string
}

export type SkillCategory = {
  id: string
  label: string
  /** file-tree style name shown in the explorer */
  file: string
  skills: Skill[]
}

/** Explorer groups. Every skill from the brief appears here or in INDEX below. */
export const CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    file: 'languages',
    skills: [
      { name: 'C++', icon: 'cplusplus' },
      { name: 'Rust', icon: 'rust' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    id: 'web',
    label: 'Frameworks & Web',
    file: 'frameworks-web',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Expo', icon: 'expo' },
      { name: 'React Native', icon: 'reactnative' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'RESTful APIs', icon: 'api' },
      { name: 'Website Design', icon: 'design' },
      { name: 'Website Development', icon: 'webdev' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    file: 'databases',
    skills: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Cloud',
    file: 'systems-cloud',
    skills: [
      { name: 'Linux', icon: 'linux' },
      { name: 'Cloud Computing', icon: 'cloud' },
      { name: 'Deployment', icon: 'deploy' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    file: 'ai-automation',
    skills: [
      { name: 'Agentic AI', icon: 'agent' },
      { name: 'AI Automations', icon: 'automation' },
      { name: 'AI-Assisted Development', icon: 'assisted' },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    file: 'other',
    skills: [
      { name: 'Neovim', icon: 'neovim', note: 'preferred editor' },
      { name: 'Short-lived Competitive Programming Career', icon: 'archive', note: 'status: archived' },
    ],
  },
]

/** The plain-text index: the brief's own grouping, always visible, no interaction needed. */
export const INDEX: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['C++', 'Rust', 'JavaScript', 'TypeScript', 'Python'] },
  {
    label: 'Frameworks & runtime',
    items: ['React.js', 'Next.js', 'Expo', 'React Native', 'Node.js', 'Express.js', 'RESTful APIs'],
  },
  { label: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
  {
    label: 'Capabilities',
    items: [
      'Website Design',
      'Website Development',
      'Deployment',
      'Databases',
      'Linux',
      'Cloud Computing',
      'Agentic AI',
      'AI Automations',
      'AI-Assisted Development',
    ],
  },
]
