import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import portrait from '../../assets/portrait.png'
import { EASE, TIMING } from './config'

const MotionImage = motion.create(Image)

export function Portrait() {
  const reduced = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0">
      <MotionImage
        src={portrait}
        alt="Portrait of Phanishwar Lal"
        // hero LCP image; display width is the .cover-art box (88% of the stage on phones, 42vw above)
        sizes="(max-width: 680px) 80vw, 42vw"
        preload
        fetchPriority="high"
        draggable={false}
        initial={reduced ? false : { opacity: 0, y: 28, clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ delay: TIMING.portrait, duration: 1.4, ease: EASE }}
        className="absolute inset-x-0 bottom-0 mx-auto lg:left-auto lg:mr-0 h-auto max-h-full w-auto max-w-full select-none [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
      />
    </div>
  )
}
