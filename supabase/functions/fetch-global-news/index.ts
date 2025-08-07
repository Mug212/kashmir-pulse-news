import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { category = 'general', country = 'us' } = await req.json()
    
    // Get NewsAPI key from Supabase secrets
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Try to get the NewsAPI key from secrets
    const newsApiKey = Deno.env.get('NEWS_API_KEY')
    
    if (!newsApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'NewsAPI key not configured',
          articles: [] 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Define multiple news sources for better coverage
    const newsPromises = []

    // Global top headlines
    if (category === 'general') {
      // Mix of different countries for global perspective
      const countries = ['us', 'gb', 'in', 'au', 'ca', 'de', 'fr', 'jp', 'br']
      
      countries.forEach(countryCode => {
        newsPromises.push(
          fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&pageSize=10&apiKey=${newsApiKey}`)
            .then(res => res.json())
            .then(data => data.articles || [])
            .catch(() => [])
        )
      })
    } else {
      // Category-specific news from multiple countries
      const countries = ['us', 'gb', 'in', 'au', 'ca']
      
      countries.forEach(countryCode => {
        newsPromises.push(
          fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&pageSize=15&apiKey=${newsApiKey}`)
            .then(res => res.json())
            .then(data => data.articles || [])
            .catch(() => [])
        )
      })

      // Add keyword-based searches for more diverse content
      const keywords = {
        business: ['economy', 'finance', 'market', 'trade', 'investment', 'cryptocurrency'],
        sports: ['football', 'cricket', 'basketball', 'olympics', 'soccer', 'tennis'],
        technology: ['AI', 'innovation', 'startup', 'tech', 'digital', 'robotics'],
        science: ['research', 'discovery', 'climate', 'space', 'medicine', 'environment'],
        health: ['medicine', 'healthcare', 'pandemic', 'wellness', 'medical', 'virus'],
        entertainment: ['movie', 'music', 'celebrity', 'film', 'television', 'streaming']
      }

      const categoryKeywords = keywords[category as keyof typeof keywords] || []
      
      categoryKeywords.slice(0, 3).forEach(keyword => {
        newsPromises.push(
          fetch(`https://newsapi.org/v2/everything?q=${keyword}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`)
            .then(res => res.json())
            .then(data => data.articles || [])
            .catch(() => [])
        )
      })
    }

    // Execute all requests in parallel
    const allResults = await Promise.all(newsPromises)
    
    // Combine and deduplicate articles
    const allArticles: NewsArticle[] = []
    const seenUrls = new Set()

    allResults.forEach(articles => {
      articles.forEach((article: NewsArticle) => {
        if (
          article.title && 
          article.description && 
          article.url &&
          article.title !== '[Removed]' &&
          article.description !== '[Removed]' &&
          !seenUrls.has(article.url)
        ) {
          seenUrls.add(article.url)
          allArticles.push(article)
        }
      })
    })

    // Sort by publication date (newest first)
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    // Return top 50 articles for variety
    const finalArticles = allArticles.slice(0, 50)

    return new Response(
      JSON.stringify({ 
        articles: finalArticles,
        total: finalArticles.length 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error fetching news:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch news',
        articles: [] 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})