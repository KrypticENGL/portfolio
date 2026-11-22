import { DEPLOY } from '../timeline'
import { PhaseCard, vars } from './PhaseCard'

const MODULE = 3 // gear module: pitch radius = MODULE * teeth / 2, so any pair meshes
const TA = 12, TB = 8
const RA = (MODULE * TA) / 2, RB = (MODULE * TB) / 2
const LOC = (-28 * Math.PI) / 180 // angle of the line of centres A → B
const A = { x: 24, y: 36 }
const B = { x: A.x + (RA + RB) * Math.cos(LOC), y: A.y + (RA + RB) * Math.sin(LOC) }

/** Gear outline: trapezoidal teeth around the pitch circle, centre hole via evenodd. */
function gear(cx: number, cy: number, teeth: number, offset: number) {
  const rp = (MODULE * teeth) / 2, ro = rp + MODULE * 0.9, rr = rp - MODULE * 1.0
  const p = (Math.PI * 2) / teeth
  const at = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = offset + i * p
    pts.push(at(rr, a - p / 2), at(rr, a - p * 0.25), at(ro, a - p * 0.13), at(ro, a + p * 0.13), at(rr, a + p * 0.25))
  }
  const h = MODULE * 1.1
  return `M${pts.join('L')}Z M${cx + h},${cy} a${h},${h} 0 1 0 ${-2 * h},0 a${h},${h} 0 1 0 ${2 * h},0Z`
}

// A has a tooth on the line of centres; B is offset half a pitch so a gap meets it.
const PATH_A = gear(A.x, A.y, TA, LOC)
const PATH_B = gear(B.x, B.y, TB, LOC + Math.PI + Math.PI / TB)

export function DeployAnimation() {
  const spin = { '--d': DEPLOY.spinAt, '--dur': DEPLOY.spin }
  return (
    <PhaseCard label="deploy">
      <div className="ph-deploy">
        <svg viewBox="0 0 66 62" className="ph-gears" aria-hidden="true">
          {/* same easing on both, angles in tooth ratio: the mesh holds at every instant */}
          <path d={PATH_A} className="ph-gear ph-gear-a" style={vars({ ...spin, '--turn': '360deg', transformOrigin: `${A.x}px ${A.y}px` })} />
          <path d={PATH_B} className="ph-gear ph-gear-b" style={vars({ ...spin, '--turn': `${(-360 * TA) / TB}deg`, transformOrigin: `${B.x}px ${B.y}px` })} />
        </svg>
        <div className="ph-upload" style={vars({ '--d': DEPLOY.uploadAt, '--dur': DEPLOY.upload, '--live': DEPLOY.liveAt })}>
          <div className="ph-upload-row">
            <span className="ph-swap">
              <span className="ph-uploading">uploading</span>
              <span className="ph-live">
                <i /> LIVE
              </span>
            </span>
            <span className="ph-pct" />
          </div>
          <div className="ph-track">
            <div className="ph-fill" />
          </div>
        </div>
      </div>
    </PhaseCard>
  )
}
