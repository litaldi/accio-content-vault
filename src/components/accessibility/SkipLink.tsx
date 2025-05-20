
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface SkipLinkProps {
  targetId: string;
  className?: string;
  label?: string;
}

export const SkipLink = ({ targetId, className, label }: SkipLinkProps) => {
  const { t } = useTranslation();
  const { preferences } = useAccessibility();
  const defaultLabel = t('common.skip_to_content', 'Skip to content');
  
  // Improved keyboard handling and focus management
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.tabIndex = -1;
      element.focus();
      element.classList.add('outline-focus');
      
      // Clean up after focus moves elsewhere
      element.addEventListener('blur', () => {
        element.removeAttribute('tabIndex');
        element.classList.remove('outline-focus');
      }, { once: true });
    }
  }
  
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-md",
        "top-4 left-4 transition-transform",
        preferences.highContrast ? "focus:ring-4 focus:ring-offset-4" : "",
        className
      )}
      data-testid="skip-link"
      onClick={handleClick}
      aria-label={label || defaultLabel}
    >
      {label || defaultLabel}
    </a>
  );
};
