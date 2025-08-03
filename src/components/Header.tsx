import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const categories = [
  { id: 'general', label: 'Latest', color: 'primary' },
  { id: 'politics', label: 'Politics', color: 'politics' },
  { id: 'business', label: 'Business', color: 'business' },
  { id: 'sports', label: 'Sports', color: 'sports' },
  { id: 'technology', label: 'Technology', color: 'technology' },
  { id: 'culture', label: 'Culture', color: 'culture' },
];

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Header = ({ selectedCategory, onCategoryChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-header border-b border-border">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">KP</span>
            </div>
            <h1 className="text-xl font-bold text-news-headline font-headline">
              The Kashmir Pulse
            </h1>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => onCategoryChange(category.id)}
                className="text-sm font-medium"
              >
                {category.label}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start text-sm font-medium"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};