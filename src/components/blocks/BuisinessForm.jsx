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
  // Changed color to use shades of gray/white for monochrome look
  { value: 'ecommerce', label: 'E-commerce & Retail', icon: ShoppingCart, color: 'bg-gray-700' },
  { value: 'corporate', label: 'Corporate & Enterprise', icon: Building2, color: 'bg-gray-700' },
  { value: 'healthcare', label: 'Healthcare & Medical', icon: Heart, color: 'bg-gray-700' },
  { value: 'education', label: 'Education & Training', icon: GraduationCap, color: 'bg-gray-700' },
  { value: 'restaurant', label: 'Restaurant & Food', icon: Utensils, color: 'bg-gray-700' },
  { value: 'automotive', label: 'Automotive & Transport', icon: Car, color: 'bg-gray-700' },
  { value: 'realestate', label: 'Real Estate & Property', icon: Home, color: 'bg-gray-700' },
  { value: 'creative', label: 'Creative & Design', icon: Palette, color: 'bg-gray-700' },
  { value: 'technology', label: 'Technology & Software', icon: Code, color: 'bg-gray-700' },
  { value: 'consulting', label: 'Consulting & Services', icon: Users, color: 'bg-gray-700' },
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

    await new Promise(resolve => setTimeout(resolve, 1000))

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
          <Card className="bg-gray-950 border-gray-800 text-white"> {/* Darker background, subtle border */}
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-gray-500 hover:text-white" // Lighter gray for icon, white on hover
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold text-white"> {/* Solid white title */}
                Tell Us About Your Business
              </CardTitle>
              <CardDescription className="text-gray-400"> {/* Consistent gray for description */}
                Help us understand your needs so we can provide the best solutions
              </CardDescription>

              {/* Progress Bar */}
              <div className="flex space-x-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      i <= step ? 'bg-white' : 'bg-gray-700' // White for active step, gray for inactive
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
                        <Label className="text-lg font-semibold mb-4 block text-white">What type of business do you have?</Label> {/* White label */}
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
                                    ? 'border-white bg-gray-800' // White border, gray background for selected
                                    : 'border-gray-700 hover:border-gray-600 bg-gray-900' // Darker gray for unselected
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${type.color}`}> {/* This will now apply bg-gray-700 */}
                                    <Icon className="h-5 w-5 text-white" />
                                  </div>
                                  <span className="font-medium text-white">{type.label}</span> {/* White text */}
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
                          <Label htmlFor="companyName" className="text-sm font-medium text-white">Company Name</Label> {/* White label */}
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" // Darker input, gray border, gray placeholder
                            placeholder="Enter your company name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="industry" className="text-sm font-medium text-white">Industry/Niche</Label> {/* White label */}
                          <Input
                            id="industry"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                            placeholder="e.g., Fashion, Tech, Food & Beverage"
                          />
                        </div>

                        <div>
                          <Label htmlFor="budget" className="text-sm font-medium text-white">Project Budget</Label> {/* White label */}
                          <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select your budget range" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white"> {/* Darker content, gray border */}
                              <SelectItem value="under-5k" className="hover:bg-gray-700">Under $5,000</SelectItem>
                              <SelectItem value="5k-15k" className="hover:bg-gray-700">$5,000 - $15,000</SelectItem>
                              <SelectItem value="15k-50k" className="hover:bg-gray-700">$15,000 - $50,000</SelectItem>
                              <SelectItem value="50k-plus" className="hover:bg-gray-700">$50,000+</SelectItem>
                              <SelectItem value="discuss" className="hover:bg-gray-700">Let's discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timeline" className="text-sm font-medium text-white">Project Timeline</Label> {/* White label */}
                          <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="When do you need this completed?" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white"> {/* Darker content, gray border */}
                              <SelectItem value="asap" className="hover:bg-gray-700">ASAP (Rush job)</SelectItem>
                              <SelectItem value="1-month" className="hover:bg-gray-700">Within 1 month</SelectItem>
                              <SelectItem value="2-3-months" className="hover:bg-gray-700">2-3 months</SelectItem>
                              <SelectItem value="3-6-months" className="hover:bg-gray-700">3-6 months</SelectItem>
                              <SelectItem value="flexible" className="hover:bg-gray-700">I'm flexible</SelectItem>
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
                        <Label htmlFor="projectDescription" className="text-sm font-medium text-white">Project Description</Label> {/* White label */}
                        <Textarea
                          id="projectDescription"
                          value={formData.projectDescription}
                          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white min-h-[120px] placeholder:text-gray-500"
                          placeholder="Tell us about your project goals, features you need, target audience, etc."
                        />
                      </div>

                      {selectedBusinessType && (
                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-700"> {/* Darker background, gray border */}
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg ${selectedBusinessType.color}`}> {/* Uses the bg-gray-700 */}
                              <selectedBusinessType.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-white">{selectedBusinessType.label}</span> {/* White text */}
                          </div>
                          <p className="text-sm text-gray-300"> {/* Lighter gray for description */}
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
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white" // Darker border, gray text, hover effects
                  >
                    Previous
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={step === 1 && !formData.businessType}
                      className="bg-white text-black hover:bg-gray-200" // White button, black text, gray hover
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.projectDescription}
                      className="bg-white text-black hover:bg-gray-200" // White button, black text, gray hover
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