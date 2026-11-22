import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { preload } from 'react-dom'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'Phanishwar Lal — KrypticENGL',
  description: 'Phanishwar Lal (aka KrypticENGL) — from localhost to .com.',
}

export const viewport: Viewport = { themeColor: '#f4f4f2' }

export default function RootLayout({ children }: { children: ReactNode }) {
  preload('/images/portrait.png', { as: 'image' })
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
