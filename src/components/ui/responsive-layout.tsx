
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  verticalSpacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md', 
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
  xl: 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
};

const verticalSpacingClasses = {
  none: '',
  sm: 'py-4 sm:py-6',
  md: 'py-6 sm:py-8 lg:py-12',
  lg: 'py-8 sm:py-12 lg:py-16',
  xl: 'py-12 sm:py-16 lg:py-20'
};

/**
 * Enhanced responsive layout component that provides consistent spacing 
 * and max-widths across different screen sizes with improved accessibility
 */
export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
  verticalSpacing = 'none'
}) => {
  const { isMobile, isTablet } = useResponsiveLayout();

  return (
    <div 
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        verticalSpacingClasses[verticalSpacing],
        // Enhanced responsive adjustments
        isMobile && 'text-sm',
        isTablet && 'text-base',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveLayout;
