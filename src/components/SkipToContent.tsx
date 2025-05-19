
import React from "react";
import { Button } from "@/components/ui/button";

const SkipToContent = () => {
  return (
    <Button
      variant="outline"
      className="absolute left-4 top-4 z-50 -translate-y-20 focus:translate-y-0 transition-transform"
      onClick={() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.tabIndex = -1;
          mainContent.focus();
          setTimeout(() => {
            mainContent.removeAttribute("tabindex");
          }, 1000);
        }
      }}
    >
      Skip to content
    </Button>
  );
};

export default SkipToContent;
