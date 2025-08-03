import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Article } from "./NewsCard";
import { AdUnit } from "./AdUnit";

interface ArticleModalProps {
  article: Article | null;
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    politics: 'bg-politics text-white',
    business: 'bg-business text-white',
    sports: 'bg-sports text-white',
    technology: 'bg-technology text-white',
    culture: 'bg-culture text-white',
    general: 'bg-primary text-primary-foreground',
  };
  return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
};

export const ArticleModal = ({ article, category, isOpen, onClose }: ArticleModalProps) => {
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={`${getCategoryColor(category)} text-xs font-medium`}>
                  {category === 'general' ? 'Latest' : category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
                <div className="flex items-center space-x-1 text-news-metadata text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{timeAgo}</span>
                </div>
              </div>
              <DialogTitle className="text-2xl font-headline font-bold text-news-headline leading-tight pr-8">
                {article.title}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="shrink-0 ml-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Article Image */}
          {article.urlToImage && (
            <div className="mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Source and metadata */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
            <div className="text-news-metadata">
              <span className="font-medium text-foreground">Source: </span>
              {article.source.name}
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Original
              </a>
            </Button>
          </div>

          {/* Article Description */}
          <div className="prose prose-gray max-w-none mb-8">
            <p className="text-lg text-news-summary leading-relaxed">
              {article.description}
            </p>
            
            {article.content && (
              <div className="mt-6">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {article.content.replace('[+', '').replace(/\+\d+ chars\].*$/, '')}
                </p>
              </div>
            )}
          </div>

          {/* In-article Ad */}
          <div className="my-8">
            <AdUnit slot="article-content" className="max-w-2xl mx-auto" />
          </div>

          {/* Call to action */}
          <div className="text-center pt-6 border-t border-border/30">
            <p className="text-news-metadata mb-4">
              Want to read the full article?
            </p>
            <Button asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Continue Reading on {article.source.name}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};