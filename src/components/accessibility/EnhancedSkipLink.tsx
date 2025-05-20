
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

interface EnhancedSkipLinkProps {
  targetId: string;
  className?: string;
}

export const EnhancedSkipLink = ({ targetId, className = '' }: EnhancedSkipLinkProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <a
      href={`#${targetId}`}
      className={`
        bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-md
        opacity-0 fixed top-4 left-4 z-50 transform -translate-y-16
        focus:opacity-100 focus:translate-y-0 
        transition-all duration-300 outline-none ring-offset-2 ring-primary
        focus:ring-2 text-sm font-medium
        ${className}
      `}
    >
      {t('accessibility.skipToContent', 'Skip to content')}
    </a>
  );
};
