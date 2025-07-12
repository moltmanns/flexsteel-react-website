'use client'

import React, { useRef, useEffect } from 'react';
import { Search, Mic, MicOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceSearch from './VoiceSearch';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onVoiceResult: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  isSearching?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  onVoiceResult,
  isListening,
  setIsListening,
  isSearching = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative font-montserrat">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for furniture..."
          className="pl-10 pr-20 h-12 text-base border-gray-300 focus:border-flexsteel-primary transition-colors"
          disabled={isListening || isSearching}
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        {/* Voice Search Button */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onQueryChange('')}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              ×
            </motion.button>
          )}
          
          <VoiceSearch
            onResult={onVoiceResult}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        </div>
      </div>
      
      {/* Voice indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600"
          >
            <div className="flex gap-1">
              <motion.div 
                className="w-1 h-4 bg-flexsteel-primary rounded-full"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              <motion.div 
                className="w-1 h-4 bg-flexsteel-primary rounded-full"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
              />
              <motion.div 
                className="w-1 h-4 bg-flexsteel-primary rounded-full"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
              />
            </div>
            <span>Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;