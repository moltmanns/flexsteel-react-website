import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Database, UserCheck, Globe, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-flexsteel-primary hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-flexsteel-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Flexsteel Industries (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We may collect personal information that you voluntarily provide, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Account credentials and preferences</li>
                  <li>Communication preferences and marketing consents</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When you visit our website, we automatically collect certain information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring websites and search terms</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Process and fulfill your orders and transactions</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our website, products, and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze website usage and user behavior</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Cookies and Tracking Technologies</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your browsing experience. You can control cookie preferences through our cookie consent banner or your browser settings.
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                <p className="text-sm text-gray-600">Essential for website functionality and cannot be disabled.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                <p className="text-sm text-gray-600">Enable enhanced features and personalization.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                <p className="text-sm text-gray-600">Help us understand how you use our website.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                <p className="text-sm text-gray-600">Used to show you relevant ads and content.</p>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Information Sharing and Disclosure</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal requirements or protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@flexsteel.com
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Flexsteel Industries, Inc.<br />
                3993 West 32nd Street<br />
                Dubuque, IA 52002
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> 1-800-FLEXSTEEL
              </p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}