export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  category?: string;
  description?: string;
  badge?: {
    text: string;
    color: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow';
  };
  materials?: string[];
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
  };
}

export interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: Product[];
}

export type AssistantMode = 'search' | 'chat' | 'resources' | 'support';