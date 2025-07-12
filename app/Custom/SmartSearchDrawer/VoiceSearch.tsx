'use client'

import React, { useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, isListening, setIsListening }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onResult, setIsListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice search is not supported in your browser. Please try Chrome or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!process.env.NEXT_PUBLIC_ENABLE_VOICE_SEARCH || process.env.NEXT_PUBLIC_ENABLE_VOICE_SEARCH !== 'true') {
    return null;
  }

  return (
    <motion.button
      onClick={toggleListening}
      className={`p-2 rounded-full transition-all cursor-pointer ${
        isListening 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isListening ? { scale: [1, 1.1, 1] } : {}}
      transition={isListening ? { repeat: Infinity, duration: 1.5 } : {}}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default VoiceSearch;