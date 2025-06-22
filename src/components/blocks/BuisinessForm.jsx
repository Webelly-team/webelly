'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Building2, ShoppingCart, Briefcase, Heart, GraduationCap, Utensils, Car, Home, Palette, Code, Users } from 'lucide-react'

const businessTypes = [
  { value: 'ecommerce', label: 'E-commerce & Retail', icon: ShoppingCart, color: 'from-blue-500 to-purple-600' },
  { value: 'corporate', label: 'Corporate & Enterprise', icon: Building2, color: 'from-gray-600 to-blue-700' },
  { value: 'healthcare', label: 'Healthcare & Medical', icon: Heart, color: 'from-red-500 to-pink-600' },
  { value: 'education', label: 'Education & Training', icon: GraduationCap, color: 'from-green-500 to-teal-600' },
  { value: 'restaurant', label: 'Restaurant & Food', icon: Utensils, color: 'from-orange-500 to-red-600' },
  { value: 'automotive', label: 'Automotive & Transport', icon: Car, color: 'from-indigo-500 to-blue-600' },
  { value: 'realestate', label: 'Real Estate & Property', icon: Home, color: 'from-emerald-500 to-green-600' },
  { value: 'creative', label: 'Creative & Design', icon: Palette, color: 'from-purple-500 to-pink-600' },
  { value: 'technology', label: 'Technology & Software', icon: Code, color: 'from-cyan-500 to-blue-600' },
  { value: 'consulting', label: 'Consulting & Services', icon: Users, color: 'from-yellow-500 to-orange-600' },
]

export function BusinessForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    businessType: '',
    companyName: '',
    industry: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save to localStorage
    localStorage.setItem('webellyBusinessProfile', JSON.stringify(formData))
    
    setIsSubmitting(false)
    onSubmit(formData)
    onClose()
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const selectedBusinessType = businessTypes.find(type => type.value === formData.businessType)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="bg-gray-900/95 border-gray-700 text-white">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Tell Us About Your Business
              </CardTitle>
              <CardDescription className="text-gray-400">
                Help us understand your needs so we can provide the best solutions
              </CardDescription>
              
              {/* Progress Bar */}
              <div className="flex space-x-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      i <= step ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="text-lg font-semibold mb-4 block">What type of business do you have?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {businessTypes.map((type) => {
                            const Icon = type.icon
                            return (
                              <motion.button
                                key={type.value}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setFormData({ ...formData, businessType: type.value })}
                                className={`p-4 rounded-lg border-2 transition-all text-left ${
                                  formData.businessType === type.value
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                                    <Icon className="h-5 w-5 text-white" />
                                  </div>
                                  <span className="font-medium">{type.label}</span>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder="Enter your company name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="industry" className="text-sm font-medium">Industry/Niche</Label>
                          <Input
                            id="industry"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder="e.g., Fashion, Tech, Food & Beverage"
                          />
                        </div>

                        <div>
                          <Label htmlFor="budget" className="text-sm font-medium">Project Budget</Label>
                          <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select your budget range" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="under-5k">Under $5,000</SelectItem>
                              <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                              <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                              <SelectItem value="50k-plus">$50,000+</SelectItem>
                              <SelectItem value="discuss">Let's discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timeline" className="text-sm font-medium">Project Timeline</Label>
                          <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="When do you need this completed?" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                              <SelectItem value="1-month">Within 1 month</SelectItem>
                              <SelectItem value="2-3-months">2-3 months</SelectItem>
                              <SelectItem value="3-6-months">3-6 months</SelectItem>
                              <SelectItem value="flexible">I'm flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="projectDescription" className="text-sm font-medium">Project Description</Label>
                        <Textarea
                          id="projectDescription"
                          value={formData.projectDescription}
                          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                          placeholder="Tell us about your project goals, features you need, target audience, etc."
                        />
                      </div>

                      {selectedBusinessType && (
                        <div className="p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedBusinessType.color}`}>
                              <selectedBusinessType.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold">{selectedBusinessType.label}</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            We'll customize our portfolio and service recommendations based on your business type.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Previous
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={step === 1 && !formData.businessType}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.projectDescription}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmitting ? 'Submitting...' : 'Complete Setup'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}