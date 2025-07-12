'use client'

import React from 'react';
import { Search, MessageSquare, BookOpen, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { AssistantMode } from '@/app/types/search';

interface ModeSelectorProps {
  currentMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const modes: { id: AssistantMode; label: string; icon: React.ReactNode }[] = [
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <Headphones className="w-5 h-5" /> },
  ];

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-4">
      <div className="flex justify-around items-center">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
              flex flex-col items-center justify-center px-4 py-3 rounded-xl transition-all font-montserrat cursor-pointer
              ${currentMode === mode.id 
                ? 'bg-flexsteel-primary text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="mb-1"
              animate={{
                scale: currentMode === mode.id ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {mode.icon}
            </motion.div>
            <span className={`text-xs font-medium ${
              currentMode === mode.id ? 'text-white' : 'text-gray-500'
            }`}>
              {mode.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;