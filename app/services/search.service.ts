import { Product } from '@/app/types/search';
import { openAIService } from './openai.service';

export interface SearchConfig {
  useAI?: boolean;
  useSemanticSearch?: boolean;
  limit?: number;
  category?: string;
}

export class SearchService {
  private config: SearchConfig = {
    useAI: true,
    useSemanticSearch: false,
    limit: 10
  };

  constructor(private products: Product[] = []) {}

  setProducts(products: Product[]) {
    this.products = products;
  }

  setConfig(config: SearchConfig) {
    this.config = { ...this.config, ...config };
  }

  async search(query: string, customProducts?: Product[]): Promise<Product[]> {
    const productsToSearch = customProducts || this.products;
    
    if (!query.trim()) {
      return [];
    }

    // Use AI-powered search if enabled
    if (this.config.useAI) {
      if (this.config.useSemanticSearch) {
        return await openAIService.semanticSearch(query, productsToSearch);
      } else {
        return await openAIService.searchProducts(query, productsToSearch);
      }
    }

    // Fallback to basic search
    return this.basicSearch(query, productsToSearch);
  }

  private basicSearch(query: string, products: Product[]): Product[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    const scoredProducts = products.map(product => {
      let score = 0;
      const searchableText = `
        ${product.name} 
        ${product.subtitle} 
        ${product.category || ''} 
        ${product.description || ''} 
        ${product.badge?.text || ''}
        ${product.materials?.join(' ') || ''}
      `.toLowerCase();
      
      searchTerms.forEach(term => {
        // Exact match in name gets highest score
        if (product.name.toLowerCase().includes(term)) {
          score += 10;
        }
        // Match in subtitle
        if (product.subtitle.toLowerCase().includes(term)) {
          score += 5;
        }
        // Match in other fields
        if (searchableText.includes(term)) {
          score += 2;
        }
      });
      
      return { product, score };
    });

    // Filter products with score > 0 and sort by score
    return scoredProducts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.config.limit || 10)
      .map(item => item.product);
  }

  getSuggestions(query: string): string[] {
    const suggestions = new Set<string>();
    
    // Add category suggestions
    this.products.forEach(product => {
      if (product.category && product.category.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.category);
      }
    });

    // Add material suggestions
    this.products.forEach(product => {
      product.materials?.forEach(material => {
        if (material.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(material);
        }
      });
    });

    // Add common search terms
    const commonTerms = ['sofa', 'chair', 'table', 'recliner', 'sectional', 'loveseat', 'ottoman'];
    commonTerms.forEach(term => {
      if (term.includes(query.toLowerCase())) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }
}

export const searchService = new SearchService();