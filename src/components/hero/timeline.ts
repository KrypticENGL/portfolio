// Single source of truth for phase choreography: the CSS delays in phases/* and
// the background events fired by usePhaseAnimation both read these numbers.

export type ImpulseKind = 'radial' | 'swell' | 'scan'
/** t: s from phase start; fx/fy: point inside the phase card (0..1). */
export type PhaseEvent = { t: number; kind: ImpulseKind; fx: number; fy: number; amp: number }

// Deterministic jitter so typing rhythm is natural but identical every loop.
const rand = (i: number) => {
  const s = Math.sin(i * 12.9898 + 4.1) * 43758.5453
  return s - Math.floor(s)
}

// ---- Develop -------------------------------------------------------------
type Tok = [text: string, cls: 'kw' | 'id' | 'op' | 'fn']
const CODE: Tok[][] = [
  [['const', 'kw'], [' idea', 'id'], [' = ', 'op'], ['build', 'fn'], ['();', 'op']],
  [['ship', 'fn'], ['(', 'op'], ['idea', 'id'], [');', 'op']],
]
export type CodeChar = { i: number; ch: string; cls: Tok[1]; line: number; t: number; hold: number }

const typeStart = 0.6
export const CODE_CHARS: CodeChar[] = (() => {
  const out: CodeChar[] = []
  let t = typeStart
  CODE.forEach((line, ln) => {
    if (ln > 0) t += 0.24 // pause at line break
    for (const [text, cls] of line)
      for (const ch of text) {
        out.push({ i: out.length, ch, cls, line: ln, t, hold: 0 })
        t += 0.032 + rand(out.length) * 0.042 + (ch === ' ' ? 0.03 : 0)
      }
  })
  out.forEach((c, n) => (c.hold = (out[n + 1]?.t ?? c.t) - c.t))
  return out
})()
const typedAt = CODE_CHARS[CODE_CHARS.length - 1].t

export const DEV = { typeStart, compiledAt: typedAt + 0.28 }

// ---- Build ---------------------------------------------------------------
const hammerAt = 0.55
export const BUILD = {
  hammerAt,
  swing: 1.2, // s, whole two-strike keyframe
  impacts: [hammerAt + 0.33, hammerAt + 0.89],
  builtAt: hammerAt + 1.25,
}

// ---- Test ----------------------------------------------------------------
export const TESTS = ['Unit tests', 'Integration', 'Build check']
const runAt = (i: number) => 0.62 + i * 0.6
export const TEST = {
  runAt,
  run: 0.48,
  passAt: (i: number) => runAt(i) + 0.48,
  summaryAt: runAt(2) + 0.48 + 0.24,
}

// ---- Deploy --------------------------------------------------------------
export const DEPLOY = {
  spinAt: 0.45,
  spin: 2.5, // gears accelerate, run, then ease to rest
  uploadAt: 0.6,
  upload: 1.9,
  liveAt: 2.62,
}

// ---- Phases --------------------------------------------------------------
export const PHASES: { word: string; duration: number; events: PhaseEvent[] }[] = [
  {
    word: 'Develop',
    duration: 3.6,
    // a faint disturbance every few keystrokes
    events: CODE_CHARS.filter((c) => c.i % 6 === 3).map((c) => ({
      t: c.t, kind: 'radial', fx: 0.15 + (c.i % 21) * 0.03, fy: 0.45 + c.line * 0.2, amp: 0.16,
    })),
  },
  {
    word: 'Build',
    duration: 3.0,
    events: BUILD.impacts.map((t) => ({ t, kind: 'radial', fx: 0.36, fy: 0.62, amp: 0.42 })),
  },
  {
    word: 'Test',
    duration: 3.5,
    events: [{ t: TEST.runAt(0), kind: 'scan', fx: 1, fy: 0.55, amp: 0.3 }],
  },
  {
    word: 'Deploy',
    duration: 3.9,
    events: [{ t: DEPLOY.uploadAt + DEPLOY.upload, kind: 'swell', fx: 0.3, fy: 0.55, amp: 0.55 }],
  },
]
