import OpenAI from 'openai';
import { Product, ChatMessage } from '@/app/types/search';

export class OpenAIService {
  private openai: OpenAI | null = null;
  private apiKey: string | undefined;
  private model: string;
  private embeddingModel: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    this.model = process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-4-turbo-preview';
    this.embeddingModel = process.env.NEXT_PUBLIC_OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

    if (this.apiKey) {
      this.openai = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use API routes instead
      });
    }
  }

  async searchProducts(query: string, products: Product[]): Promise<Product[]> {
    if (!this.openai) {
      // Fallback to basic search if no API key
      return this.basicSearch(query, products);
    }

    try {
      const systemPrompt = `You are a furniture expert assistant for Flexsteel. 
      Given a user query, analyze it and return the most relevant product IDs from the provided product list.
      Consider factors like:
      - Product names and descriptions
      - Materials and badge status
      - Categories and styles
      - User intent (e.g., comfort, durability, specific rooms)
      
      IMPORTANT: You must return a valid JSON object with an "ids" array containing relevant product IDs.
      Example: {"ids": ["1", "3", "2"]}
      Always return valid JSON even if no products match - return {"ids": []} in that case.`;

      const userPrompt = `Query: "${query}"
      
      Products:
      ${products.map(p => `ID: ${p.id}, Name: ${p.name}, Category: ${p.category || 'N/A'}, Badge: ${p.badge?.text || 'Standard'}, Materials: ${p.materials?.join(', ') || 'N/A'}`).join('\n')}`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 500
      });

      let result;
      try {
        const content = response.choices[0].message.content;
        if (!content || content.trim() === '') {
          console.warn('Empty response from OpenAI, falling back to basic search');
          return this.basicSearch(query, products);
        }
        result = JSON.parse(content);
      } catch (parseError) {
        console.warn('Failed to parse OpenAI response, falling back to basic search:', parseError);
        return this.basicSearch(query, products);
      }
      
      const relevantIds = result.ids || result.productIds || [];
      
      // Return products in order of relevance
      const relevantProducts = relevantIds
        .map((id: string) => products.find(p => p.id === id))
        .filter(Boolean) as Product[];
      
      // If no AI results, fall back to basic search
      if (relevantProducts.length === 0) {
        console.log('No AI results found, using basic search fallback');
        return this.basicSearch(query, products);
      }
      
      // Add basic search results if we have fewer than 3 AI results
      if (relevantProducts.length < 3) {
        const basicMatches = this.basicSearch(query, products);
        basicMatches.forEach(product => {
          if (!relevantProducts.find((p: Product) => p.id === product.id)) {
            relevantProducts.push(product);
          }
        });
      }

      return relevantProducts.slice(0, process.env.NEXT_PUBLIC_SEARCH_RESULTS_LIMIT ? parseInt(process.env.NEXT_PUBLIC_SEARCH_RESULTS_LIMIT) : 10);
    } catch (error) {
      console.error('OpenAI search error:', error);
      return this.basicSearch(query, products);
    }
  }

  private basicSearch(query: string, products: Product[]): Product[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    return products.filter(product => {
      const searchableText = `
        ${product.name} 
        ${product.subtitle} 
        ${product.category || ''} 
        ${product.description || ''} 
        ${product.badge?.text || ''}
        ${product.materials?.join(' ') || ''}
      `.toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  async generateChatResponse(
    messages: ChatMessage[], 
    products: Product[]
  ): Promise<{ content: string; recommendedProducts?: Product[] }> {
    if (!this.openai) {
      return {
        content: "I'm currently unable to connect to the AI service. Please try again later or contact support.",
        recommendedProducts: []
      };
    }

    try {
      const systemPrompt = `You are Flexsteel AI, a knowledgeable and friendly furniture expert assistant. 
      You help customers find the perfect furniture for their needs.
      
      You have access to Flexsteel's product catalog and can:
      - Answer questions about furniture materials, styles, and features
      - Provide personalized recommendations based on customer needs
      - Explain the benefits of different furniture options
      - Help with room planning and furniture selection
      - Discuss care and maintenance tips
      
      Always be helpful, professional, and focus on understanding the customer's specific needs.
      When recommending products, explain why they're a good fit.
      
      If asked to recommend products, include product IDs in your response formatted as [PRODUCT_ID:xyz].`;

      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const productContext = `Available products:
${products.slice(0, 20).map(p => `ID: ${p.id}, Name: ${p.name}, Badge: ${p.badge?.text || 'Standard'}, Materials: ${p.materials?.join(', ') || 'Various materials'}`).join('\n')}`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: productContext },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: parseInt(process.env.NEXT_PUBLIC_CHAT_MAX_TOKENS || '1000')
      });

      const content = response.choices[0].message.content || '';
      
      // Extract product IDs from the response
      const productIdMatches = content.match(/\[PRODUCT_ID:([^\]]+)\]/g);
      const recommendedProducts: Product[] = [];
      
      if (productIdMatches) {
        productIdMatches.forEach(match => {
          const id = match.replace('[PRODUCT_ID:', '').replace(']', '');
          const product = products.find(p => p.id === id);
          if (product) {
            recommendedProducts.push(product);
          }
        });
      }

      // Clean up the content by removing product ID tags
      const cleanContent = content.replace(/\[PRODUCT_ID:[^\]]+\]/g, '');

      return {
        content: cleanContent,
        recommendedProducts
      };
    } catch (error) {
      console.error('OpenAI chat error:', error);
      return {
        content: "I'm having trouble processing your request right now. Please try again or contact our support team for assistance.",
        recommendedProducts: []
      };
    }
  }

  async generateEmbedding(text: string): Promise<number[] | null> {
    if (!this.openai) return null;

    try {
      const response = await this.openai.embeddings.create({
        model: this.embeddingModel,
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Embedding generation error:', error);
      return null;
    }
  }

  async semanticSearch(query: string, products: Product[]): Promise<Product[]> {
    if (!this.openai) {
      return this.basicSearch(query, products);
    }

    try {
      // Generate embedding for the query
      const queryEmbedding = await this.generateEmbedding(query);
      if (!queryEmbedding) {
        return this.basicSearch(query, products);
      }

      // Calculate similarity scores
      const productsWithScores = await Promise.all(
        products.map(async (product) => {
          const productText = `${product.name} ${product.subtitle} ${product.description || ''} ${product.badge?.text || ''}`;
          const productEmbedding = await this.generateEmbedding(productText);
          
          if (!productEmbedding) {
            return { product, score: 0 };
          }

          // Calculate cosine similarity
          const score = this.cosineSimilarity(queryEmbedding, productEmbedding);
          return { product, score };
        })
      );

      // Sort by similarity score and return top results
      return productsWithScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(item => item.product);
    } catch (error) {
      console.error('Semantic search error:', error);
      return this.basicSearch(query, products);
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// Export singleton instance
export const openAIService = new OpenAIService();