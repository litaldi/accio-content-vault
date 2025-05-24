
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

interface ResponsiveCardProps {
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8'
};

/**
 * Enhanced responsive card component with consistent spacing
 * and interactive states across all screen sizes
 */
export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  hover = false,
  clickable = false,
  size = 'md',
  title,
  description,
  header,
  footer,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        'w-full transition-all duration-200',
        hover && 'hover:shadow-lg hover:-translate-y-1',
        clickable && 'cursor-pointer active:scale-95',
        className
      )}
      onClick={onClick}
    >
      {(header || title || description) && (
        <CardHeader className={cn('pb-4', sizeClasses[size])}>
          {header}
          {title && (
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      {children && (
        <CardContent className={cn('pt-0', sizeClasses[size])}>
          {children}
        </CardContent>
      )}
      
      {footer && (
        <CardFooter className={cn('pt-4', sizeClasses[size])}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default ResponsiveCard;
