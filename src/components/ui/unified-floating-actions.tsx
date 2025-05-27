
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Sparkles, 
  HelpCircle, 
  ChevronUp,
  Bookmark,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const UnifiedFloatingActions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't show on certain pages to avoid clutter
  const hiddenPaths = ['/login', '/register', '/save'];
  const isHidden = hiddenPaths.some(path => location.pathname.startsWith(path));

  if (isHidden) return null;

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
    setIsExpanded(false);
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
    setIsExpanded(false);
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
    setIsExpanded(false);
  };

  const handleHelp = () => {
    // This could open a help modal or navigate to help
    toast({
      title: "Help & Support",
      description: "Contact us at support@accio.app for assistance.",
    });
    setIsExpanded(false);
  };

  const floatingActions = [
    {
      icon: Plus,
      label: user ? "Quick Save" : "Get Started",
      action: handleQuickSave,
      primary: true,
      description: user ? "Save content instantly" : "Start your knowledge journey"
    },
    {
      icon: Search,
      label: user ? "Quick Search" : "Explore Search",
      action: handleQuickSearch,
      description: user ? "Find your content fast" : "See search capabilities"
    },
    {
      icon: Sparkles,
      label: user ? "AI Assistant" : "AI Features",
      action: handleAIAssistant,
      description: user ? "Get AI help" : "Discover AI features"
    },
    {
      icon: HelpCircle,
      label: "Help",
      action: handleHelp,
      description: "Get support and guidance"
    }
  ];

  const PrimaryIcon = floatingActions[0].icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {floatingActions.slice(1).map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <div key={index} className="group flex items-center gap-3">
                <div className="hidden group-hover:block bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in whitespace-nowrap">
                  {action.description}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="w-12 h-12 rounded-full shadow-lg bg-background border-2 hover:scale-110 transition-all duration-200"
                  aria-label={action.label}
                  title={action.label}
                >
                  <ActionIcon className="h-5 w-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-12 h-12 rounded-full shadow-lg bg-muted/80 backdrop-blur border-2",
          "hover:scale-110 transition-all duration-200",
          isExpanded && "rotate-180"
        )}
        aria-label={isExpanded ? "Collapse quick actions" : "Expand quick actions"}
        title={isExpanded ? "Collapse quick actions" : "Show quick actions"}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>

      {/* Primary Action Button */}
      <Button
        onClick={floatingActions[0].action}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl hover:shadow-2xl",
          "bg-gradient-to-r from-primary via-blue-600 to-purple-600",
          "hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90",
          "hover:scale-110 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        aria-label={floatingActions[0].label}
        title={floatingActions[0].description}
      >
        <PrimaryIcon className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default UnifiedFloatingActions;
