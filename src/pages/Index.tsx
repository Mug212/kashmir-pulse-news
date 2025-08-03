import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { NewsCard, Article } from "@/components/NewsCard";
import { ArticleModal } from "@/components/ArticleModal";
import { AdUnit } from "@/components/AdUnit";
import { newsService } from "@/services/newsApi";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: articles = [], isLoading, error, refetch } = useQuery({
    queryKey: ['news', selectedCategory],
    queryFn: () => newsService.getTopHeadlines(selectedCategory),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing news...",
      description: "Fetching the latest articles.",
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to load news</h2>
            <p className="text-muted-foreground mb-4">
              There was an error loading the latest news. Please try again.
            </p>
            <Button onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero section with refresh */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-news-headline font-headline">
              {selectedCategory === 'general' ? 'Latest News' : 
               `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
            </h2>
            <p className="text-news-metadata mt-1">
              Stay updated with the latest stories from Kashmir and beyond
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Top banner ad */}
        <div className="mb-8">
          <AdUnit slot="homepage-banner" className="max-w-4xl mx-auto" />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="bg-muted rounded h-6 mb-2"></div>
                <div className="bg-muted rounded h-4 mb-2"></div>
                <div className="bg-muted rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Articles grid */}
        {!isLoading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map((article, index) => (
              <div key={`${article.url}-${index}`}>
                <NewsCard
                  article={article}
                  category={selectedCategory}
                  onClick={() => handleArticleClick(article)}
                />
                {/* Insert ad after every 3rd article */}
                {(index + 1) % 3 === 0 && (
                  <div className="mt-6">
                    <AdUnit slot={`article-${index + 1}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No articles state */}
        {!isLoading && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-news-metadata text-lg mb-4">
              No articles found for this category
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try refreshing
            </Button>
          </div>
        )}

        {/* Bottom ad */}
        <div className="mt-8">
          <AdUnit slot="homepage-bottom" className="max-w-4xl mx-auto" />
        </div>
      </main>

      {/* Article modal */}
      <ArticleModal
        article={selectedArticle}
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
