import type { IconId } from '../skills/icons'

export type Tech = { name: string; icon?: IconId }

/**
 * Abstract motif drawn in the typographic preview when there is no screenshot.
 * Never presented as a screenshot; set `image` once a real one exists.
 */
export type Motif = 'ink' | 'graph' | 'eq' | 'frame' | 'none'

export type Project = {
  slug: string
  title: string
  /** small mono line under the title (e.g. the repo name) */
  label?: string | null
  summary: string | null
  highlights?: string[]
  stack?: Tech[]
  /** verified repository URL, or null when none is public / verified */
  repo: string | null
  /** live demo: a URL, `null` = coming soon, omitted = no demo planned */
  live?: string | null
  /** real screenshot under /public; omitted → typographic preview */
  image?: { src: string; alt: string } | null
  motif: Motif
  /** status line shown in the preview corner */
  status?: string | null
  /** listed compactly under "Also in progress" instead of as a full showcase */
  brief?: boolean
}

/*
 * Every claim below was checked against the repository on 2026-11-23
 * (README, manifests, source). Stacks list only what the manifests and source use.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'annotator',
    title: 'Annotator',
    label: 'KrypticENGL/annotator',
    summary:
      'Draw on top of the Windows desktop. A native Rust app built on Win32, Direct2D, DirectWrite and DirectComposition, with no webview.',
    highlights: [
      'Draw mode and a pass-through mode where every click reaches the windows underneath',
      'Mouse, pen and touch input through one WM_POINTER path',
      'Floating, draggable toolbar with colours, undo and clear',
      'End-to-end test drives the real desktop with SendInput and reads composited pixels',
    ],
    stack: [
      { name: 'Rust', icon: 'rust' },
      { name: 'Win32' },
      { name: 'Direct2D' },
      { name: 'DirectWrite' },
      { name: 'DirectComposition' },
    ],
    repo: 'https://github.com/KrypticENGL/annotator',
    motif: 'ink',
    status: 'Rust · Windows',
  },
  {
    slug: 'lattice',
    title: 'Lattice',
    label: 'KrypticENGL/Lattice-WindowsNative',
    summary:
      'A native Windows IDE with a code-graph visualizer, written in Rust directly against Win32 with no GUI framework.',
    highlights: [
      'Call graph built from compiled object files (COFF and ELF), laid out by a force simulation on a worker thread',
      'Debugger that drives GDB: breakpoints, stepping, and record-and-replay of a whole run',
      'Data view that draws a stopped program’s memory as trees, linked lists, arrays and grids',
      'Editor, ConPTY terminal and dockable panels',
    ],
    stack: [
      { name: 'Rust', icon: 'rust' },
      { name: 'Win32' },
      { name: 'Direct2D' },
      { name: 'DirectWrite' },
      { name: 'GDB' },
    ],
    repo: 'https://github.com/KrypticENGL/Lattice-WindowsNative',
    motif: 'graph',
    status: 'In progress',
  },
  {
    slug: 'nirvana',
    title: 'Nirvana',
    label: 'KrypticENGL/Nirvana',
    summary:
      'A music app for newcomers: internet radio, track search and a personal library, in a Next.js web app backed by an Express API.',
    highlights: [
      'Internet radio from Radio-Browser, relayed through the server with private-address blocking',
      'Trending tracks and search from Audius, streamed on demand',
      'Liked songs and playlists per signed-in account',
      '10-band Web Audio equalizer with presets, and a frequency visualizer',
    ],
    stack: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
    ],
    repo: 'https://github.com/KrypticENGL/Nirvana',
    motif: 'eq',
    status: 'Web + API',
  },
  {
    slug: 'stonks',
    title: 'Stonks',
    label: 'KrypticENGL/stonks',
    // The repository has only an empty README so far; nothing to describe yet.
    summary: null,
    repo: 'https://github.com/KrypticENGL/stonks',
    motif: 'none',
    status: null,
    brief: true,
  },
  {
    slug: 'video-generation',
    title: 'Video Generation',
    label: null,
    summary: 'A video-generation website.',
    repo: null,
    live: null, // deployment URL to be added
    motif: 'frame',
    status: 'Coming soon',
    brief: true,
  },
]
