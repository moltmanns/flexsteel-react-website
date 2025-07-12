'use client'

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SearchDrawerProps } from '@/app/types/search';
import { useSearchDrawer } from '@/app/hooks/useSearchDrawer';
import WelcomeScreen from './WelcomeScreen';
import DrawerContent from './DrawerContent';

const SmartSearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const {
    showWelcome,
    currentMode,
    searchQuery,
    searchResults,
    isListening,
    hasSearched,
    isSearching,
    chatMessages,
    isTyping,
    handleSearch,
    handleVoiceResult,
    handleModeChange,
    handleWelcomeComplete,
    handleConfigChange,
    handleClearSearch,
    sendChatMessage,
    clearChat,
    setSearchQuery,
    setIsListening
  } = useSearchDrawer(isOpen);

  // Disable background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Drawer - slides from right with max-width of 500px */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-50 font-montserrat"
          >
            <div className="flex flex-col h-full relative">
              {/* Close button */}
              <div className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-flexsteel-primary sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden pt-4 sm:pt-6">
                <AnimatePresence mode="wait">
                  {showWelcome ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <WelcomeScreen 
                        isOpen={isOpen}
                        onComplete={handleWelcomeComplete}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <DrawerContent
                        currentMode={currentMode}
                        onModeChange={handleModeChange}
                        searchQuery={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                        onSearch={handleSearch}
                        onVoiceResult={handleVoiceResult}
                        isListening={isListening}
                        setIsListening={setIsListening}
                        searchResults={searchResults}
                        hasSearched={hasSearched}
                        isSearching={isSearching}
                        chatMessages={chatMessages}
                        isTyping={isTyping}
                        onSendMessage={sendChatMessage}
                        onClearChat={clearChat}
                        isOpen={isOpen}
                        onConfigChange={handleConfigChange}
                        onClearSearch={handleClearSearch}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SmartSearchDrawer;