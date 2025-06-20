'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SpiralDemo = () => {
  const [showSpiral, setShowSpiral] = useState(true)

  const spiralVariants = {
    hidden: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } }
  }

  const landingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpiral(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const navigateToPersonalSite = () => {
    setShowSpiral(false)
  }

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {showSpiral ? (
          <motion.div
            key="spiral-section"
            variants={spiralVariants}
            initial="hidden"
            exit="exit"
            className="fixed inset-0 w-full h-full overflow-hidden bg-black"
          >
            <div className="absolute inset-0">
              <SpiralAnimation />
            </div>

            <div
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                transition-all duration-1500 ease-out
                ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <button
                onClick={navigateToPersonalSite}
                className="
                  text-white text-2xl tracking-[0.2em] uppercase font-extralight
                  transition-all duration-700
                  hover:tracking-[0.3em] animate-pulse
                "
              >
                Webelly
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="landing-page"
            variants={landingVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center w-full h-screen bg-black"
          >
            <h1 className="text-white text-4xl font-bold">Welcome to Webelly</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpiralDemo