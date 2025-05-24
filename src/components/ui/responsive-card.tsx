
import React from 'react';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveCardProps extends CardProps {
  mobileFullWidth?: boolean;
  compactOnMobile?: boolean;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  className,
  mobileFullWidth = false,
  compactOnMobile = false,
  children,
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <Card
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
};
