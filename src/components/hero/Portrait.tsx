import { useState } from 'react'
import { motion } from 'motion/react'
import { EASE, TIMING } from './config'

export const PORTRAIT_SRC = '/images/portrait.png'

export function Portrait() {
  const [missing, setMissing] = useState(false)

  if (missing) return null
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.img
        src={PORTRAIT_SRC}
        alt="Portrait of Phanishwar Lal"
        decoding="async"
        draggable={false}
        onError={() => setMissing(true)}
        initial={{ opacity: 0, y: 28, clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ delay: TIMING.portrait, duration: 1.4, ease: EASE }}
        className="absolute inset-x-0 bottom-0 mx-auto lg:left-auto lg:mr-0 h-auto max-h-full w-auto max-w-full select-none [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
      />
    </div>
  )
}
