import { ContactSection } from '../components/contact/ContactSection'
import { SiteFooter } from '../components/contact/SiteFooter'
import { ExperienceSection } from '../components/experience/ExperienceSection'
import { Hero } from '../components/hero/Hero'
import { ProjectsSection } from '../components/projects/ProjectsSection'
import { SkillsSection } from '../components/skills/SkillsSection'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
