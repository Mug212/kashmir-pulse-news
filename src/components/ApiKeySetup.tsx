import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ExternalLink, Key, CheckCircle } from "lucide-react";
import { newsService } from "@/services/newsApi";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySetupProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ isOpen, onClose, onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Set the API key and test it
      newsService.setApiKey(apiKey.trim());
      
      // Try to fetch some articles to validate the key
      await newsService.getTopHeadlines('general');
      
      toast({
        title: "Success!",
        description: "API key configured successfully. You'll now receive real-time news updates.",
      });
      
      onApiKeySet();
      onClose();
    } catch (error) {
      // Remove the invalid key
      newsService.removeApiKey();
      
      toast({
        title: "Invalid API Key",
        description: "The API key you entered is not valid. Please check and try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveApiKey = () => {
    newsService.removeApiKey();
    setApiKey("");
    toast({
      title: "API Key Removed",
      description: "You're now using demo articles. Add an API key to get real-time news.",
    });
    onApiKeySet();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Configure NewsAPI</span>
          </DialogTitle>
          <DialogDescription>
            Set up your NewsAPI key to get real-time news updates instead of demo articles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
            {newsService.isApiKeyConfigured() ? (
              <>
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-foreground">API key is configured</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-warning" />
                <span className="text-sm text-foreground">Using demo articles</span>
              </>
            )}
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apikey">NewsAPI Key</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="Enter your NewsAPI key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isValidating}
            />
          </div>

          {/* How to get API key */}
          <div className="p-3 bg-accent/20 rounded-lg">
            <div className="text-sm font-medium mb-2">How to get a NewsAPI key:</div>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Visit NewsAPI.org</li>
              <li>2. Sign up for a free account</li>
              <li>3. Get your API key from the dashboard</li>
              <li>4. Paste it above and click Save</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              asChild
            >
              <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Get API Key
              </a>
            </Button>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              onClick={handleSaveApiKey}
              disabled={isValidating || !apiKey.trim()}
              className="flex-1"
            >
              {isValidating ? "Validating..." : "Save API Key"}
            </Button>
            
            {newsService.isApiKeyConfigured() && (
              <Button
                variant="outline"
                onClick={handleRemoveApiKey}
                className="flex-1"
              >
                Remove Key
              </Button>
            )}
          </div>

          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};