
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

export const SkipLink = ({ targetId, className }: SkipLinkProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Ensure the target element is focusable
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) {
      // Make sure the target is focusable
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
    }
  }, [targetId]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      
      // Scroll to the target element (for browsers that don't auto-scroll on focus)
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      onFocus={() => {
        setHasFocus(true);
        setIsVisible(true);
      }}
      onBlur={() => {
        setHasFocus(false);
        setIsVisible(false);
      }}
      className={cn(
        "fixed top-0 left-0 z-50 p-4 bg-background text-foreground transition-transform",
        isVisible ? "transform-none" : "-translate-y-full",
        hasFocus ? "outline-none ring-2 ring-primary" : "",
        className
      )}
      aria-label={`Skip to ${targetId.replace(/-/g, " ")}`}
    >
      Skip to {targetId.replace(/-/g, " ")}
    </a>
  );
};
