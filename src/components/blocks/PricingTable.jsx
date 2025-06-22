'use client'
import { motion } from "framer-motion"
import { Check, X, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const PricingCard = ({ 
  tier, 
  price, 
  originalPrice,
  description, 
  features, 
  isPopular = false,
  buttonText = "Get Started",
  delay = 0 
}) => {
  return (
    <motion.div
      className={cn(
        "relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300",
        isPopular 
          ? "border-white/30 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl" 
          : "border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
        <p className="text-gray-400 text-sm mb-6">{description}</p>
        
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-white">{price}</span>
          {originalPrice && (
            <span className="text-xl text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
        <p className="text-gray-400 text-sm">per project</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-400" />
              </div>
            ) : (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mt-0.5">
                <X className="w-3 h-3 text-gray-500" />
              </div>
            )}
            <span className={cn(
              "text-sm",
              feature.included ? "text-gray-300" : "text-gray-500"
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Button 
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all duration-300",
          isPopular 
            ? "bg-white text-black hover:bg-gray-100 shadow-lg" 
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30"
        )}
      >
        {buttonText}
      </Button>
    </motion.div>
  )
}

function PricingDemo() {
  const pricingPlans = [
    {
      tier: "Starter",
      price: "$2,999",
      originalPrice: "$3,999",
      description: "Perfect for small businesses and startups",
      features: [
        { text: "Responsive Website Design", included: true },
        { text: "Up to 5 Pages", included: true },
        { text: "Basic SEO Optimization", included: true },
        { text: "Contact Form Integration", included: true },
        { text: "Mobile Optimization", included: true },
        { text: "1 Month Support", included: true },
        { text: "E-commerce Integration", included: false },
        { text: "Advanced Analytics", included: false },
        { text: "Custom Animations", included: false },
      ],
      buttonText: "Start Project",
      delay: 0
    },
    {
      tier: "Professional",
      price: "$5,999",
      originalPrice: "$7,999",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        { text: "Custom Website Design", included: true },
        { text: "Up to 15 Pages", included: true },
        { text: "Advanced SEO Optimization", included: true },
        { text: "Contact & Lead Forms", included: true },
        { text: "Mobile & Tablet Optimization", included: true },
        { text: "3 Months Support", included: true },
        { text: "Basic E-commerce (up to 50 products)", included: true },
        { text: "Google Analytics Integration", included: true },
        { text: "Custom Animations", included: true },
        { text: "Social Media Integration", included: true },
        { text: "Blog/CMS Setup", included: false },
        { text: "Advanced E-commerce", included: false },
      ],
      buttonText: "Choose Professional",
      isPopular: true,
      delay: 0.1
    },
    {
      tier: "Enterprise",
      price: "$12,999",
      originalPrice: "$15,999",
      description: "Complete solution for large businesses",
      features: [
        { text: "Premium Custom Design", included: true },
        { text: "Unlimited Pages", included: true },
        { text: "Enterprise SEO Strategy", included: true },
        { text: "Advanced Form Builder", included: true },
        { text: "Multi-device Optimization", included: true },
        { text: "6 Months Support", included: true },
        { text: "Full E-commerce Solution", included: true },
        { text: "Advanced Analytics Dashboard", included: true },
        { text: "Premium Animations & Interactions", included: true },
        { text: "Social Media Integration", included: true },
        { text: "Blog/CMS with Admin Panel", included: true },
        { text: "Payment Gateway Integration", included: true },
        { text: "User Authentication System", included: true },
        { text: "API Integrations", included: true },
      ],
      buttonText: "Contact Sales",
      delay: 0.2
    }
  ]

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your digital presence with our comprehensive web development packages. 
            Each plan is designed to deliver exceptional results tailored to your business needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Need a custom solution? We're here to help you build something extraordinary.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
            Get Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export { PricingDemo }