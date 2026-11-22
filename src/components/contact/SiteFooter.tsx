import { CONTACT } from './contact'

export function SiteFooter() {
  return (
    <footer className="bg-paper px-[7vw]">
      <div className="flex flex-col gap-2 border-t border-ink/10 py-7 font-mono text-[0.75rem] tracking-[0.02em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {CONTACT.name} <span className="text-neutral-600">/</span> {CONTACT.alias}
        </p>
        <p>&copy; 2026</p>
      </div>
    </footer>
  )
}
