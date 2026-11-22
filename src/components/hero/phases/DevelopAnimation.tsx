import { CODE_CHARS, DEV } from '../timeline'
import { PhaseCard, vars } from './PhaseCard'

const LINES = [0, 1].map((ln) => CODE_CHARS.filter((c) => c.line === ln))
const LAST = CODE_CHARS.length - 1

export function DevelopAnimation() {
  return (
    <PhaseCard label="idea.ts" status="compiled" statusAt={DEV.compiledAt}>
      <div className="ph-code">
        {LINES.map((chars, ln) => (
          <div key={ln} className="ph-line">
            <span className="ph-gutter">{ln + 1}</span>
            <span>
              {ln === 0 && <span className="ph-caret0" style={vars({ '--d': DEV.typeStart })} />}
              {chars.map((c) => (
                <span
                  key={c.i}
                  className={`ph-ch ph-${c.cls}${c.i === LAST ? ' ph-ch--last' : ''}`}
                  style={vars({ '--d': c.t, '--hold': c.hold })}
                >
                  {c.ch}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </PhaseCard>
  )
}
