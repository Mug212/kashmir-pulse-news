import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content?: string;
}

interface NewsCardProps {
  article: Article;
  category: string;
  onClick: () => void;
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

export const NewsCard = ({ article, category, onClick }: NewsCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-border/50"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Image */}
        {article.urlToImage && (
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${getCategoryColor(category)} text-xs font-medium`}>
                {category === 'general' ? 'Latest' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-news-headline font-headline font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-news-summary text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-news-metadata pt-2 border-t border-border/30">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{article.source.name}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{timeAgo}</span>
              </div>
            </div>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};