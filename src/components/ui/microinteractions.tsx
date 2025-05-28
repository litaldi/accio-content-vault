
import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Check, Heart, Bookmark, Archive, Tag, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicroInteractionButtonProps extends Omit<ButtonProps, 'type'> {
  actionType: 'save' | 'like' | 'bookmark' | 'archive' | 'tag';
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  showFeedback?: boolean;
}

export const MicroInteractionButton: React.FC<MicroInteractionButtonProps> = ({
  actionType,
  isActive = false,
  onToggle,
  showFeedback = true,
  className,
  children,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const config = {
    save: {
      icon: Check,
      activeColor: 'text-green-500',
      inactiveColor: 'text-muted-foreground',
      feedback: 'Saved!',
      animation: 'animate-bounce'
    },
    like: {
      icon: Heart,
      activeColor: 'text-red-500',
      inactiveColor: 'text-muted-foreground',
      feedback: 'Liked!',
      animation: 'animate-pulse'
    },
    bookmark: {
      icon: Bookmark,
      activeColor: 'text-yellow-500',
      inactiveColor: 'text-muted-foreground',
      feedback: 'Bookmarked!',
      animation: 'animate-bounce'
    },
    archive: {
      icon: Archive,
      activeColor: 'text-blue-500',
      inactiveColor: 'text-muted-foreground',
      feedback: 'Archived!',
      animation: 'animate-pulse'
    },
    tag: {
      icon: Tag,
      activeColor: 'text-purple-500',
      inactiveColor: 'text-muted-foreground',
      feedback: 'Tagged!',
      animation: 'animate-bounce'
    }
  };

  const { icon: Icon, activeColor, inactiveColor, feedback: feedbackText, animation } = config[actionType];

  const handleClick = () => {
    const newActive = !isActive;
    
    if (showFeedback && newActive) {
      setIsAnimating(true);
      setFeedback(feedbackText);
      
      setTimeout(() => {
        setIsAnimating(false);
        setFeedback(null);
      }, 1500);
    }
    
    onToggle?.(newActive);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={cn(
          "transition-all duration-200 hover:scale-110",
          isAnimating && animation,
          className
        )}
        {...props}
      >
        <Icon 
          className={cn(
            "h-4 w-4 transition-colors duration-200",
            isActive ? activeColor : inactiveColor
          )}
        />
        {children}
      </Button>
      
      {/* Feedback popup */}
      {feedback && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md animate-fade-in">
          {feedback}
        </div>
      )}
    </div>
  );
};

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon: Icon = Sparkles,
  label = "Quick Action",
  position = 'bottom-right'
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:scale-110 active:scale-95",
        "bg-primary hover:bg-primary/90",
        positionClasses[position]
      )}
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
};

export const ProgressIndicator: React.FC<{ 
  progress: number; 
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  progress, 
  showText = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="space-y-2">
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
        <div 
          className="bg-primary h-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showText && (
        <p className="text-xs text-muted-foreground text-center">
          {Math.round(progress)}% complete
        </p>
      )}
    </div>
  );
};
