import { BUILD } from '../timeline'
import { PhaseCard, vars } from './PhaseCard'

// Contact point (top centre of the block) in viewBox units.
const CX = 68, CY = 46
const SPARKS = [[-9, -7], [1, -11], [10, -6]]

export function BuildAnimation() {
  const [i1, i2] = BUILD.impacts
  return (
    <PhaseCard label="build" status="built" statusAt={BUILD.builtAt}>
      <svg className="ph-svg" viewBox="-21 0 200 76" aria-hidden="true">
        <line x1="26" y1="72.5" x2="118" y2="72.5" className="ph-ground" />
        <g className="ph-block" style={vars({ '--i1': i1, '--i2': i2 })}>
          <rect x="44.5" y="46.5" width="47" height="25" className="ph-ghost" style={vars({ '--d': BUILD.builtAt })} />
          {/* bottom row seats on the first hit, top row on the second */}
          <rect x="44" y="60" width="23" height="12" className="ph-cell" style={vars({ '--d': i1 })} />
          <rect x="69" y="60" width="23" height="12" className="ph-cell" style={vars({ '--d': i1 + 0.04 })} />
          <rect x="44" y="46" width="23" height="12" className="ph-cell" style={vars({ '--d': i2 })} />
          <rect x="69" y="46" width="23" height="12" className="ph-cell" style={vars({ '--d': i2 + 0.04 })} />
        </g>
        {[i1, i2].map((t, n) =>
          SPARKS.map(([dx, dy], k) => (
            <circle
              key={`${n}${k}`}
              cx={CX + (k - 1) * 6}
              cy={CY - 1}
              r="1.3"
              className="ph-spark"
              style={vars({ '--d': t, '--dx': `${dx}px`, '--dy': `${dy}px` })}
            />
          )),
        )}
        {/* drawn at the moment of contact; pivots about the grip end (130,36) */}
        <g className="ph-hammer" style={vars({ '--d': BUILD.hammerAt, '--dur': BUILD.swing })}>
          <rect x="73" y="34" width="60" height="4" rx="2" className="ph-handle" />
          <rect x="61" y="26" width="14" height="20" rx="1.5" className="ph-metal" />
          <rect x="61" y="26" width="14" height="4" rx="1" className="ph-cap" />
        </g>
      </svg>
    </PhaseCard>
  )
}
