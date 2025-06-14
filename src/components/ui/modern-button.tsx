
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ModernButtonProps extends ButtonProps {
  gradient?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  glow?: boolean;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  className,
  variant = 'default',
  gradient = false,
  isLoading = false,
  loadingText = 'Loading...',
  glow = false,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    // Modern styling
    'relative overflow-hidden rounded-xl font-semibold transition-all duration-200',
    'transform hover:-translate-y-0.5 active:translate-y-0',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Enhanced touch targets
    'min-h-[44px] px-6 py-3',
    // Gradient variant
    gradient && variant === 'default' && 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    gradient && variant === 'secondary' && 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 shadow-md hover:shadow-lg',
    // Glow effect
    glow && 'animate-pulse-glow',
    // Loading state
    isLoading && 'cursor-not-allowed',
    className
  );

  return (
    <Button
      className={baseClasses}
      variant={gradient ? 'ghost' : variant}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default ModernButton;
