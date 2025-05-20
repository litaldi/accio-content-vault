
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface EnhancedSkipLinkProps {
  targetId: string;
  className?: string;
  label?: string;
}

export const EnhancedSkipLink = ({ targetId, className = '', label }: EnhancedSkipLinkProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { preferences } = useAccessibility();
  
  const skipLabel = label || t('accessibility.skipToContent', 'Skip to content');
  
  // Improved focus handling for better accessibility
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Make element focusable temporarily
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
      
      // Allow screen readers to announce the target content
      targetElement.addEventListener('blur', () => {
        targetElement.removeAttribute('tabindex');
      }, { once: true });
    }
  }
  
  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className={cn(
        `
        bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-md
        opacity-0 fixed top-4 left-4 z-50 transform -translate-y-16
        focus:opacity-100 focus:translate-y-0 
        transition-all duration-300 outline-none ring-offset-2 ring-primary
        focus:ring-2 text-sm font-medium
        ${preferences.highContrast ? 'ring-4 ring-offset-4' : ''}
        `,
        className
      )}
      data-testid="enhanced-skip-link"
    >
      {skipLabel}
    </a>
  );
};
