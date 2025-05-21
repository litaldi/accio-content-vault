
import React from "react";
import { Button } from "@/components/ui/button";

/**
 * SkipToContent component for keyboard users to bypass navigation
 * and jump directly to the main content
 * 
 * This is especially important for screen reader users and keyboard-only users
 * as it allows them to bypass repetitive navigation menus.
 */
const SkipToContent = () => {
  return (
    <Button
      variant="outline"
      className="fixed left-4 top-4 z-50 -translate-y-full focus:translate-y-0 transition-transform bg-background border-2 border-primary px-4 py-2 shadow-md"
      onClick={() => {
        // Try to find main content by id first
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.tabIndex = -1;
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
          
          // After focusing, we can remove the tabindex to avoid
          // interfering with normal tab order
          setTimeout(() => {
            mainContent.removeAttribute("tabindex");
          }, 1000);
        } else {
          // Fallback to main element if id not found
          const mainElement = document.querySelector('main');
          if (mainElement) {
            mainElement.tabIndex = -1;
            mainElement.focus();
            mainElement.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
              mainElement.removeAttribute("tabindex");
            }, 1000);
          }
        }
      }}
      aria-label="Skip to main content"
    >
      Skip to content
    </Button>
  );
};

export default SkipToContent;
