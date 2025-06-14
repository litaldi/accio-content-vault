
import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ModernInputProps extends InputProps {
  label?: string;
  helper?: string;
  error?: string;
  glass?: boolean;
  icon?: React.ReactNode;
}

export const ModernInput: React.FC<ModernInputProps> = ({
  label,
  helper,
  error,
  glass = false,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <Input
          className={cn(
            // Modern styling
            'rounded-xl border-gray-200 dark:border-gray-700 transition-all duration-200',
            'focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
            'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
            // Glass effect
            glass && 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50',
            // Icon padding
            icon && 'pl-10',
            // Error state
            error && 'border-red-300 dark:border-red-700 focus:ring-red-500/50 focus:border-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {helper && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ModernInput;
