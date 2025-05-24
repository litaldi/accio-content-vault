
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw,
  X,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'celebration';

interface FeedbackState {
  type: FeedbackType;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  progress?: number;
  autoClose?: boolean;
  duration?: number;
}

interface EnhancedFeedbackProps {
  feedback: FeedbackState;
  onClose?: () => void;
  className?: string;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-950/50',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/50',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-800 dark:text-yellow-200'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200'
  },
  loading: {
    icon: RefreshCw,
    bgColor: 'bg-muted/50',
    borderColor: 'border-muted',
    iconColor: 'text-primary',
    titleColor: 'text-foreground'
  },
  celebration: {
    icon: Sparkles,
    bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50',
    borderColor: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400',
    titleColor: 'text-purple-800 dark:text-purple-200'
  }
};

export const EnhancedFeedback: React.FC<EnhancedFeedbackProps> = ({
  feedback,
  onClose,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(feedback.duration || 5000);

  const config = feedbackConfig[feedback.type];
  const { icon: Icon, bgColor, borderColor, iconColor, titleColor } = config;

  useEffect(() => {
    if (feedback.autoClose && feedback.duration) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 100) {
            setIsVisible(false);
            if (onClose) {
              setTimeout(onClose, 200); // Allow fade out animation
            }
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [feedback.autoClose, feedback.duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 200);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        bgColor,
        borderColor,
        !isVisible && "opacity-0 scale-95",
        feedback.type === 'celebration' && "animate-pulse",
        className
      )}
      role={feedback.type === 'error' ? 'alert' : 'status'}
      aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex-shrink-0", iconColor)}>
          <Icon 
            className={cn(
              "h-5 w-5",
              feedback.type === 'loading' && "animate-spin",
              feedback.type === 'celebration' && "animate-bounce"
            )} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <AlertTitle className={cn("font-semibold", titleColor)}>
            {feedback.title}
          </AlertTitle>
          
          <AlertDescription className="mt-1 text-sm">
            {feedback.message}
          </AlertDescription>
          
          {feedback.progress !== undefined && (
            <div className="mt-3">
              <Progress 
                value={feedback.progress} 
                className="h-2"
                aria-label={`Progress: ${feedback.progress}%`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {feedback.progress}% complete
              </p>
            </div>
          )}
          
          {feedback.action && (
            <div className="mt-4">
              <Button
                size="sm"
                onClick={feedback.action.onClick}
                variant={feedback.type === 'error' ? 'destructive' : 'default'}
              >
                {feedback.action.label}
              </Button>
            </div>
          )}
        </div>
        
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Auto-close progress indicator */}
      {feedback.autoClose && feedback.duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-out"
            style={{ width: `${(timeLeft / feedback.duration) * 100}%` }}
          />
        </div>
      )}
    </Alert>
  );
};

// Hook for managing feedback state
export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<(FeedbackState & { id: string })[]>([]);

  const showFeedback = (feedback: FeedbackState) => {
    const id = Math.random().toString(36).substr(2, 9);
    setFeedbacks(prev => [...prev, { ...feedback, id }]);
    
    if (feedback.autoClose !== false) {
      setTimeout(() => {
        setFeedbacks(prev => prev.filter(f => f.id !== id));
      }, feedback.duration || 5000);
    }
    
    return id;
  };

  const closeFeedback = (id: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFeedbacks([]);
  };

  return {
    feedbacks,
    showFeedback,
    closeFeedback,
    clearAll,
    // Convenience methods
    showSuccess: (title: string, message: string, action?: FeedbackState['action']) =>
      showFeedback({ type: 'success', title, message, action, autoClose: true }),
    showError: (title: string, message: string, action?: FeedbackState['action']) =>
      showFeedback({ type: 'error', title, message, action, autoClose: false }),
    showWarning: (title: string, message: string, action?: FeedbackState['action']) =>
      showFeedback({ type: 'warning', title, message, action }),
    showInfo: (title: string, message: string, action?: FeedbackState['action']) =>
      showFeedback({ type: 'info', title, message, action }),
    showLoading: (title: string, message: string, progress?: number) =>
      showFeedback({ type: 'loading', title, message, progress, autoClose: false }),
    showCelebration: (title: string, message: string) =>
      showFeedback({ type: 'celebration', title, message, autoClose: true, duration: 3000 })
  };
};
