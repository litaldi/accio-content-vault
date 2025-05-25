
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  verticalSpacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centerContent?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const containerSizes = {
  sm: 'max-w-screen-sm',   // 640px
  md: 'max-w-screen-md',   // 768px
  lg: 'max-w-screen-lg',   // 1024px
  xl: 'max-w-screen-xl',   // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full'
};

const horizontalPadding = {
  none: '',
  sm: 'px-4',
  md: 'px-4 sm:px-6',
  lg: 'px-4 sm:px-6 lg:px-8',
  xl: 'px-4 sm:px-6 lg:px-8 xl:px-12'
};

const verticalSpacing = {
  none: '',
  sm: 'py-4 sm:py-6',
  md: 'py-6 sm:py-8 lg:py-12',
  lg: 'py-8 sm:py-12 lg:py-16',
  xl: 'py-12 sm:py-16 lg:py-20'
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'xl',
  padding = 'md',
  verticalSpacing: vSpacing = 'none',
  centerContent = true,
  as: Component = 'div'
}) => {
  const { isMobile } = useResponsiveDesign();

  return (
    <Component
      className={cn(
        // Base container styles
        'w-full',
        centerContent && 'mx-auto',
        
        // Size constraints
        containerSizes[size],
        
        // Spacing
        horizontalPadding[padding],
        verticalSpacing[vSpacing],
        
        // Mobile optimizations
        isMobile && 'text-sm',
        
        // Custom classes
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
