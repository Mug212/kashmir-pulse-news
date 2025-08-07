import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Menu, X } from "lucide-react";

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', label: 'Top Stories', icon: '🌍' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
];

export const Header = ({ selectedCategory, onCategoryChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold font-headline text-primary">Global News</h1>
                <p className="text-xs text-muted-foreground">Real-time worldwide updates</p>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className="flex items-center space-x-1 text-sm"
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 justify-start"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        )}

        {/* Live indicator */}
        <div className="flex items-center justify-center py-2">
          <Badge variant="outline" className="flex items-center space-x-1 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Global Updates</span>
          </Badge>
        </div>
      </div>
    </header>
  );
};