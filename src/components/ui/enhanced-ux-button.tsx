import React, { useState, useRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DesignTokens } from '@/components/design-system/EnhancedDesignSystem';

interface EnhancedUXButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tooltipText?: string;
  intent?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showFeedback?: boolean;
  hapticFeedback?: boolean;
}

export const EnhancedUXButton: React.FC<EnhancedUXButtonProps> = ({
  children,
  className,
  isLoading = false,
  loadingText,
  successText,
  errorText,
  icon: Icon,
  tooltipText,
  intent,
  showFeedback = true,
  hapticFeedback = true,
  disabled,
  onClick,
  ...props
}) => {
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Visual and haptic feedback
    setIsPressed(true);
    
    // Haptic feedback on supported devices
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Reset pressed state quickly
    setTimeout(() => setIsPressed(false), 150);

    try {
      if (onClick) {
        const result = onClick(event);
        
        // Handle async operations - check if result is a Promise
        // Check if result is defined and is a thenable object
        if (result !== undefined && result !== null && typeof result === 'object' && 'then' in result && typeof result.then === 'function') {
          await result;
          
          if (showFeedback && successText) {
            setFeedback('success');
            setTimeout(() => setFeedback('idle'), 2000);
          }
        }
      }
    } catch (error) {
      if (showFeedback && errorText) {
        setFeedback('error');
        setTimeout(() => setFeedback('idle'), 3000);
      }
    }
  };

  // Determine button content based on state
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{loadingText || 'Loading...'}</span>
        </>
      );
    }

    if (feedback === 'success' && successText) {
      return <span>{successText}</span>;
    }

    if (feedback === 'error' && errorText) {
      return <span>{errorText}</span>;
    }

    return (
      <>
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        <span>{children}</span>
      </>
    );
  };

  // Dynamic variant based on feedback state
  const getVariant = () => {
    if (feedback === 'success') return 'default';
    if (feedback === 'error') return 'destructive';
    return props.variant || 'default';
  };

  // Intent-based styling
  const intentClasses = intent ? {
    primary: 'bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-lg',
    secondary: 'bg-secondary hover:bg-secondary/80',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
    error: 'bg-destructive hover:bg-destructive/90'
  }[intent] : '';

  return (
    <Button
      ref={buttonRef}
      className={cn(
        // Enhanced accessibility
        DesignTokens.interactions.focusRing,
        DesignTokens.sizing.touchTarget,
        // Enhanced interactions
        DesignTokens.interactions.hoverScale,
        DesignTokens.interactions.activeScale,
        // Visual feedback
        isPressed && 'scale-95',
        feedback === 'success' && 'bg-green-500 text-white',
        feedback === 'error' && 'bg-red-500 text-white',
        // Intent styling
        intentClasses,
        // Smooth transitions
        'transition-all duration-200',
        className
      )}
      variant={getVariant()}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-busy={isLoading}
      aria-describedby={tooltipText ? `${props.id || 'button'}-tooltip` : undefined}
      title={tooltipText}
      {...props}
    >
      <div className="flex items-center gap-2">
        {getButtonContent()}
      </div>
      
      {/* Tooltip for additional context */}
      {tooltipText && (
        <span id={`${props.id || 'button'}-tooltip`} className="sr-only">
          {tooltipText}
        </span>
      )}
    </Button>
  );
};

export default EnhancedUXButton;
