
import React from 'react';
import { ModernButton } from '@/components/ui/modern-button';
import { ModernButtonProps } from '@/components/ui/modern-button';

interface AccessibleButtonProps extends ModernButtonProps {
  ariaLabel?: string;
  tooltipText?: string;
}

/**
 * Enhanced accessible button that extends ModernButton
 * with additional accessibility features
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  ariaLabel,
  tooltipText,
  ...props
}) => {
  return (
    <ModernButton
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      title={tooltipText}
      {...props}
    >
      {children}
    </ModernButton>
  );
};

export default AccessibleButton;
