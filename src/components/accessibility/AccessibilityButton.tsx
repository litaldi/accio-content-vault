
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Accessibility, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

export const AccessibilityButton: React.FC = () => {
  const { preferences, updatePreferences } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          aria-label="Accessibility settings"
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={preferences.reduceAnimations}
          onCheckedChange={(checked) => updatePreferences({ reduceAnimations: checked })}
        >
          Reduce Animations
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={preferences.highContrast}
          onCheckedChange={(checked) => updatePreferences({ highContrast: checked })}
        >
          High Contrast
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={preferences.largeText}
          onCheckedChange={(checked) => updatePreferences({ largeText: checked })}
        >
          Large Text
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={preferences.keyboardNavigation}
          onCheckedChange={(checked) => updatePreferences({ keyboardNavigation: checked })}
        >
          Enhanced Keyboard Navigation
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
