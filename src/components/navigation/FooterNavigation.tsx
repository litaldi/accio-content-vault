
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Sparkles, 
  HelpCircle,
  Home,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const FooterNavigation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickSave = () => {
    if (user) {
      navigate('/save');
      toast({
        title: "Quick Save",
        description: "Ready to capture your knowledge!",
      });
    } else {
      navigate('/register');
      toast({
        title: "Sign up to save content",
        description: "Create your account to start capturing knowledge.",
      });
    }
  };

  const handleQuickSearch = () => {
    if (user) {
      navigate('/search');
    } else {
      navigate('/features');
      toast({
        title: "Powerful Search",
        description: "Sign up to unlock AI-powered search capabilities.",
      });
    }
  };

  const handleAIAssistant = () => {
    if (user) {
      navigate('/ai-features');
    } else {
      navigate('/features');
      toast({
        title: "AI Assistant",
        description: "Discover how AI can enhance your knowledge management.",
      });
    }
  };

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      action: () => navigate('/'),
    },
    {
      icon: Plus,
      label: user ? "Save" : "Get Started",
      action: handleQuickSave,
      primary: true,
    },
    {
      icon: Search,
      label: "Search",
      action: handleQuickSearch,
    },
    {
      icon: Sparkles,
      label: "AI",
      action: handleAIAssistant,
    },
    {
      icon: user ? User : HelpCircle,
      label: user ? "Profile" : "Help",
      action: () => user ? navigate('/profile') : window.open('mailto:support@accio.app', '_blank'),
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-md mx-auto px-4 py-3">
        <nav className="flex items-center justify-around">
          {navigationItems.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <Button
                key={index}
                variant={item.primary ? "default" : "ghost"}
                size="sm"
                onClick={item.action}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0",
                  item.primary && "bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
                aria-label={item.label}
              >
                <ItemIcon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default FooterNavigation;
