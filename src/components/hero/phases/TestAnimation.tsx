import { TEST, TESTS } from '../timeline'
import { PhaseCard, vars } from './PhaseCard'

export function TestAnimation() {
  return (
    <PhaseCard label="test" status="3/3 tests passed" statusAt={TEST.summaryAt}>
      <ul className="ph-tests">
        {TESTS.map((name, i) => (
          <li key={name} className="ph-test" style={vars({ '--d': TEST.runAt(i), '--run': TEST.run, '--p': TEST.passAt(i) })}>
            <svg viewBox="0 0 12 12" className="ph-icon" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" className="ph-pending" />
              <circle cx="6" cy="6" r="4.5" className="ph-running" />
              <path d="M3.2 6.3 5.2 8.2 8.9 4.1" className="ph-check" pathLength={1} />
            </svg>
            <span className="ph-name">{name}</span>
            <span className="ph-time">{(0.18 + i * 0.11).toFixed(2)}s</span>
            <span className="ph-scan" />
          </li>
        ))}
      </ul>
    </PhaseCard>
  )
}
