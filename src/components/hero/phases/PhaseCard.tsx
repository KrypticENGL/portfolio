import type { CSSProperties, ReactNode } from 'react'

/** Inline CSS custom properties; numbers become seconds (they are animation delays). */
export const vars = (o: Record<string, number | string>) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === 'number' ? `${v}s` : v])) as CSSProperties

export function PhaseCard({ label, status, statusAt, children }: {
  label: string
  status?: string
  statusAt?: number
  children: ReactNode
}) {
  return (
    <div className="ph-card">
      <div className="ph-head">
        <span>{label}</span>
        {status && (
          <span className="ph-ok ph-in" style={vars({ '--d': statusAt ?? 0 })}>
            ✓ {status}
          </span>
        )}
      </div>
      <div className="ph-body">{children}</div>
    </div>
  )
}
