import axios from 'axios';
import { Article } from '@/components/NewsCard';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Extended demo articles with full content for better demonstration
const demoArticles: Article[] = [
  {
    title: "Kashmir Valley Witnesses Record Tourism Numbers This Season",
    description: "The beautiful valley of Kashmir has seen unprecedented tourist arrivals this year, with visitors from around the world flocking to experience its natural beauty and cultural heritage.",
    url: "https://kashmir-pulse.com/tourism-record",
    urlToImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Tourism Board" },
    content: `Kashmir Valley has reported a remarkable surge in tourism this year, with visitor numbers reaching an all-time high of 1.8 million tourists in the current season. This represents a 35% increase compared to the previous year, marking a significant milestone for the region's tourism industry.

The surge has been attributed to several factors, including improved infrastructure, enhanced security measures, and aggressive digital marketing campaigns that have showcased Kashmir's pristine beauty to a global audience. Popular destinations like Gulmarg, Pahalgam, and Sonamarg have seen particularly high footfall.

"We are overwhelmed by the response from tourists, both domestic and international," said Director of Tourism, Kashmir. "The feedback has been exceptional, with visitors praising our hospitality, natural beauty, and cultural richness."

The tourism boom has had a positive ripple effect on the local economy, with hotels, restaurants, handicraft shops, and transportation services reporting substantial increases in revenue. Local artisans selling traditional Kashmiri products like carpets, shawls, and saffron have particularly benefited from this influx.

Adventure tourism has also gained momentum, with activities like skiing in Gulmarg, trekking in various mountain ranges, and river rafting in Lidder becoming increasingly popular among visitors. The government has been working to develop more adventure sports facilities to cater to this growing demand.

However, the increased tourist flow has also posed challenges, including pressure on infrastructure and the need for sustainable tourism practices. Authorities are working on expanding accommodation facilities and improving waste management systems to handle the growing numbers while preserving the region's environmental integrity.`
  },
  {
    title: "Traditional Kashmiri Crafts Find Global Market Through Digital Platforms",
    description: "Local artisans are leveraging e-commerce platforms to sell their traditional handicrafts, carpets, and shawls to customers worldwide, boosting the regional economy.",
    url: "https://kashmir-pulse.com/digital-crafts",
    urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Commerce Today" },
    content: `The digital revolution has opened unprecedented opportunities for Kashmir's traditional artisans, with hundreds of craftspeople now selling their products directly to international customers through e-commerce platforms. This shift has resulted in a 300% increase in overseas sales of Kashmiri handicrafts over the past two years.

Master weaver Mohammad Yousuf, who has been creating traditional Kashmiri carpets for over three decades, recently started selling through online platforms. "I never imagined my carpets would reach customers in America and Europe so easily," he says. "Digital platforms have eliminated middlemen and allowed us to get fair prices for our work."

The Government of Jammu and Kashmir has launched several initiatives to support this digital transformation, including training programs on e-commerce, digital photography workshops for product showcasing, and assistance with online store setup. The 'Digital Kashmir' initiative has already trained over 5,000 artisans in online selling techniques.

Popular products finding global markets include:
- Hand-knotted Kashmiri carpets
- Pashmina and Cashmere shawls
- Papier-mâché artifacts
- Traditional Kashmiri jewelry
- Saffron and other spices
- Wooden handicrafts

The success stories are numerous. Fatima Begum, a paper mache artist from Srinagar, has built a customer base spanning 15 countries through her online store. Her monthly income has increased from ₹15,000 to ₹75,000 within just one year of going digital.

E-commerce giants have also recognized this potential, with several platforms launching dedicated 'Kashmir Collections' to showcase authentic regional products. This has not only boosted sales but also helped in preserving traditional crafts by making them economically viable for younger generations.

The ripple effects are visible throughout the region, with young Kashmiris now showing renewed interest in learning traditional crafts, seeing them as viable career options in the digital age.`
  },
  {
    title: "Local Cricket Team Qualifies for National Championship",
    description: "The Kashmir Warriors cricket team has successfully qualified for the national championship after a thrilling victory in the regional finals, bringing pride to the valley.",
    url: "https://kashmir-pulse.com/cricket-victory",
    urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Sports Network" },
    content: `In a nail-biting finish that kept spectators on the edge of their seats, the Kashmir Warriors cricket team secured their place in the National Championship with a thrilling 5-wicket victory over Punjab Lions in the regional finals yesterday. The match, held at the Sher-i-Kashmir Stadium in Srinagar, saw an attendance of over 25,000 passionate fans.

Chasing a target of 287 runs, Kashmir Warriors found themselves in trouble at 156/5 in the 35th over. However, a brilliant 89-run partnership between captain Aamir Shah (78 not out) and all-rounder Tariq Mir (45) turned the match in their favor. Shah's innings, which included six boundaries and two sixes, was particularly crucial in the final overs.

"This is a dream come true for all of us," said captain Aamir Shah after the victory. "We've worked incredibly hard for this moment, and to qualify for nationals while playing at our home ground makes it even more special. The support from our fans was phenomenal."

The Kashmir Warriors' journey to the nationals has been remarkable. Starting the regional tournament as underdogs, they defeated strong teams from Himachal Pradesh, Punjab, and Haryana to reach this milestone. Their consistent performance throughout the tournament, with both bat and ball, has impressed cricket experts across the country.

Key performances that defined their campaign:
- Fast bowler Wasim Khan emerged as the tournament's leading wicket-taker with 23 wickets
- Opening batsman Rohit Sharma (local talent) scored over 450 runs in the tournament
- Wicket-keeper Sameer Ahmad's behind-the-stumps performance was exemplary

The team's success has generated massive enthusiasm for cricket in the valley. Local cricket academies report a 40% increase in enrollments since the Warriors began their successful campaign. The J&K Cricket Association has announced plans to develop more cricket infrastructure to nurture this growing interest.

The Warriors will now compete against 15 other teams in the National Championship, scheduled to begin next month in Delhi. The team management is optimistic about their chances, especially given their recent form and team spirit.

"We're not just playing for Kashmir anymore; we're playing for the entire nation to see what talent this beautiful valley possesses," added coach Rajesh Kumar, who has been instrumental in developing the team's strategy and team cohesion.`
  },
  {
    title: "Kashmir's Tech Hub Initiative Attracts Major Investment",
    description: "The government's initiative to establish Kashmir as a technology hub has attracted significant investment from leading tech companies, promising job creation and economic growth.",
    url: "https://kashmir-pulse.com/tech-investment",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Tech Times" },
    content: `Kashmir's ambitious plan to transform into a major technology hub has received a significant boost with the announcement of a ₹2,500 crore investment package from leading national and international tech companies. This landmark development is expected to create over 15,000 direct and indirect jobs in the region over the next five years.

The investment package includes commitments from major players including Infosys, TCS, Wipro, and several international firms who have agreed to establish development centers in the newly planned Srinagar Technology Park. The 500-acre facility, currently under construction, will feature state-of-the-art infrastructure including high-speed internet connectivity, modern office spaces, and residential facilities for employees.

"This is a game-changer for Kashmir's economy," announced the Chief Minister during a press conference. "We're not just creating jobs; we're building an ecosystem that will establish Kashmir as India's next major tech destination. Our youth will no longer need to migrate to other states for quality technology careers."

The initiative, branded as 'Digital Kashmir 2030', encompasses several key components:

Infrastructure Development:
- High-speed fiber optic network covering all major cities
- 24/7 power supply with backup systems
- Modern transportation links
- World-class educational institutions

Skill Development Programs:
- Partnership with leading universities for specialized tech courses
- Coding bootcamps and certification programs
- Mentorship programs with industry experts
- Entrepreneurship incubation centers

The response from local youth has been overwhelming. Engineering colleges across the valley report a surge in applications for computer science and related fields. The University of Kashmir has announced plans to introduce new courses in artificial intelligence, cybersecurity, and blockchain technology.

Several startups have already begun operations in the region. TechFlow Solutions, a local startup developing agricultural technology, recently secured ₹50 lakhs in seed funding. "The supportive ecosystem here is incredible," says founder Mehraj Ahmad. "We have access to talent, government support, and now, major investors are taking notice."

International companies have also expressed strong interest. A delegation from Silicon Valley visited Kashmir last month to explore investment opportunities, particularly in areas of clean technology and sustainable development solutions.

The government has also announced tax incentives for companies setting up operations in Kashmir, including a five-year tax holiday for new tech companies and subsidized land rates for the first 100 companies to establish operations.

Early indicators suggest the initiative is already bearing fruit, with the region's IT exports increasing by 150% in the past year alone.`
  },
  {
    title: "Annual Saffron Festival Celebrates Kashmir's Golden Harvest",
    description: "The valley's famous saffron farmers celebrate another successful harvest season with the annual Saffron Festival, showcasing the world's finest quality saffron.",
    url: "https://kashmir-pulse.com/saffron-festival",
    urlToImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Agriculture Today" },
    content: `The picturesque town of Pampore came alive with vibrant colors and aromatic fragrances as the annual Kashmir Saffron Festival commenced yesterday, celebrating what farmers are calling one of the best harvests in recent years. The three-day festival, now in its 15th year, showcases Kashmir's world-renowned saffron while promoting sustainable farming practices and cultural heritage.

This year's harvest has been particularly remarkable, with farmers reporting a 25% increase in yield compared to last year. The improved harvest is attributed to favorable weather conditions, better irrigation facilities, and the adoption of modern farming techniques while maintaining traditional cultivation methods that have been passed down through generations.

"The quality of this year's saffron is exceptional," explains Dr. Shabir Ahmad, a agricultural scientist and saffron expert. "The stigmas are longer, the color is more intense, and the aroma is incredibly rich. International buyers are already placing advance orders for next year's harvest."

The festival features several highlights:

Cultural Programs:
- Traditional Kashmiri folk performances
- Poetry sessions celebrating saffron in local literature
- Art exhibitions showcasing saffron-themed works
- Cooking demonstrations using saffron in traditional recipes

Educational Initiatives:
- Workshops on saffron cultivation techniques
- Sessions on quality assessment and grading
- Presentations on international market trends
- Organic farming methodology demonstrations

Economic Impact:
Kashmir saffron, known scientifically as Crocus sativus, continues to be one of the world's most expensive spices, often called "red gold." The current market price ranges from ₹2,50,000 to ₹3,00,000 per kilogram for premium grade saffron, making it more valuable than gold by weight.

The festival has attracted buyers from across the globe, including representatives from Europe, Middle East, and North America. Several international chefs have also participated, exploring how Kashmir saffron can elevate their culinary creations.

Young entrepreneur Farah Jan, who started her own saffron processing and packaging business two years ago, has seen remarkable growth. "The festival provides us with direct access to customers and helps us build trust in our brand," she says. "We've received orders worth ₹15 lakhs just in the first day of the festival."

The government has announced several initiatives to support saffron farmers, including:
- Subsidized drip irrigation systems
- Quality certification programs
- Direct marketing platforms
- Crop insurance schemes

Research and development efforts are also underway to develop saffron-based products like cosmetics, pharmaceuticals, and health supplements, which could significantly increase the value addition for local farmers.

The festival concludes tomorrow with a grand cultural night featuring renowned Kashmiri artists and a special saffron auction where premium lots will be sold to the highest bidders.`
  },
  {
    title: "Education Reform Brings Modern Learning to Remote Villages",
    description: "A new education initiative is bringing modern learning tools and internet connectivity to remote villages across Kashmir, improving educational opportunities for children.",
    url: "https://kashmir-pulse.com/education-reform",
    urlToImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Education Herald" },
    content: `A revolutionary education reform program launched by the Jammu and Kashmir government is transforming learning experiences in the region's most remote villages, bringing modern educational tools and high-speed internet connectivity to areas that were previously cut off from digital learning opportunities.

The 'Digital Classroom Initiative' has successfully connected 150 remote schools across the valley to high-speed internet, enabling students in villages like Gurez, Macchil, and Tangdar to access the same quality of education as their urban counterparts. The program, implemented over the past 18 months, has already shown remarkable results in student engagement and academic performance.

"For the first time, our children can see and interact with the outside world," says Gulshan Begum, a teacher at Government Primary School in Tulail, a remote village in Gurez valley. "They're attending virtual classes with students from Delhi and Mumbai, participating in online competitions, and accessing educational content that we could never have imagined providing here."

The initiative encompasses several key components:

Infrastructure Development:
- High-speed fiber optic internet connections to 150 remote schools
- Solar-powered systems ensuring uninterrupted power supply
- Modern computer labs with 20-30 systems per school
- Interactive smart boards in every classroom
- Video conferencing facilities for virtual learning

Digital Content and Programs:
- Access to national digital education platforms
- Multilingual educational content in Urdu, Hindi, and English
- Virtual reality experiences for science and history lessons
- Online libraries with thousands of books and resources
- Skill development courses for older students

Teacher Training:
Over 500 teachers have undergone intensive training programs to effectively use digital tools and modern teaching methodologies. The training includes both technical skills and innovative pedagogical approaches that leverage technology to enhance learning outcomes.

The impact has been profound. Student enrollment in these remote areas has increased by 30%, and more importantly, dropout rates have decreased significantly. Standardized test scores have improved by an average of 40% in participating schools.

Twelve-year-old Aisha from Macchil village exemplifies this transformation. "I can now attend science experiments virtually, take part in inter-school quizzes with students from other states, and even practice English conversation with teachers from different cities," she says excitedly.

The program has also introduced innovative solutions for challenges specific to remote areas:
- Satellite-based internet connectivity for extremely remote locations
- Portable solar charging stations for devices
- Offline content downloading for areas with intermittent connectivity
- Community learning centers for after-school activities

Parents have been equally enthusiastic about the changes. "Our children are no longer disadvantaged because of where they live," says Mohammad Amin, a farmer from Gurez. "They have the same opportunities as children in Srinagar or Delhi."

The success of the pilot program has prompted the government to expand the initiative to cover all 1,200 government schools in remote areas across Jammu and Kashmir by 2025. Additionally, plans are underway to introduce coding and robotics classes, preparing students for future technology careers.

International organizations have taken notice of this success story, with UNESCO expressing interest in documenting the program as a model for similar initiatives in other mountainous regions worldwide.`
  },
  // Additional articles for more content
  {
    title: "Sustainable Agriculture Practices Transform Kashmir's Farming Landscape",
    description: "Farmers across Kashmir are adopting organic and sustainable farming methods, leading to increased crop yields and better environmental outcomes.",
    url: "https://kashmir-pulse.com/sustainable-farming",
    urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Agriculture Weekly" },
    content: `Kashmir's agricultural sector is undergoing a green revolution as farmers increasingly adopt sustainable and organic farming practices. This shift towards environmentally friendly agriculture has not only improved crop yields but has also opened new market opportunities for Kashmiri produce in national and international markets.

The transformation began three years ago when the government launched the 'Kashmir Green Farming Initiative,' providing subsidies and training to farmers willing to transition to organic methods. Today, over 5,000 farmers across the valley have embraced these practices, covering approximately 15,000 hectares of farmland.

The results have been impressive. Organic apple orchards are yielding 20% higher returns compared to conventional farming, while vegetable farmers report improved soil health and reduced input costs. The premium prices for organic produce have also contributed to increased farmer incomes.`
  },
  {
    title: "Kashmir's Winter Sports Facilities Get Major Upgrade",
    description: "Gulmarg and other winter sports destinations receive state-of-the-art facilities and equipment, positioning Kashmir as a world-class winter sports destination.",
    url: "https://kashmir-pulse.com/winter-sports-upgrade",
    urlToImage: "https://images.unsplash.com/photo-1551524164-6cf2ac12f31a?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Sports Authority" },
    content: `Gulmarg, Kashmir's premier winter sports destination, has received a massive infrastructure boost with the installation of new ski lifts, snow-making machines, and modern training facilities. The ₹150 crore upgrade project aims to position Kashmir as a world-class winter sports destination and attract international competitions.

The improvements include new gondola systems, advanced snow grooming equipment, and professional training centers that meet international standards. These facilities are expected to significantly boost winter tourism and provide opportunities for local youth to pursue winter sports professionally.`
  },
  {
    title: "Traditional Kashmiri Music Gains International Recognition",
    description: "Young Kashmiri musicians are blending traditional Sufiyana music with contemporary styles, gaining recognition on global platforms and preserving cultural heritage.",
    url: "https://kashmir-pulse.com/traditional-music",
    urlToImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Cultural Society" },
    content: `Kashmir's rich musical heritage is experiencing a renaissance as young artists successfully blend traditional Sufiyana music with contemporary sounds, earning recognition on international platforms. This cultural revival is not only preserving ancient musical traditions but also creating new opportunities for local artists.

The movement has gained momentum through social media platforms where Kashmiri musicians showcase their fusion compositions, attracting millions of views and international collaborations. Several artists have already signed contracts with major music labels and are planning international tours.`
  },
  {
    title: "Healthcare Infrastructure Development Accelerates Across Kashmir",
    description: "New hospitals and medical facilities are being established across Kashmir, improving healthcare access for residents in remote areas and upgrading medical services.",
    url: "https://kashmir-pulse.com/healthcare-development",
    urlToImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=400&fit=crop",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { name: "Kashmir Health Department" },
    content: `Kashmir's healthcare infrastructure is undergoing significant expansion with the establishment of new hospitals, specialty clinics, and telemedicine facilities across the region. The comprehensive healthcare development program aims to provide quality medical services to every resident, including those in the most remote areas.

The latest additions include three new district hospitals, 50 primary health centers, and a network of telemedicine facilities that connect remote areas with specialist doctors in major cities. These developments are expected to significantly improve health outcomes and reduce the need for patients to travel long distances for medical care.`
  }
];

