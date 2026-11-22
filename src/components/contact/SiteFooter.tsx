import { CONTACT } from './contact'

export function SiteFooter() {
  return (
    <footer className="bg-paper px-[7vw]">
      <div className="flex flex-col gap-2 border-t border-ink/10 py-7 font-mono text-[0.75rem] tracking-[0.02em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {CONTACT.name} <span className="text-neutral-300">/</span> {CONTACT.alias}
        </p>
        <p className="flex gap-4">
          <span className="text-neutral-400">Built with intention.</span>
          <span>© 2026</span>
        </p>
      </div>
    </footer>
  )
}
