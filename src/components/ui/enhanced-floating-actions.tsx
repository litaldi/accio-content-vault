
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  Search,
  HelpCircle,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FloatingActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
  variant = 'outline'
}) => (
  <Button
    onClick={onClick}
    size="icon"
    variant={variant}
    className={cn(
      "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
      "bg-background/95 backdrop-blur-sm border-2",
      "hover:bg-accent hover:scale-110 active:scale-95",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "min-h-[48px] min-w-[48px]",
      className
    )}
    aria-label={label}
    title={label}
  >
    <Icon className="h-5 w-5" />
  </Button>
);

export const EnhancedFloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowBackToTop(scrolled > 800);
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Simple throttle function
  function throttle(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return function (...args: any[]) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleQuickCapture = () => {
    if (user) {
      navigate('/save');
      toast({
        title: "Quick Capture Ready",
        description: "Start saving your content now!"
      });
    } else {
      navigate('/register');
      toast({
        title: "Join Accio Today",
        description: "Sign up to start capturing knowledge instantly."
      });
    }
  };

  const handleAIAssistant = () => {
    if (user) {
      navigate('/ai-features');
      toast({
        title: "AI Assistant Activated",
        description: "Explore intelligent features to enhance your workflow."
      });
    } else {
      navigate('/features');
      toast({
        title: "Discover AI Power",
        description: "See how AI can transform your knowledge management."
      });
    }
  };

  const handleSearch = () => {
    if (user) {
      navigate('/search');
    } else {
      navigate('/features');
      toast({
        title: "Advanced Search Available",
        description: "Sign up to unlock powerful search capabilities."
      });
    }
  };

  const handleHelp = () => {
    window.open('mailto:support@accio.app?subject=Need Help with Accio', '_blank');
    toast({
      title: "We're Here to Help",
      description: "Email opened. We'll respond within 24 hours."
    });
  };

  const floatingActions = [
    {
      icon: Plus,
      label: user ? "Quick Capture Content" : "Start Your Journey",
      onClick: handleQuickCapture,
      variant: 'default' as const,
      className: "bg-primary text-primary-foreground hover:bg-primary/90"
    },
    {
      icon: Sparkles,
      label: user ? "AI Assistant" : "Explore AI Features",
      onClick: handleAIAssistant,
      variant: 'outline' as const
    },
    {
      icon: Search,
      label: user ? "Smart Search" : "Discover Search Power",
      onClick: handleSearch,
      variant: 'outline' as const
    },
    {
      icon: HelpCircle,
      label: "Get Support",
      onClick: handleHelp,
      variant: 'outline' as const
    }
  ];

  if (!showBackToTop && !isExpanded) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      role="region"
      aria-label="Floating action buttons"
    >
      {/* Expanded action buttons */}
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {floatingActions.map((action, index) => (
            <FloatingActionButton
              key={index}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
              variant={action.variant}
              className={action.className}
            />
          ))}
        </div>
      )}

      {/* Main action button / Back to top */}
      <div className="flex gap-3">
        {showBackToTop && (
          <FloatingActionButton
            icon={ArrowUp}
            label="Back to Top"
            onClick={scrollToTop}
          />
        )}
        
        <FloatingActionButton
          icon={isExpanded ? MessageSquare : Zap}
          label={isExpanded ? "Close Actions" : "Quick Actions"}
          onClick={() => setIsExpanded(!isExpanded)}
          variant="default"
          className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90"
        />
      </div>
    </div>
  );
};

export default EnhancedFloatingActions;
