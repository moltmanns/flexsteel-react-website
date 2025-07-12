import { useState, useEffect, useCallback } from 'react';
import { Product, ChatMessage, AssistantMode } from '@/app/types/search';
import { searchService, SearchConfig } from '@/app/services/search.service';
import { openAIService } from '@/app/services/openai.service';

// Mock products - In production, these would come from your API/database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Henry Caramel Leather Power Reclining Loveseat',
    subtitle: 'with Power Headrests & Lumbar',
    image: '/assets/0520.webp',
    category: 'Living Room',
    badge: { text: 'Best Seller', color: 'red' },
    materials: ['Top Grain Leather', 'Hardwood Frame'],
    description: 'Experience ultimate comfort with the Henry Power Reclining Loveseat featuring premium caramel leather.'
  },
  {
    id: '2',
    name: 'Ludwig Contemporary Sofa',
    subtitle: 'Modern Design with Premium Comfort',
    image: '/assets/0520.webp',
    category: 'Living Room',
    badge: { text: 'New', color: 'blue' },
    materials: ['Performance Fabric', 'Kiln-Dried Hardwood'],
    description: 'The Ludwig sofa combines contemporary style with exceptional comfort for modern living spaces.'
  },
  {
    id: '3',
    name: 'Westside Sectional',
    subtitle: '5-Piece Modular Design',
    image: '/assets/0520.webp',
    category: 'Living Room',
    badge: { text: 'Limited Edition', color: 'orange' },
    materials: ['Microfiber', 'Engineered Wood Frame'],
    description: 'Create your perfect seating arrangement with the versatile Westside modular sectional.'
  },
  {
    id: '4',
    name: 'Everly Accent Chair',
    subtitle: 'Elegant Tufted Design',
    image: '/assets/0520.webp',
    category: 'Living Room',
    badge: { text: 'Popular', color: 'green' },
    materials: ['Velvet Upholstery', 'Metal Base'],
    description: 'Add a touch of elegance to any room with the Everly accent chair.'
  }
];

export const useSearchDrawer = (isOpen: boolean) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentMode, setCurrentMode] = useState<AssistantMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize search service with products
  useEffect(() => {
    searchService.setProducts(mockProducts);
  }, []);

  // Check if welcome should be shown when drawer opens
  useEffect(() => {
    if (isOpen) {
      const hasShownWelcome = sessionStorage.getItem('flexsteel-welcome-shown');
      setShowWelcome(!hasShownWelcome);
    }
  }, [isOpen]);

  // Clear state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setHasSearched(false);
      setSearchResults([]);
      setCurrentMode('search');
      setIsSearching(false);
      setIsTyping(false);
    }
  }, [isOpen]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    console.log('Searching for:', query);
    setSearchQuery(query);
    setHasSearched(true);
    setIsSearching(true);
    
    try {
      const results = await searchService.search(query, mockProducts);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to showing some products
      setSearchResults(mockProducts.slice(0, 4));
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleVoiceResult = useCallback((transcript: string) => {
    setSearchQuery(transcript);
    handleSearch(transcript);
  }, [handleSearch]);

  const handleModeChange = useCallback((mode: AssistantMode) => {
    setCurrentMode(mode);
    // Reset search state when switching modes
    if (mode !== 'search') {
      setHasSearched(false);
      setSearchResults([]);
      setSearchQuery('');
    }
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    sessionStorage.setItem('flexsteel-welcome-shown', 'true');
  }, []);

  const handleConfigChange = useCallback((config: SearchConfig) => {
    searchService.setConfig(config);
  }, []);

  const handleClearSearch = useCallback(() => {
    setHasSearched(false);
    setSearchResults([]);
    setSearchQuery('');
  }, []);

  // Chat functions
  const sendChatMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await openAIService.generateChatResponse(
        [...chatMessages, userMessage],
        mockProducts
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        products: response.recommendedProducts
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request. Please try again.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [chatMessages]);

  const clearChat = useCallback(() => {
    setChatMessages([]);
  }, []);

  return {
    // State
    showWelcome,
    currentMode,
    searchQuery,
    searchResults,
    isListening,
    hasSearched,
    isSearching,
    chatMessages,
    isTyping,
    
    // Functions
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
  };
};