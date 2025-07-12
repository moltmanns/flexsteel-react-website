'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';


interface WelcomeScreenProps {
  isOpen: boolean;
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isOpen, onComplete }) => {
  const [waveAnimation, setWaveAnimation] = useState(null);
  const [animatedText, setAnimatedText] = useState('');

  const welcomeText = 'Welcome to Flexsteel\'s Smart Search';

  useEffect(() => {
    // Load the Lottie animation
    fetch('/assets/Lines waves.json')
      .then(response => response.json())
      .then(data => setWaveAnimation(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Start letter-by-letter animation after 500ms
      const textTimer = setTimeout(() => {
        welcomeText.split('').forEach((char, index) => {
          setTimeout(() => {
            setAnimatedText(prev => prev + char);
          }, index * 50); // 50ms delay between each letter
        });
      }, 500);

      // Auto-transition to search after 7 seconds
      const completeTimer = setTimeout(onComplete, 7000);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(completeTimer);
      };
    } else {
      // Reset text when closing
      setAnimatedText('');
    }
  }, [isOpen, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 font-montserrat bg-white">
      {/* Clean Welcome Text */}
      <div className="text-center mb-12">
        <div className="text-3xl font-medium text-gray-800 mb-4 min-h-[4rem] flex items-center justify-center flex-wrap">
          {animatedText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Main Lottie Animation - Audio Waveform - Much Larger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          delay: 1.2,
          ease: "easeOut"
        }}
        className="mb-12"
      >
        <div className="w-[500px] h-[200px] flex items-center justify-center">
          {waveAnimation ? (
            <Lottie 
              animationData={waveAnimation}
              loop={true}
              className="w-full h-full"
            />
          ) : (
            <div className="w-[450px] h-[180px] bg-gray-100 rounded animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* Subtle hint text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <p className="text-gray-500 text-base max-w-md">
          Ask me anything about furniture, styles, or find the perfect piece for your space
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;