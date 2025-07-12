'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Star } from 'lucide-react';

interface PopularQueriesProps {
  onQuerySelect: (query: string) => void;
}

const PopularQueries: React.FC<PopularQueriesProps> = ({ onQuerySelect }) => {
  const popularQueries = [
    { query: 'Power reclining sofas', icon: <TrendingUp className="w-4 h-4" /> },
    { query: 'Leather sectionals', icon: <Star className="w-4 h-4" /> },
    { query: 'Living room sets', icon: <TrendingUp className="w-4 h-4" /> },
    { query: 'Accent chairs', icon: <Clock className="w-4 h-4" /> },
    { query: 'Dining tables', icon: <Star className="w-4 h-4" /> },
    { query: 'Bedroom furniture', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const categories = [
    { name: 'Living Room', query: 'living room furniture' },
    { name: 'Bedroom', query: 'bedroom furniture' },
    { name: 'Dining Room', query: 'dining room furniture' },
    { name: 'Home Office', query: 'home office furniture' },
  ];

  return (
    <div className="space-y-8 font-montserrat">
      {/* Popular Searches */}
      <div>
        <h3 className="text-lg font-semibold text-flexsteel-primary mb-4">Popular searches</h3>
        <div className="space-y-3">
          {popularQueries.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => onQuerySelect(item.query)}
              className="w-full flex items-center gap-4 px-4 py-3 text-left text-base text-flexsteel-primary hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 cursor-pointer"
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-flexsteel-primary">{item.icon}</span>
              <span className="font-medium">{item.query}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Browse by Category */}
      <div>
        <h3 className="text-lg font-semibold text-flexsteel-primary mb-4">Browse by category</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => onQuerySelect(category.query)}
              className="px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-base font-semibold text-flexsteel-primary transition-colors border border-gray-100 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-br from-flexsteel-primary/5 to-flexsteel-primary/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-flexsteel-primary mb-3">
          Try our AI-powered search
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ask questions like:
        </p>
        <div className="space-y-3">
          {[
            "What's the best sofa for a small apartment?",
            "Show me pet-friendly furniture",
            "I need a comfortable recliner under $1000"
          ].map((suggestion, index) => (
            <motion.button
              key={index}
              onClick={() => onQuerySelect(suggestion)}
              className="w-full text-left text-sm text-flexsteel-primary hover:text-black p-3 hover:bg-white/70 rounded-lg transition-colors font-medium cursor-pointer"
              whileHover={{ x: 4 }}
            >
              &quot;{suggestion}&quot;
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularQueries;