'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, Settings } from 'lucide-react'
import Link from 'next/link'

const GDPRBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const gdprConsent = localStorage.getItem('gdpr-consent')
    if (!gdprConsent) {
      // Show after a brief delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('gdpr-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('gdpr-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    const consent = {
      ...cookiePreferences,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('gdpr-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const handlePreferenceChange = (type: keyof typeof cookiePreferences) => {
    if (type === 'necessary') return // Necessary cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto p-6">
            {!showDetails ? (
              // Simple Cookie Notice
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="w-6 h-6 text-flexsteel-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience, 
                      analyze website traffic, and provide personalized content. By clicking &quot;Accept All&quot;, 
                      you consent to our use of cookies. You can manage your preferences or learn more in our{' '}
                      <Link href="/privacy-policy" className="text-flexsteel-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 text-sm bg-flexsteel-primary text-white rounded-lg hover:bg-black transition-colors font-medium"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              // Detailed Cookie Preferences
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-flexsteel-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Cookie Preferences
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Necessary Cookies */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                        <p className="text-sm text-gray-600">Required for basic site functionality</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Always Active
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      These cookies are essential for the website to function properly and cannot be disabled.
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                        <p className="text-sm text-gray-600">Enhanced website features and personalization</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences.functional}
                          onChange={() => handlePreferenceChange('functional')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Remember your preferences and provide enhanced features like live chat support.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                        <p className="text-sm text-gray-600">Help us understand website usage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences.analytics}
                          onChange={() => handlePreferenceChange('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Collect anonymous statistics to help us improve our website and user experience.
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                        <p className="text-sm text-gray-600">Personalized ads and content</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences.marketing}
                          onChange={() => handlePreferenceChange('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Show you relevant ads and content based on your interests and browsing behavior.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex-1">
                    For more information, please read our{' '}
                    <Link href="/privacy-policy" className="text-flexsteel-primary hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms-conditions" className="text-flexsteel-primary hover:underline">
                      Terms & Conditions
                    </Link>
                    .
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-2 text-sm bg-flexsteel-primary text-white rounded-lg hover:bg-black transition-colors font-medium"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GDPRBar