export class NewsService {
  private apiKey: string = '102f48ef4f704f3ea4f636cf92d58191';

  constructor() {
    // API key is now hardcoded
  }

  async getTopHeadlines(category: string = 'general'): Promise<Article[]> {
    // If API key is available, try to fetch real news
    if (this.apiKey) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
          params: {
            apiKey: this.apiKey,
            country: 'in', // India
            category: category === 'general' ? undefined : category,
            pageSize: 50, // Increased from 20 to get more articles
            sortBy: 'publishedAt'
          }
        });

        if (response.data.articles && response.data.articles.length > 0) {
          return response.data.articles.filter((article: Article) => 
            article.title && 
            article.description && 
            article.title !== '[Removed]' &&
            article.description !== '[Removed]'
          );
        }
      } catch (error: any) {
        console.error('Error fetching news:', error);
        if (error.response?.status === 401) {
          console.error('Invalid API key. Using demo articles.');
          localStorage.removeItem('newsapi_key');
          this.apiKey = null;
        }
      }
    }

    // Fallback to demo articles with more content
    return this.getDemoArticles(category);
  }

  async searchNews(query: string): Promise<Article[]> {
    // If API key is available, search real news
    if (this.apiKey) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
          params: {
            apiKey: this.apiKey,
            q: `${query} AND (India OR Kashmir)`, // Enhanced search with location context
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 30,
            from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Last 7 days
          }
        });

        if (response.data.articles && response.data.articles.length > 0) {
          return response.data.articles.filter((article: Article) => 
            article.title && 
            article.description && 
            article.title !== '[Removed]' &&
            article.description !== '[Removed]'
          );
        }
      } catch (error) {
        console.error('Error searching news:', error);
      }
    }

    // Fallback to demo articles search
    return demoArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getDemoArticles(category: string): Article[] {
    // Return all demo articles for general category
    if (category === 'general') {
      return demoArticles;
    }
    
    // Filter articles by category keywords for more relevant results
    const categoryKeywords = {
      business: ['investment', 'economic', 'commerce', 'business', 'trade', 'market'],
      sports: ['cricket', 'sports', 'team', 'championship', 'winter sports', 'skiing'],
      technology: ['tech', 'digital', 'technology', 'innovation', 'internet'],
      culture: ['saffron', 'festival', 'traditional', 'music', 'cultural', 'heritage'],
      politics: ['government', 'education', 'reform', 'initiative', 'healthcare', 'development']
    };

    const keywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
    
    const filtered = demoArticles.filter(article => 
      keywords.some(keyword => 
        article.title.toLowerCase().includes(keyword) || 
        article.description.toLowerCase().includes(keyword)
      )
    );

    // If we have filtered results, return them, otherwise return a few general articles
    return filtered.length > 0 ? filtered : demoArticles.slice(0, 4);
  }

  // Method to set API key for real-time updates
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Method to remove API key
  removeApiKey() {
    // Keep the configured API key
  }

  // Method to check if API key is configured
  isApiKeyConfigured(): boolean {
    return true;
  }
}

export const newsService = new NewsService();