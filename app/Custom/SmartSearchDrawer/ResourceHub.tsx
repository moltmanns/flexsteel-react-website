'use client'

import React from 'react';
import { FileText, Download, Video, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResourceHubProps {
  isVisible: boolean;
}

interface BaseResource {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

interface FileResource extends BaseResource {
  size: string;
}

interface VideoResource extends BaseResource {
  duration: string;
}

interface LinkResource extends BaseResource {
  link: boolean;
}

type Resource = FileResource | VideoResource | LinkResource;

const ResourceHub: React.FC<ResourceHubProps> = ({ isVisible }) => {
  const resources: { category: string; items: Resource[] }[] = [
    {
      category: 'Care & Maintenance',
      items: [
        {
          title: 'Furniture Care Guide',
          description: 'Learn how to maintain your furniture',
          icon: <FileText className="w-5 h-5" />,
          type: 'PDF',
          size: '2.4 MB'
        },
        {
          title: 'Leather Care Instructions',
          description: 'Special care for leather furniture',
          icon: <FileText className="w-5 h-5" />,
          type: 'PDF',
          size: '1.8 MB'
        },
        {
          title: 'Fabric Protection Guide',
          description: 'Protect your fabric furniture',
          icon: <FileText className="w-5 h-5" />,
          type: 'PDF',
          size: '1.2 MB'
        }
      ]
    },
    {
      category: 'Assembly Instructions',
      items: [
        {
          title: 'Sectional Assembly Video',
          description: 'Step-by-step video guide',
          icon: <Video className="w-5 h-5" />,
          type: 'Video',
          duration: '12:34'
        },
        {
          title: 'Recliner Setup Guide',
          description: 'Power recliner installation',
          icon: <FileText className="w-5 h-5" />,
          type: 'PDF',
          size: '3.1 MB'
        }
      ]
    },
    {
      category: 'Warranties & Policies',
      items: [
        {
          title: 'Limited Lifetime Warranty',
          description: 'Warranty terms and conditions',
          icon: <BookOpen className="w-5 h-5" />,
          type: 'Document',
          link: true
        },
        {
          title: 'Return Policy',
          description: 'Our return and exchange policy',
          icon: <BookOpen className="w-5 h-5" />,
          type: 'Document',
          link: true
        }
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-flexsteel-primary mb-2">Resource Center</h2>
        <p className="text-sm text-gray-600">Find guides, manuals, and helpful resources</p>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="space-y-6 pr-4 pb-8"
        >
          {resources.map((section, sectionIndex) => (
            <motion.div key={sectionIndex} variants={item}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((resource, resourceIndex) => (
                  <motion.div
                    key={resourceIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-flexsteel-primary mt-0.5">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-flexsteel-primary text-sm">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {resource.type}
                          </span>
                          {'size' in resource && (
                            <span className="text-xs text-gray-500">
                              {resource.size}
                            </span>
                          )}
                          {'duration' in resource && (
                            <span className="text-xs text-gray-500">
                              {resource.duration}
                            </span>
                          )}
                          {'link' in resource ? (
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          ) : (
                            <Download className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default ResourceHub;