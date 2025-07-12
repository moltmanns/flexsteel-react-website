'use client'

import React, { useState } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchConfig as SearchConfigType } from '@/app/services/search.service';

interface SearchConfigProps {
  onConfigChange: (config: SearchConfigType) => void;
}

const SearchConfig: React.FC<SearchConfigProps> = ({ onConfigChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<SearchConfigType>({
    useAI: true,
    useSemanticSearch: false,
    limit: 10
  });

  const handleConfigUpdate = (key: keyof SearchConfigType, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      >
        <Settings className="w-3 h-3" />
        <span>Search settings</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
          >
            <div className="space-y-3">
              {/* AI Search Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">AI-Powered Search</label>
                <button
                  onClick={() => handleConfigUpdate('useAI', !config.useAI)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                    config.useAI ? 'bg-flexsteel-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      config.useAI ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Semantic Search Toggle */}
              {config.useAI && (
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">Semantic Search</label>
                  <button
                    onClick={() => handleConfigUpdate('useSemanticSearch', !config.useSemanticSearch)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      config.useSemanticSearch ? 'bg-flexsteel-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        config.useSemanticSearch ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Results Limit */}
              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Results per page
                </label>
                <select
                  value={config.limit}
                  onChange={(e) => handleConfigUpdate('limit', parseInt(e.target.value))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchConfig;