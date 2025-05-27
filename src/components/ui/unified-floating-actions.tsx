
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  Search,
  HelpCircle,
  Zap,
  Brain
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
  primary?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
  variant = 'outline',
  primary = false
}) => (
  <Button
    onClick={onClick}
    size="icon"
    variant={variant}
    className={cn(
      "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
      "hover:scale-110 active:scale-95",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      primary ? "bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90" 
               : "bg-background/95 backdrop-blur-sm border-2 hover:bg-accent",
      className
    )}
    aria-label={label}
    title={label}
  >
    <Icon className="h-5 w-5" />
  </Button>
);

export const UnifiedFloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickCapture = () => {
    if (user) {
      navigate('/save');
      toast({
        title: "Ready to Capture Knowledge",
        description: "Save anything and let AI organize it for you."
      });
    } else {
      navigate('/register');
      toast({
        title: "Transform Your Knowledge Today",
        description: "Join thousands building their knowledge empires."
      });
    }
  };

  const handleAIAssistant = () => {
    navigate(user ? '/ai-features' : '/features');
    toast({
      title: user ? "AI Assistant Ready" : "Discover AI Power",
      description: user ? "Your intelligent knowledge companion awaits." : "See how AI transforms knowledge management."
    });
  };

  const handleSmartSearch = () => {
    navigate(user ? '/search' : '/features');
    if (!user) {
      toast({
        title: "Powerful Search Awaits",
        description: "Find anything instantly with semantic search."
      });
    }
  };

  const handleSupport = () => {
    window.open('mailto:support@accio.app?subject=I need help with Accio', '_blank');
    toast({
      title: "Help is on the way",
      description: "We'll respond within 24 hours."
    });
  };

  const floatingActions = [
    {
      icon: Plus,
      label: user ? "Capture Knowledge Instantly" : "Start Your Knowledge Journey",
      onClick: handleQuickCapture,
      variant: 'default' as const,
      className: "bg-primary text-primary-foreground hover:bg-primary/90"
    },
    {
      icon: Brain,
      label: user ? "AI Knowledge Assistant" : "Discover AI Features",
      onClick: handleAIAssistant,
      variant: 'outline' as const
    },
    {
      icon: Search,
      label: user ? "Smart Knowledge Search" : "See Search Power",
      onClick: handleSmartSearch,
      variant: 'outline' as const
    },
    {
      icon: HelpCircle,
      label: "Get Expert Support",
      onClick: handleSupport,
      variant: 'outline' as const
    }
  ];

  if (!showBackToTop && !isExpanded) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      role="region"
      aria-label="Quick actions"
    >
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

      <div className="flex gap-3">
        {showBackToTop && (
          <FloatingActionButton
            icon={ArrowUp}
            label="Back to Top"
            onClick={scrollToTop}
          />
        )}
        
        <FloatingActionButton
          icon={isExpanded ? MessageSquare : Sparkles}
          label={isExpanded ? "Close Quick Actions" : "Quick Actions"}
          onClick={() => setIsExpanded(!isExpanded)}
          primary={true}
        />
      </div>
    </div>
  );
};

export default UnifiedFloatingActions;
