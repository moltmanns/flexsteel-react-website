'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';


interface WelcomeScreenProps {
  isOpen: boolean;
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isOpen, onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(null);

  useEffect(() => {
    // Load the Lottie animation
    fetch('/assets/Lines waves.json')
      .then(response => response.json())
      .then(data => setWaveAnimation(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  useEffect(() => {
    if (isOpen) {
      const contentTimer = setTimeout(() => setShowContent(true), 500);
      const completeTimer = setTimeout(onComplete, 3000);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isOpen, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 font-montserrat">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6 
        }}
        className="mb-8"
      >
        <div className="w-40 h-40 flex items-center justify-center">
          {waveAnimation ? (
            <Lottie 
              animationData={waveAnimation}
              loop={true}
              className="w-full h-full"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h2 
              className="text-2xl font-semibold text-flexsteel-primary mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to Flexsteel AI
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-base max-w-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              I&apos;m here to help you find the perfect furniture for your space. 
              Ask me anything about our products!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <button
                onClick={onComplete}
                className="px-6 py-2 bg-flexsteel-primary text-white rounded-full text-sm font-medium hover:bg-black transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeScreen;