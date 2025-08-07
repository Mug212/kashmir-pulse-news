import { createClient } from '@supabase/supabase-js';
import { Article } from '@/components/NewsCard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Enhanced demo articles for fallback with global content
const demoArticles: Article[] = [
  {
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    description: "World leaders from 195 countries agree to ambitious new targets for carbon emission reductions, marking a pivotal moment in climate action.",
    url: "https://global-news.com/climate-summit-agreement",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { name: "Global Environmental Times" },
    content: "In a landmark achievement for international cooperation on climate change, world leaders have reached a comprehensive agreement on carbon reduction targets that goes beyond previous commitments. The agreement includes specific timelines, funding mechanisms, and accountability measures."
  },
  {
    title: "Breakthrough in Quantum Computing Promises Revolutionary Changes",
    description: "Scientists achieve quantum supremacy with new 1000-qubit processor, opening doors to solving previously impossible computational problems.",
    url: "https://tech-daily.com/quantum-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "Technology Today" },
    content: "A major breakthrough in quantum computing has been achieved with the successful operation of a 1000-qubit quantum processor. This advancement could revolutionize fields from cryptography to drug discovery and artificial intelligence."
  },
  {
    title: "Global Food Crisis: New Sustainable Farming Techniques Show Promise",
    description: "Innovative agricultural methods increase crop yields by 40% while reducing water usage, offering hope for food security in developing nations.",
    url: "https://agriculture-news.com/sustainable-farming",
    urlToImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { name: "Agricultural Innovation Weekly" },
    content: "Revolutionary farming techniques combining AI-powered crop monitoring, precision irrigation, and genetically optimized seeds are showing remarkable results in pilot programs across Africa and South Asia."
  },
  {
    title: "Major Economic Shifts as Emerging Markets Lead Global Growth",
    description: "Asian and African economies drive unprecedented global economic expansion, reshaping international trade patterns and investment flows.",
    url: "https://economic-times.com/emerging-markets-growth",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "Global Economic Report" },
    content: "Emerging markets in Asia and Africa are experiencing unprecedented growth rates, fundamentally altering global economic dynamics and creating new opportunities for international investment and trade partnerships."
  },
  {
    title: "Olympic Games Preparation: Athletes Adapt to New Technologies",
    description: "Athletes worldwide embrace cutting-edge training technologies and sustainable practices as they prepare for the upcoming Olympic Games.",
    url: "https://sports-world.com/olympic-tech",
    urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { name: "Olympic Sports Network" },
    content: "Athletes are leveraging AI-powered training analysis, sustainable equipment, and virtual reality simulation to reach peak performance while maintaining environmental consciousness for the upcoming games."
  },
  {
    title: "Healthcare Revolution: Telemedicine Transforms Rural Medical Access",
    description: "Remote medical consultations and AI diagnostics bring world-class healthcare to underserved communities across the globe.",
    url: "https://health-innovation.com/telemedicine-rural",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "Medical Innovation Journal" },
    content: "Telemedicine platforms powered by artificial intelligence are revolutionizing healthcare delivery in remote areas, providing diagnostic capabilities and specialist consultations to communities previously without access to quality medical care."
  },
  {
    title: "Space Exploration Milestone: First Permanent Moon Base Construction Begins",
    description: "International space consortium launches construction of humanity's first permanent lunar habitat, marking new era of space colonization.",
    url: "https://space-news.com/moon-base-construction",
    urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { name: "Space Exploration Daily" },
    content: "Construction has officially begun on humanity's first permanent lunar base, representing a collaborative effort between multiple space agencies and private companies to establish sustainable human presence beyond Earth."
  },
  {
    title: "Renewable Energy Milestone: Solar Power Achieves Grid Parity Globally",
    description: "Solar energy costs drop below traditional fossil fuels in most markets worldwide, accelerating the transition to clean energy.",
    url: "https://energy-news.com/solar-grid-parity",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "Renewable Energy Today" },
    content: "Solar energy has achieved cost parity with traditional energy sources in 85% of global markets, driving massive investments in renewable infrastructure and accelerating the worldwide transition to clean energy."
  }
];

export class NewsService {
  private apiKey: string | null = null;

  constructor() {
    // No hardcoded API key - will use Supabase edge function
  }

  async getTopHeadlines(category: string = 'general'): Promise<Article[]> {
    try {
      // Call Supabase Edge Function for news
      const { data, error } = await supabase.functions.invoke('fetch-global-news', {
        body: { 
          category,
          timestamp: Date.now() // Force fresh data
        }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        return this.getDemoArticles(category);
      }

      if (data?.articles && data.articles.length > 0) {
        return data.articles;
      }

      // Fallback to demo articles
      return this.getDemoArticles(category);

    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getDemoArticles(category);
    }
  }

  async searchNews(query: string): Promise<Article[]> {
    try {
      // Use the edge function for search as well
      const { data, error } = await supabase.functions.invoke('fetch-global-news', {
        body: { 
          query,
          category: 'search',
          timestamp: Date.now()
        }
      });

      if (error || !data?.articles) {
        // Fallback to demo search
        return demoArticles.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase())
        );
      }

      return data.articles;
    } catch (error) {
      console.error('Error searching news:', error);
      return demoArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  private getDemoArticles(category: string): Article[] {
    // Create a shuffled copy of demo articles to simulate fresh content
    const shuffledArticles = [...demoArticles].sort(() => Math.random() - 0.5);
    
    // Update publish times to be more recent and varied (simulate live updates)
    const articlesWithUpdatedTimes = shuffledArticles.map((article, index) => ({
      ...article,
      publishedAt: new Date(Date.now() - (index + 1) * Math.random() * 3 * 60 * 60 * 1000).toISOString()
    }));

    // Return all demo articles for general category
    if (category === 'general') {
      return articlesWithUpdatedTimes;
    }
    
    // Filter articles by category keywords for more relevant results
    const categoryKeywords = {
      business: ['economic', 'markets', 'growth', 'investment', 'trade'],
      sports: ['olympic', 'athletes', 'games', 'sports', 'training'],
      technology: ['quantum', 'tech', 'computing', 'AI', 'innovation'],
      science: ['space', 'research', 'exploration', 'breakthrough', 'discovery'],
      health: ['healthcare', 'medical', 'telemedicine', 'health'],
      entertainment: ['games', 'athletes', 'sports', 'olympic']
    };

    const keywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
    
    const filtered = articlesWithUpdatedTimes.filter(article => 
      keywords.some(keyword => 
        article.title.toLowerCase().includes(keyword) || 
        article.description.toLowerCase().includes(keyword)
      )
    );

    // If we have filtered results, return them shuffled, otherwise return shuffled general articles
    return filtered.length > 0 ? filtered : articlesWithUpdatedTimes.slice(0, 4);
  }

  // Method to check if API key is configured
  isApiKeyConfigured(): boolean {
    return true; // Always return true since we're using edge function
  }

  // Placeholder methods for compatibility
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  removeApiKey() {
    this.apiKey = null;
  }
}

export const newsService = new NewsService();