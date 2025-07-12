'use client'

import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PopularQueries from './PopularQueries';
import { Product } from '@/app/types/search';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SearchModeProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onVoiceResult: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  searchResults: Product[];
  hasSearched: boolean;
  isSearching: boolean;
  onClearSearch?: () => void;
}

const SearchMode: React.FC<SearchModeProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onVoiceResult,
  isListening,
  setIsListening,
  searchResults,
  hasSearched,
  isSearching,
  onClearSearch
}) => {
  return (
    <div className="flex flex-col h-full font-montserrat">
      {/* Search Header */}
      <div className="px-6 pb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-medium text-flexsteel-primary mb-6"
        >
          What are you looking for?
        </motion.h2>
        
        <SearchBar
          query={searchQuery}
          onQueryChange={onSearchQueryChange}
          onSearch={onSearch}
          onVoiceResult={onVoiceResult}
          isListening={isListening}
          setIsListening={setIsListening}
          isSearching={isSearching}
        />
      </div>
      
      {/* Results or Popular Queries */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-32"
            >
              <Loader2 className="w-8 h-8 animate-spin text-flexsteel-primary" />
            </motion.div>
          ) : hasSearched && searchResults.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-base font-medium text-gray-700">
                  {searchResults.length} results for &quot;{searchQuery}&quot;
                </p>
                {onClearSearch && (
                  <button
                    onClick={onClearSearch}
                    className="text-sm text-flexsteel-primary hover:underline font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <SearchResults products={searchResults} />
            </motion.div>
          ) : hasSearched && searchResults.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <p className="text-gray-600 mb-2">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-gray-500">Try different keywords or browse our categories</p>
              {onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="mt-4 text-sm text-flexsteel-primary hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="popular"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PopularQueries onQuerySelect={onSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchMode;