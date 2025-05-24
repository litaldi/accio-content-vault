
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  mobileFullWidth?: boolean;
  compactOnMobile?: boolean;
  children: React.ReactNode;
}

export const ResponsiveCard = React.forwardRef<HTMLDivElement, ResponsiveCardProps>(({
  className,
  mobileFullWidth = false,
  compactOnMobile = false,
  children,
  ...props
}, ref) => {
  const { isMobile } = useResponsive();

  return (
    <Card
      ref={ref}
      className={cn(
        "transition-all duration-200",
        mobileFullWidth && isMobile && "w-full",
        compactOnMobile && isMobile && "p-2",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
});

ResponsiveCard.displayName = "ResponsiveCard";
