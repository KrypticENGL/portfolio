import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '../styles/index.css'
import { CONTACT } from '../components/contact/contact'
import { SITE_URL } from './site'

const title = 'Phanishwar Lal — KrypticENGL'
const description = 'Phanishwar Lal (aka KrypticENGL) — from localhost to .com.'

// og:image / twitter:image come from app/opengraph-image.png (file convention).
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: CONTACT.alias, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#f4f4f2' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: CONTACT.name,
  alternateName: CONTACT.alias,
  url: SITE_URL.href,
  jobTitle: 'Backend Intern',
  sameAs: CONTACT.socials.map((s) => s.href),
  // a current BCA student, so affiliation rather than alumniOf
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Amity University Patna' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
