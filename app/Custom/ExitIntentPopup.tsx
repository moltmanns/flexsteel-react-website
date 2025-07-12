'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Mail, CheckCircle, Gift } from 'lucide-react'
import Image from 'next/image'

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{email?: string; consent?: string}>({})

  useEffect(() => {
    // Check if popup was shown recently (within 3 days)
    const lastShown = localStorage.getItem('exit-intent-last-shown')
    const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000) // 3 days in milliseconds
    
    if (lastShown && parseInt(lastShown) > threeDaysAgo) {
      setHasShown(true)
      return
    }

    // Show popup after 1 minute (60 seconds)
    const showTimer = setTimeout(() => {
      if (!hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        localStorage.setItem('exit-intent-last-shown', Date.now().toString())
      }
    }, 60000) // 60 seconds

    return () => {
      clearTimeout(showTimer)
    }
  }, [hasShown, isVisible])

  const validateForm = () => {
    const newErrors: {email?: string; consent?: string} = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!consent) {
      newErrors.consent = 'Please agree to receive our catalog'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
      
      // Auto close after success
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image */}
              <div className="md:w-2/5 relative h-48 md:h-auto">
                <Image
                  src="/assets/0520.webp"
                  alt="Stylish Interior Design"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>

              {/* Right Side - Content */}
              <div className="md:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-flexsteel-primary rounded-full">
                          <Gift className="w-4 h-4 text-white" />
                        </div>
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          FREE CATALOG
                        </span>
                      </div>
                      
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-2">
                        See the Latest Popular Interior Styles before Everyone Else!
                      </h2>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Get instant access to our exclusive 2025 Interior Styles Catalog. Download your free PDF guide now!
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email Input */}
                      <div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (errors.email) setErrors(prev => ({...prev, email: undefined}))
                            }}
                            placeholder="Enter your email address"
                            className={`w-full pl-10 pr-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-flexsteel-primary transition-colors ${
                              errors.email ? 'border-red-500' : 'border-gray-200 focus:border-flexsteel-primary'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Consent Checkbox */}
                      <div>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => {
                              setConsent(e.target.checked)
                              if (errors.consent) setErrors(prev => ({...prev, consent: undefined}))
                            }}
                            className="mt-0.5 w-4 h-4 text-flexsteel-primary border-2 border-gray-300 rounded focus:ring-flexsteel-primary focus:ring-1"
                          />
                          <span className="text-xs text-gray-600 leading-relaxed">
                            I agree to receive the free catalog and updates from Flexsteel. 
                            View our{' '}
                            <a href="/privacy-policy" className="text-flexsteel-primary hover:underline font-medium">
                              Privacy Policy
                            </a>.
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="text-red-500 text-xs mt-1 ml-1">{errors.consent}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-flexsteel-primary text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Catalog...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download Free Catalog
                          </>
                        )}
                      </button>
                    </form>

                    {/* Trust Indicators */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>✓ Instant</span>
                        <span>✓ No spam</span>
                        <span>✓ Unsubscribe anytime</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-4">
                    <div className="mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Your free catalog is on its way to <strong>{email}</strong>. 
                        Check your inbox (and spam folder) for the download link.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">What&apos;s Next?</h4>
                      <p className="text-xs text-gray-600">
                        Explore our website to see these styles in action, or contact our design experts 
                        for personalized recommendations.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExitIntentPopup