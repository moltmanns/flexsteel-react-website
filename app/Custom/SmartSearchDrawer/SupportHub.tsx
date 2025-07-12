'use client'

import React from 'react';
import { Phone, Mail, MessageSquare, Clock, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SupportHubProps {
  isVisible: boolean;
}

const SupportHub: React.FC<SupportHubProps> = ({ isVisible }) => {
  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Call Us',
      description: '1-800-FLEXSTEEL',
      subtext: 'Mon-Fri 8am-5pm CST',
      action: 'Call Now'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Support',
      description: 'support@flexsteel.com',
      subtext: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Live Chat',
      description: 'Chat with an expert',
      subtext: 'Available now',
      action: 'Start Chat',
      available: true
    }
  ];

  const quickHelp = [
    {
      question: 'Where is my order?',
      answer: 'Track your order status in real-time'
    },
    {
      question: 'Return or exchange',
      answer: 'Start a return or exchange request'
    },
    {
      question: 'Warranty claim',
      answer: 'File a warranty claim online'
    },
    {
      question: 'Product manuals',
      answer: 'Download assembly instructions'
    }
  ];

  const storeLocator = {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Find a Store',
    description: 'Locate authorized Flexsteel dealers near you',
    stores: [
      { name: 'Flexsteel Gallery - Downtown', distance: '2.3 miles' },
      { name: 'Home Furnishings Plus', distance: '5.7 miles' },
      { name: 'Comfort Living Furniture', distance: '8.1 miles' }
    ]
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-flexsteel-primary mb-2">Support Center</h2>
        <p className="text-sm text-gray-600">We're here to help</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 pr-4">
          {/* Contact Methods */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Contact Us</h3>
            <div className="space-y-2">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-flexsteel-primary mt-0.5">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-flexsteel-primary text-sm">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-700 font-medium mt-1">
                          {method.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {method.subtext}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {method.available && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 mb-2">
                          <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                          Online
                        </span>
                      )}
                      <button className="text-sm font-medium text-flexsteel-primary hover:text-black cursor-pointer">
                        {method.action} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Help */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Help</h3>
            <div className="space-y-2">
              {quickHelp.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-flexsteel-primary">
                        {item.question}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.answer}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-flexsteel-primary transition-colors">
                      →
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Store Locator */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="text-flexsteel-primary">
                {storeLocator.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  {storeLocator.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {storeLocator.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {storeLocator.stores.map((store, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-flexsteel-primary">{store.name}</span>
                  <span className="text-xs text-gray-500">{store.distance}</span>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 text-sm font-medium text-flexsteel-primary hover:text-black transition-colors cursor-pointer">
              View All Locations →
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SupportHub;