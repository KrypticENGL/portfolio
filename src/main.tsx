import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import '@fontsource-variable/geist'
import './styles/index.css'
import { Hero } from './components/hero/Hero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user": transforms are dropped, opacity fades remain */}
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
      </main>
    </MotionConfig>
  </StrictMode>,
)
