'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, User, X } from 'lucide-react'

const VisitorTypeDetector: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if visitor type has already been set
    const visitorType = localStorage.getItem('visitor-type')
    const visitorTypeSet = document.cookie.includes('visitor_type=')
    
    if (!visitorType && !visitorTypeSet) {
      // Show popup immediately after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000) // 2 second delay for better UX
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSelection = (type: 'retailer' | 'consumer') => {
    // Save to localStorage for immediate access
    localStorage.setItem('visitor-type', type)
    localStorage.setItem('visitor-type-timestamp', Date.now().toString())
    
    // Save as cookie for analytics tracking (30 days expiration)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    document.cookie = `visitor_type=${type}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`
    
    // Close popup
    setIsVisible(false)
    
    // Optional: Track with analytics (if you have Google Analytics or similar)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'visitor_type_selected', {
        'custom_parameter': type,
        'event_category': 'user_classification'
      })
    }
  }

  const handleClose = () => {
    // If they close without selecting, mark as consumer by default
    handleSelection('consumer')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[200] max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to Flexsteel!
              </h3>
              <p className="text-sm text-gray-600">
                Help us personalize your experience. Are you a:
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleSelection('retailer')}
                className="w-full p-4 bg-gray-50 hover:bg-white hover:shadow-lg hover:scale-[1.02] rounded-lg transition-all duration-200 flex items-center gap-3 group border-2 border-transparent hover:border-flexsteel-primary cursor-pointer active:scale-[0.98]"
              >
                <div className="p-2 bg-flexsteel-primary text-white rounded-full group-hover:shadow-md transition-all">
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 group-hover:text-flexsteel-primary transition-colors">Retailer</div>
                  <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Looking for wholesale or business solutions</div>
                </div>
              </button>

              <button
                onClick={() => handleSelection('consumer')}
                className="w-full p-4 bg-gray-50 hover:bg-white hover:shadow-lg hover:scale-[1.02] rounded-lg transition-all duration-200 flex items-center gap-3 group border-2 border-transparent hover:border-flexsteel-primary cursor-pointer active:scale-[0.98]"
              >
                <div className="p-2 bg-flexsteel-primary text-white rounded-full group-hover:shadow-md transition-all">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 group-hover:text-flexsteel-primary transition-colors">Consumer</div>
                  <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">Shopping for personal home furniture</div>
                </div>
              </button>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              This helps us show you the most relevant content
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VisitorTypeDetector