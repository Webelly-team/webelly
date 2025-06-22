'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const portfolioData = {
  ecommerce: [
    {
      id: 1,
      title: 'Fashion Forward Store',
      description: 'Modern e-commerce platform with advanced filtering and seamless checkout',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      category: 'E-commerce',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Organic Marketplace',
      description: 'Multi-vendor platform for organic products with vendor management',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
      tags: ['Next.js', 'PostgreSQL', 'PayPal', 'AWS'],
      category: 'E-commerce',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  corporate: [
    {
      id: 3,
      title: 'TechCorp Solutions',
      description: 'Corporate website with CMS and client portal integration',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
      category: 'Corporate',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Global Consulting',
      description: 'Enterprise-level website with advanced analytics and reporting',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      tags: ['Angular', 'Express', 'MongoDB', 'Azure'],
      category: 'Corporate',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  healthcare: [
    {
      id: 5,
      title: 'MediCare Plus',
      description: 'Patient management system with appointment scheduling',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      tags: ['React', 'Firebase', 'HIPAA', 'PWA'],
      category: 'Healthcare',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  education: [
    {
      id: 6,
      title: 'EduTech Platform',
      description: 'Online learning management system with video streaming',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
      category: 'Education',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  restaurant: [
    {
      id: 7,
      title: 'Gourmet Bistro',
      description: 'Restaurant website with online ordering and table reservations',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Stripe', 'Twilio', 'PostgreSQL'],
      category: 'Restaurant',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  automotive: [
    {
      id: 8,
      title: 'AutoDealer Pro',
      description: 'Car dealership platform with inventory management',
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
      category: 'Automotive',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  realestate: [
    {
      id: 9,
      title: 'PropertyHub',
      description: 'Real estate platform with virtual tours and mortgage calculator',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Mapbox'],
      category: 'Real Estate',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  creative: [
    {
      id: 10,
      title: 'ArtStudio Portfolio',
      description: 'Creative portfolio with interactive galleries and client booking',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Framer Motion', 'Sanity', 'Vercel'],
      category: 'Creative',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  technology: [
    {
      id: 11,
      title: 'DevTools Dashboard',
      description: 'SaaS platform for developers with analytics and monitoring',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'Express', 'PostgreSQL', 'Redis'],
      category: 'Technology',
      liveUrl: '#',
      githubUrl: '#'
    }
  ],
  consulting: [
    {
      id: 12,
      title: 'Business Advisors',
      description: 'Consulting firm website with client portal and resource library',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Django', 'PostgreSQL', 'Stripe'],
      category: 'Consulting',
      liveUrl: '#',
      githubUrl: '#'
    }
  ]
}

const services = {
  ecommerce: [
    'Custom E-commerce Development',
    'Inventory Management Systems',
    'Multi-vendor Marketplaces',
    'Mobile Commerce Apps',
    'SEO & Digital Marketing'
  ],
  corporate: [
    'Corporate Website Development',
    'Content Management Systems',
    'Client Portal Development',
    'Enterprise Applications',
    'API Development & Integration',
    'Cloud Solutions & DevOps'
  ],
  healthcare: [
    'HIPAA Compliant Applications',
    'Patient Management Systems',
    'Telemedicine Platforms',
    'Medical Records Management',
    'Appointment Scheduling',
    'Healthcare Analytics'
  ],
  education: [
    'Learning Management Systems',
    'Online Course Platforms',
    'Student Information Systems',
    'Virtual Classroom Solutions',
    'Educational Mobile Apps',
    'Assessment & Testing Tools'
  ],
  restaurant: [
    'Restaurant Website Development',
    'Online Ordering Systems',
    'Table Reservation Systems',
    'Menu Management',
    'POS Integration',
    'Delivery App Development'
  ],
  automotive: [
    'Dealership Websites',
    'Inventory Management',
    'Vehicle Listing Platforms',
    'Service Booking Systems',
    'Parts E-commerce',
    'Customer Relationship Management'
  ],
  realestate: [
    'Property Listing Websites',
    'Virtual Tour Integration',
    'CRM for Real Estate',
    'Mortgage Calculators',
    'Property Management Systems',
    'Real Estate Mobile Apps'
  ],
  creative: [
    'Portfolio Websites',
    'Creative Agency Sites',
    'Art Gallery Platforms',
    'Booking & Scheduling Systems',
    'Client Management Tools',
    'Creative Marketplace Development'
  ],
  technology: [
    'SaaS Platform Development',
    'API Development',
    'Cloud Applications',
    'DevOps & Infrastructure',
    'Mobile App Development',
    'AI/ML Integration'
  ],
  consulting: [
    'Professional Service Websites',
    'Client Portal Development',
    'Resource Management Systems',
    'Consultation Booking',
    'Knowledge Base Development',
    'Business Analytics Dashboards'
  ]
}

export function PortfolioSection({ businessType = 'corporate' }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const relevantPortfolio = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioData[businessType] || portfolioData.corporate
    }
    return (portfolioData[businessType] || portfolioData.corporate).filter(
      item => item.category.toLowerCase() === activeFilter.toLowerCase()
    )
  }, [businessType, activeFilter])

  const relevantServices = services[businessType] || services.corporate

  return (
    <section ref={sectionRef} className="py-20 bg-black" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Work & Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tailored solutions for your industry with proven results and cutting-edge technology
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Services We Offer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relevantServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-white font-medium">{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relevantPortfolio.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                        {project.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-gradient-to-r from-gray-200 cursor-pointer hover:bg-gray-300 to-gray-400 ">
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}