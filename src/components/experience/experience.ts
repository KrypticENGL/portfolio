/**
 * Experience entries. Edit freely; unknown fields stay null rather than guessed.
 * Source: the LinkedIn experience page (linkedin.com/in/phanishwar-lal-73441037a), read 2026-11-23.
 * An entry is shown only once it has a company, a role and a start date (see `isComplete`).
 */
export type Experience = {
  company: string
  role: string | null
  /** secondary detail shown after the role, e.g. Internship */
  kind?: string | null
  /** 'YYYY-MM' */
  start: string | null
  /** 'YYYY-MM', or null while ongoing */
  end?: string | null
  location?: string | null
  description?: string | null
  /** path under /public, only for a verified logo file */
  logo?: string | null
  url?: string | null
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'MarketMaze LLP',
    role: 'Backend Intern',
    kind: 'Internship',
    start: '2026-02',
    end: null,
    location: 'Remote',
    description: 'Helping with the backend of technical projects at MarketMaze.',
  },
  {
    company: 'Amity Institute of Information Technology',
    role: 'Techpreneur Club Member',
    kind: 'Amity University Patna',
    start: '2025-11',
    end: null,
  },
  {
    company: 'Amity University Patna',
    role: 'Student, BCA',
    start: '2025-08',
    end: null,
    location: 'Patna, Bihar, India',
  },
]

export const isComplete = (e: Experience) => Boolean(e.company && e.role && e.start)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

/** 'Feb 2026 — Present'. No computed duration: it would go stale in static HTML. */
export const formatRange = (e: Experience) => `${month(e.start!)} — ${e.end ? month(e.end) : 'Present'}`
