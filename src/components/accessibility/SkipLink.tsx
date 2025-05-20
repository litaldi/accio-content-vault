
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SkipLinkProps {
  targetId: string;
  className?: string;
  label?: string;
}

export const SkipLink = ({ targetId, className, label }: SkipLinkProps) => {
  const { t } = useTranslation();
  const defaultLabel = t('common.skip_to_content');
  
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-md",
        "top-4 left-4 transition-transform",
        className
      )}
      data-testid="skip-link"
      onClick={(e) => {
        // This ensures the skip link works correctly
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.tabIndex = -1;
          element.focus();
          // Remove tabIndex after focus to avoid multiple tab stops
          setTimeout(() => {
            element.removeAttribute('tabIndex');
          }, 1000);
        }
      }}
    >
      {label || defaultLabel}
    </a>
  );
};
