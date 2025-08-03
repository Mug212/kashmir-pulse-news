import axios from 'axios';
import { Article } from '@/components/NewsCard';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Demo articles for when API key is not configured
const demoArticles: Article[] = [
  {
    title: "Kashmir Valley Witnesses Record Tourism Numbers This Season",
    description: "The beautiful valley of Kashmir has seen unprecedented tourist arrivals this year, with visitors from around the world flocking to experience its natural beauty and cultural heritage.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Tourism Board" },
    content: "Full article content would appear here..."
  },
  {
    title: "Traditional Kashmiri Crafts Find Global Market Through Digital Platforms",
    description: "Local artisans are leveraging e-commerce platforms to sell their traditional handicrafts, carpets, and shawls to customers worldwide, boosting the regional economy.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Commerce Today" },
    content: "Full article content would appear here..."
  },
  {
    title: "Local Cricket Team Qualifies for National Championship",
    description: "The Kashmir Warriors cricket team has successfully qualified for the national championship after a thrilling victory in the regional finals, bringing pride to the valley.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Sports Network" },
    content: "Full article content would appear here..."
  },
  {
    title: "Kashmir's Tech Hub Initiative Attracts Major Investment",
    description: "The government's initiative to establish Kashmir as a technology hub has attracted significant investment from leading tech companies, promising job creation and economic growth.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Tech Times" },
    content: "Full article content would appear here..."
  },
  {
    title: "Annual Saffron Festival Celebrates Kashmir's Golden Harvest",
    description: "The valley's famous saffron farmers celebrate another successful harvest season with the annual Saffron Festival, showcasing the world's finest quality saffron.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Agriculture Today" },
    content: "Full article content would appear here..."
  },
  {
    title: "Education Reform Brings Modern Learning to Remote Villages",
    description: "A new education initiative is bringing modern learning tools and internet connectivity to remote villages across Kashmir, improving educational opportunities for children.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Education Herald" },
    content: "Full article content would appear here..."
  }
];

export class NewsService {
  private apiKey: string | null = null;

  constructor() {
    // In production, this would come from environment variables
    // For now, we'll use demo data
    this.apiKey = null;
  }

  async getTopHeadlines(category: string = 'general'): Promise<Article[]> {
    // If no API key, return demo articles
    if (!this.apiKey) {
      return this.getDemoArticles(category);
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
        params: {
          apiKey: this.apiKey,
          country: 'in', // India
          category: category === 'general' ? undefined : category,
          pageSize: 20
        }
      });

      return response.data.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getDemoArticles(category);
    }
  }

  async searchNews(query: string): Promise<Article[]> {
    // If no API key, return filtered demo articles
    if (!this.apiKey) {
      return demoArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          apiKey: this.apiKey,
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20
        }
      });

      return response.data.articles || [];
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }

  private getDemoArticles(category: string): Article[] {
    // Filter demo articles based on category if needed
    if (category === 'general') {
      return demoArticles;
    }
    
    // For other categories, return a subset relevant to that category
    const relevantArticles = {
      business: [demoArticles[1], demoArticles[3]], // Traditional crafts, Tech hub
      sports: [demoArticles[2]], // Cricket team
      technology: [demoArticles[3]], // Tech hub
      culture: [demoArticles[4], demoArticles[5]], // Saffron festival, Education
      politics: [demoArticles[5]] // Education reform
    };

    return relevantArticles[category as keyof typeof relevantArticles] || demoArticles.slice(0, 3);
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const newsService = new NewsService();