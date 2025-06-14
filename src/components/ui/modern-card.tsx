
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  gradient = false,
  onClick
}) => {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-2xl border shadow-md transition-all duration-300',
        // Glass morphism
        glass && 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50',
        // Regular card
        !glass && 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700',
        // Gradient background
        gradient && 'bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950',
        // Interactive states
        hover && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const ModernCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('p-6 pb-4', className)}>
    {children}
  </div>
);

export const ModernCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('px-6 pb-6', className)}>
    {children}
  </div>
);

export const ModernCardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 dark:border-gray-800', className)}>
    {children}
  </div>
);

export default ModernCard;
