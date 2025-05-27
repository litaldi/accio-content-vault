
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

/**
 * Enhanced card component with responsive behavior and accessibility
 */
export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  title,
  subtitle,
  icon,
  action,
  className = '',
  contentClassName = '',
  headerClassName = '',
  hover = false,
  clickable = false,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "w-full transition-all duration-200",
        hover && "hover:shadow-md hover:-translate-y-1",
        clickable && "cursor-pointer hover:bg-accent/50",
        className
      )}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {(title || subtitle || icon || action) && (
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 pb-4",
          headerClassName
        )}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <CardTitle className="text-base sm:text-lg font-semibold truncate">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </CardHeader>
      )}
      
      {children && (
        <CardContent className={cn(
          "space-y-4",
          contentClassName
        )}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default ResponsiveCard;
