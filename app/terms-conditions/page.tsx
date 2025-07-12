import React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Scale, ShoppingCart, RotateCcw, Shield, AlertTriangle } from 'lucide-react'

export default function TermsConditions() {
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
            <FileText className="w-10 h-10 text-flexsteel-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Flexsteel Industries. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Use of Our Website</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Permitted Use</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You may use our website for lawful purposes only. You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our website for any fraudulent or illegal activity</li>
                  <li>Interfere with the proper working of our website</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Account Registration</h3>
                <p className="text-gray-700 leading-relaxed">
                  To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Services */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Products and Services</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Product Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Colors and specifications may vary from images shown.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pricing and Availability</h3>
                <p className="text-gray-700 leading-relaxed">
                  Prices are subject to change without notice. Product availability may vary. We reserve the right to limit quantities and discontinue products at any time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Orders and Payment</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  By placing an order, you agree to provide current, complete, and accurate information. We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Refuse or cancel any order for any reason</li>
                  <li>Verify payment information before processing orders</li>
                  <li>Limit or prohibit orders from certain customers or geographic regions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns and Exchanges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Returns and Exchanges</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              Our return policy allows for returns within 30 days of delivery, subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Items must be in original condition and packaging</li>
              <li>Custom or special-order items may not be returnable</li>
              <li>Return shipping costs may apply</li>
              <li>Refunds will be processed to the original payment method</li>
            </ul>
          </section>

          {/* Warranty */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Warranty</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Limited Warranty</h3>
                <p className="text-gray-700 leading-relaxed">
                  Flexsteel products come with our Limited Lifetime Warranty on frame construction and Blue Steel Spring systems. Fabric and leather are warranted against manufacturing defects for specific periods as outlined in our warranty documentation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Warranty Exclusions</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Our warranty does not cover:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Normal wear and tear</li>
                  <li>Damage from misuse or abuse</li>
                  <li>Damage from pets, stains, or spills</li>
                  <li>Commercial or institutional use</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All content on our website, including text, graphics, logos, images, and software, is the property of Flexsteel Industries or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-flexsteel-primary" />
              <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please read this section carefully as it limits our liability to you.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-3">
              To the maximum extent permitted by law, Flexsteel Industries shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or information</li>
              <li>Business interruption</li>
              <li>Personal injury (except as required by law)</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Flexsteel Industries from any claims, damages, costs, or expenses arising from your use of our website, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Iowa, United States. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Dubuque County, Iowa.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our website after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@flexsteel.com
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

          {/* Effective Date */}
          <section className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              These Terms and Conditions are effective as of {new Date().toLocaleDateString()} and supersede all prior agreements and understandings between you and Flexsteel Industries.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}