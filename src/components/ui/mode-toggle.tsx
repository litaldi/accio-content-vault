
import * as React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function ModeToggle() {
  const { preferences } = useAccessibility();
  
  // Pass high contrast preference to ThemeToggle
  return <ThemeToggle initialHighContrast={preferences.highContrast} />;
}
