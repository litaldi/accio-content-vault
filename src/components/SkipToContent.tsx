
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * SkipToContent component for keyboard users to bypass navigation
 * and jump directly to the main content
 * 
 * This is especially important for screen reader users and keyboard-only users
 * as it allows them to bypass repetitive navigation menus.
 */
const SkipToContent = () => {
  const { toast } = useToast();

  const handleSkip = () => {
    // Try to find main content by id first
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      // Set tabindex temporarily to allow focus
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      
      // After focusing, we can remove the tabindex to avoid
      // interfering with normal tab order
      setTimeout(() => {
        mainContent.removeAttribute("tabindex");
      }, 1000);

      // Provide feedback for screen reader users
      toast({
        title: "Skipped to main content",
        description: "Navigation has been bypassed",
        duration: 2000,
      });
    } else {
      // Fallback to main element if id not found
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.setAttribute("tabindex", "-1");
        mainElement.focus();
        mainElement.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          mainElement.removeAttribute("tabindex");
        }, 1000);

        toast({
          title: "Skipped to main content",
          description: "Navigation has been bypassed",
          duration: 2000,
        });
      } else {
        // If no main content is found, notify the user
        toast({
          title: "Error",
          description: "Could not find main content to skip to",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  return (
    <Button
      variant="outline"
      className="fixed left-4 top-4 z-50 -translate-y-full focus:translate-y-0 transition-transform bg-background border-2 border-primary px-4 py-2 shadow-md"
      onClick={handleSkip}
      aria-label="Skip to main content"
      data-testid="skip-to-content"
    >
      Skip to content
    </Button>
  );
};

export default SkipToContent;
