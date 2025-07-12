'use client'

import React from 'react';
import SearchMode from './SearchMode';
import ChatInterface from './ChatInterface';
import ResourceHub from './ResourceHub';
import SupportHub from './SupportHub';
import ModeSelector from './ModeSelector';
import { Product, ChatMessage, AssistantMode } from '@/app/types/search';
import { SearchConfig } from '@/app/services/search.service';

interface DrawerContentProps {
  currentMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onVoiceResult: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  searchResults: Product[];
  hasSearched: boolean;
  isSearching: boolean;
  chatMessages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isOpen: boolean;
  onConfigChange: (config: SearchConfig) => void;
  onClearSearch?: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  currentMode,
  onModeChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onVoiceResult,
  isListening,
  setIsListening,
  searchResults,
  hasSearched,
  isSearching,
  chatMessages,
  isTyping,
  onSendMessage,
  onClearChat,
  isOpen,
  onConfigChange,
  onClearSearch
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Content based on current mode */}
      <div className="flex-1 overflow-hidden">
        {currentMode === 'search' && (
          <SearchMode
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            onVoiceResult={onVoiceResult}
            isListening={isListening}
            setIsListening={setIsListening}
            searchResults={searchResults}
            hasSearched={hasSearched}
            isSearching={isSearching}
            isOpen={isOpen}
            onConfigChange={onConfigChange}
            onClearSearch={onClearSearch}
          />
        )}

        {currentMode === 'chat' && (
          <div className="h-full px-4 py-6">
            <ChatInterface 
              messages={chatMessages}
              isTyping={isTyping}
              onSendMessage={onSendMessage}
              onClearChat={onClearChat}
              isVisible={true}
            />
          </div>
        )}

        {currentMode === 'resources' && (
          <div className="h-full px-8 py-6">
            <ResourceHub isVisible={true} />
          </div>
        )}

        {currentMode === 'support' && (
          <div className="h-full px-4 py-6">
            <SupportHub isVisible={true} />
          </div>
        )}
      </div>

      {/* Mode Selector - at bottom */}
      <ModeSelector 
        currentMode={currentMode}
        onModeChange={onModeChange}
      />
    </div>
  );
};

export default DrawerContent;