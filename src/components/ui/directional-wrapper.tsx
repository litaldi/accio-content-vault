
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface DirectionalWrapperProps {
  children: React.ReactNode;
  className?: string;
  flipIcons?: boolean;
  mirrorLayout?: boolean;
}

/**
 * A wrapper component that handles RTL/LTR direction specific adjustments
 */
export function DirectionalWrapper({
  children,
  className,
  flipIcons = true,
  mirrorLayout = true,
}: DirectionalWrapperProps) {
  const { isRTL } = useLanguage();
  
  return (
    <div 
      className={cn(
        isRTL && mirrorLayout && "flex-row-reverse",
        isRTL && flipIcons && "[&_svg]:rtl-flip",
        className
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
}

/**
 * A text component that ensures text is properly aligned based on language direction
 */
export function DirectionalText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isRTL } = useLanguage();
  
  return (
    <span 
      className={cn(
        isRTL ? "text-right" : "text-left",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * A component that conditionally reverses the order of children in RTL contexts
 */
export function ReverseInRTL({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isRTL } = useLanguage();
  
  return (
    <div 
      className={cn(
        "flex",
        isRTL ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {children}
    </div>
  );
}
