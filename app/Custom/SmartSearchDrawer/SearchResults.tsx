'use client'

import React from 'react';
import { Product } from '@/app/types/search';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchResultsProps {
  products: Product[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ products }) => {
  return (
    <ScrollArea className="h-full pb-4">
      <div className="space-y-4 font-montserrat">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-flexsteel-primary text-base line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.subtitle}
                </p>
                
                {/* Status Badge */}
                {product.badge && (
                  <div className="mt-2">
                    <Badge 
                      className={`text-xs font-medium ${
                        product.badge.color === 'red' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                        product.badge.color === 'blue' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                        product.badge.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                        product.badge.color === 'purple' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
                        product.badge.color === 'orange' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                        product.badge.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {product.badge.text}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SearchResults;