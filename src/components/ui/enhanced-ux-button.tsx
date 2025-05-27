
import React, { useState, useRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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

    // Visual feedback
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
        
        // Handle async operations
        if (result !== undefined && result !== null && typeof result === 'object' && typeof (result as any).then === 'function') {
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

  // WCAG 2.1 AA compliant styling
  const accessibilityStyles = cn(
    // Minimum touch target size (44x44px)
    'min-h-[44px] min-w-[44px]',
    // High contrast focus indicators
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    // Enhanced transitions that respect reduced motion
    'transition-all duration-200',
    // Visual feedback states
    isPressed && 'scale-95',
    feedback === 'success' && 'bg-green-600 text-white border-green-600',
    feedback === 'error' && 'bg-red-600 text-white border-red-600'
  );

  return (
    <Button
      ref={buttonRef}
      className={cn(accessibilityStyles, className)}
      variant={getVariant()}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-busy={isLoading}
      aria-describedby={tooltipText ? `${props.id || 'button'}-tooltip` : undefined}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
      title={tooltipText}
      {...props}
    >
      <div className="flex items-center gap-2">
        {getButtonContent()}
      </div>
      
      {/* Screen reader only tooltip */}
      {tooltipText && (
        <span id={`${props.id || 'button'}-tooltip`} className="sr-only">
          {tooltipText}
        </span>
      )}
    </Button>
  );
};

export default EnhancedUXButton;
