
import React from "react";
import { Button } from "@/components/ui/button";

const SkipToContent = () => {
  return (
    <Button
      variant="outline"
      className="fixed left-4 top-4 z-50 -translate-y-full focus:translate-y-0 transition-transform bg-background"
      onClick={() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.tabIndex = -1;
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            mainContent.removeAttribute("tabindex");
          }, 1000);
        }
      }}
      aria-label="Skip to main content"
    >
      Skip to content
    </Button>
  );
};

export default SkipToContent;
