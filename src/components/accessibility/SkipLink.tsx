
import React from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

export const SkipLink = ({ targetId, className }: SkipLinkProps) => {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    >
      Skip to {targetId.replace(/-/g, " ")}
    </a>
  );
};
