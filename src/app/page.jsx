'use client'
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect, Suspense, lazy, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BusinessForm } from "@/components/blocks/BuisinessForm"
import { PortfolioSection } from "@/components/blocks/PortfolioSection"
import {
  HomeIcon,
  Info,
  Settings,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { FeatureSteps } from "@/components/blocks/feature-section"
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { PricingDemo } from "@/components/blocks/PricingTable"
import { Footerdemo } from "@/components/ui/footer-section"
import SplineBot from "@/components/blocks/SplineBot"
import ProjectCard from "@/components/blocks/ProjectCard"; 
import Navbar from "@/components/blocks/Navbar"; 

const LavaLamp = lazy(() => import("@/components/ui/fluid-blob").then(module => ({ default: module.LavaLamp })))
const Testimonals = lazy(() => import("@/components/blocks/Testimonals"))

const Page = () => {
  const [showSpiral, setShowSpiral] = useState(true)
  const [showBusinessForm, setShowBusinessForm] = useState(false)
  const [businessProfile, setBusinessProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const projects = [
    {
      id: 1,
      name: 'SAST',
      image: '/projects/sast.png',
      liveUrl: 'https://github.com/SASTxNST/Website_SAST'
    },
    {
      id: 2,
      name: 'Apni Dukan',
      image: '/projects/apni-dukan.png',
      liveUrl: 'https://apni-dukan-alpha.vercel.app/'
    },
    {
      id: 3,
      name: 'Gaming Redefined',
      image: '/projects/gaming-redefined.png',
      liveUrl: 'https://gaming-redefined.vercel.app/'
    },
    {
      id: 4,
      name: 'Nebula',
      image: '/projects/nebula.png',
      liveUrl: 'https://nebula-last.vercel.app/'
    },
  ];

  const features = [
    {
      step: 'Step 1',
      title: 'Got an idea? Share with us...',
      content: 'Share your great ideas to make them come alive.',
      image: '/step1.png'
    },
    {
      step: 'Step 2',
      title: 'We build, You rest assured!',
      content: 'Let us build your ideas into an experience that no-one never forgets!',
      image: '/step2.png'
    },
    {
      step: 'Step 3',
      title: 'Grow',
      content: 'Get your web application and grow your work.',
      image: '/step3.png'
    },
  ]

  const data = [ // This `data` array can be passed to the Navbar as well
    {
      title: 'Home',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#home',
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      title: 'About Us',
      icon: (
        <Info className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#about',
    },
    {
      title: 'Services',
      icon: (
        <Settings className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#services',
    },
    {
      title: 'Our Work',
      icon: (
        <MessageSquare className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#ourWork',
    },
    {
      title: 'Contact',
      icon: (
        <Phone className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#contact',
    },
  ];

  const spiralVariants = {
    hidden: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } }
  }

  const landingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }
  }

  useEffect(() => {
    const savedProfile = localStorage.getItem('webellyBusinessProfile')
    if (savedProfile) {
      try {
        setBusinessProfile(JSON.parse(savedProfile))
      } catch (error) {
        console.error('Error parsing business profile:', error)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpiral(false)
      if (!businessProfile && !isLoading) {
        setTimeout(() => setShowBusinessForm(true), 1000)
      }
    }, 7000)

    return () => clearTimeout(timer)
  }, [businessProfile, isLoading])

  const navigateToPersonalSite = () => {
    setShowSpiral(false)
    if (!businessProfile && !isLoading) {
      setTimeout(() => setShowBusinessForm(true), 1000)
    }
  }

  const handleBusinessFormSubmit = (formData) => {
    setBusinessProfile(formData)
    setShowBusinessForm(false)
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
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
          <>
            <motion.div
              key="landing-page"
              variants={landingVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center w-full h-screen bg-black"
            >
              <div className="h-screen w-screen flex flex-col justify-center items-center relative">
                <Suspense fallback={<div className="w-full h-full bg-black" />}>
                  <LavaLamp />
                </Suspense>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
                  Think Build Achieve
                </h1>
                <p className="text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed">
                  Crafting exceptional digital experiences through innovative design and cutting-edge technology.
                </p>
              </div>

              {/* Conditional Rendering for Navbar vs Dock */}
              <div className="md:hidden fixed top-0 left-0 w-full z-20">
                <Navbar navItems={data} /> {/* Show Navbar on small screens */}
              </div>
              <div className='hidden md:block fixed bottom-2 left-1/2 max-w-full z-20 -translate-x-1/2'>
                <Dock className='items-end pb-3'>
                  {data.map((item, idx) => (
                    <DockItem
                      key={idx}
                      className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
                      onClick={item.onClick ? item.onClick : () => {
                        if (item.href && item.href !== '#') {
                          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <DockLabel>{item.title}</DockLabel>
                      <DockIcon>{item.icon}</DockIcon>
                    </DockItem>
                  ))}
                </Dock>
              </div>
            </motion.div>

            <motion.div className="w-full bg-black pt-20" id="about">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-8 md:px-12 mb-16 text-center"
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                  About Us & What We Do
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  We're dedicated to transforming your vision into stunning digital realities. Learn more about our passion for innovation and the comprehensive services we offer.
                </p>
              </motion.div>
              <FeatureSteps
                features={features}
                title="Your Journey Starts Here"
                autoPlayInterval={4000}
                imageHeight="h-[500px]"
              />
            </motion.div>

            <PortfolioSection businessType={businessProfile?.businessType} />

            <motion.div className="relative w-full bg-black min-h-screen pt-20" id="ourWork">
               <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-16 text-center w-full"
              >
                Our Latest Creations
              </motion.h2>
                <SplineBot/>


              <div className="absolute bg-transparent flex flex-col md:flex-row justify-between inset-x-0 top-[20vh] w-full z-10">
                <ProjectCard project={projects[0]} style={{ position: 'absolute', top: '0', left: '10%', pointerEvents: 'auto' }} />
                <ProjectCard project={projects[1]} style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }} />
                <ProjectCard project={projects[2]} style={{ position: 'absolute', top: '0', right: '10%', pointerEvents: 'auto' }} />
                <ProjectCard project={projects[3]} style={{ position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }} />
              </div>

              <div className="relative z-0 h-[calc(100vh - 20vh)] w-full"></div>

            </motion.div>

            <motion.div className="w-full min-h-screen bg-black" id="testimonals">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-4xl mt-20 md:text-6xl lg:text-7xl font-bold text-white mb-16 text-center w-full"
              >
                What Our Clients Say
              </motion.h2>
              <Suspense fallback={<div className="w-full h-96 bg-black" />}>
                <Testimonals />
              </Suspense>
            </motion.div>

            <motion.div className="w-full min-h-screen bg-black" id="pricing">
              <PricingDemo />
            </motion.div>

            <motion.div className="w-full bg-black" id="contact">
              <Footerdemo />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BusinessForm
        isOpen={showBusinessForm}
        onClose={() => setShowBusinessForm(false)}
        onSubmit={handleBusinessFormSubmit}
      />
    </div>
  )
}

export default Page