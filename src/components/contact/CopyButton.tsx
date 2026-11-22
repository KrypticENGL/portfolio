import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Some embedded browsers allow selection-based copy only.
    }
  }
  const previousFocus = document.activeElement
  const field = Object.assign(document.createElement('textarea'), { value: text, readOnly: true })
  field.style.cssText = 'position:fixed;inset:0 auto auto 0;opacity:0'
  document.body.append(field)
  try {
    field.select()
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
  }
}

/** Copies `text`; the result is shown on the button and announced to screen readers. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    setState((await copyText(text)) ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <>
      <button type="button" onClick={onClick} className="ct-copy" data-state={state} aria-label={label}>
        {state === 'copied' ? <Check aria-hidden="true" strokeWidth={2} /> : <Copy aria-hidden="true" strokeWidth={1.6} />}
        <span aria-hidden="true">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy'}</span>
      </button>
      <span role="status" className="sr-only">
        {state === 'copied' ? 'Email address copied to clipboard' : state === 'failed' ? 'Could not copy the email address' : ''}
      </span>
    </>
  )
}
