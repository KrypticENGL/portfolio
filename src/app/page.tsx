import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { ContactSection } from '../components/contact/ContactSection'
import { SiteFooter } from '../components/contact/SiteFooter'
import { ExperienceSection } from '../components/experience/ExperienceSection'
import { Hero } from '../components/hero/Hero'
import { ProjectsSection } from '../components/projects/ProjectsSection'
import { SkillsSection } from '../components/skills/SkillsSection'

// The page is prerendered, so a new resume.pdf or RESUME_URL takes effect on the next build.
const resume = process.env.RESUME_URL || (existsSync(join(process.cwd(), 'public', 'resume.pdf')) ? '/resume.pdf' : null)

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main">
        <Hero />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection resume={resume} />
      </main>
      <SiteFooter />
    </>
  )
}
