type Props = { file: string; index: number; total: number }

/** A nod to Neovim's statusline: mode, buffer, encoding, position. Purely presentational. */
export function NeovimStatusBar({ file, index, total }: Props) {
  return (
    <div className="sx-status" aria-hidden="true">
      <span className="sx-mode">NORMAL</span>
      <span className="sx-status-file">
        skills.md <span className="sx-dim">› {file}</span>
      </span>
      <span className="sx-status-right">
        <span className="sx-hint">j/k to move</span>
        <span>utf-8</span>
        <span>
          {index + 1}/{total}
        </span>
      </span>
    </div>
  )
}
