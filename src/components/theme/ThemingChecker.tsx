
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { meetsWCAGAA } from '@/utils/color-contrast';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

// For development purposes only
export const ThemingChecker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<{
    colors: { name: string; value: string; contrastIssues: string[] }[];
    spacingIssues: string[];
    fontIssues: string[];
  }>({
    colors: [],
    spacingIssues: [],
    fontIssues: [],
  });
  const { isDark, theme } = useTheme();

  const checkThemeConsistency = () => {
    // Get CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    
    // Check color contrasts
    const colors = [
      { name: 'background', value: computedStyle.getPropertyValue('--background') },
      { name: 'foreground', value: computedStyle.getPropertyValue('--foreground') },
      { name: 'primary', value: computedStyle.getPropertyValue('--primary') },
      { name: 'primary-foreground', value: computedStyle.getPropertyValue('--primary-foreground') },
      { name: 'secondary', value: computedStyle.getPropertyValue('--secondary') },
      { name: 'secondary-foreground', value: computedStyle.getPropertyValue('--secondary-foreground') },
      { name: 'muted', value: computedStyle.getPropertyValue('--muted') },
      { name: 'muted-foreground', value: computedStyle.getPropertyValue('--muted-foreground') },
      { name: 'accent', value: computedStyle.getPropertyValue('--accent') },
      { name: 'accent-foreground', value: computedStyle.getPropertyValue('--accent-foreground') },
    ];

    const processedColors = colors.map(color => {
      const contrastIssues: string[] = [];
      
      // Convert HSL to hex for contrast checking
      const value = color.value.trim();
      const colorHex = hslToHex(value);
      
      // Check contrasts with other colors
      colors.forEach(otherColor => {
        if (color.name === otherColor.name) return;
        
        // If this is a foreground color, check against its background
        if (color.name.includes('foreground')) {
          const bgName = color.name.replace('-foreground', '');
          const bgColor = colors.find(c => c.name === bgName);
          
          if (bgColor) {
            const bgHex = hslToHex(bgColor.value.trim());
            const meetsMinimumContrast = meetsWCAGAA(colorHex, bgHex);
            
            if (!meetsMinimumContrast) {
              contrastIssues.push(
                `Low contrast with ${bgName}: 4.5:1 not met`
              );
            }
          }
        }
      });
      
      return {
        name: color.name,
        value,
        contrastIssues,
      };
    });
    
    // Check spacing consistency
    const spacingIssues: string[] = [];
    // We would check CSS values for consistent spacing values here
    
    // Check font consistency
    const fontIssues: string[] = [];
    // We would analyze font usage across components here
    
    setResults({
      colors: processedColors,
      spacingIssues,
      fontIssues,
    });
    
    setOpen(true);
  };

  // Convert HSL to hex (simplified)
  function hslToHex(hsl: string): string {
    // This is a simplified conversion and would need to be more robust in production
    try {
      // Extract HSL values - this assumes the CSS variable is in the format "218 25% 12%"
      const [h, s, l] = hsl.split(' ').map(val => parseFloat(val.replace('%', '')));
      
      // Basic HSL to RGB conversion
      const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l / 100 - c / 2;
      
      let r, g, b;
      if (h < 60) { r = c; g = x; b = 0; }
      else if (h < 120) { r = x; g = c; b = 0; }
      else if (h < 180) { r = 0; g = c; b = x; }
      else if (h < 240) { r = 0; g = x; b = c; }
      else if (h < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } catch (error) {
      return '#000000';
    }
  }

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={checkThemeConsistency}
        className="fixed bottom-4 right-4 z-50"
      >
        Check UI Consistency
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>UI Consistency Check</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-medium">Current Theme: {theme}</h3>
              <p className="text-muted-foreground text-sm">
                Mode: {isDark ? 'Dark' : 'Light'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="grid grid-cols-2 gap-3">
                {results.colors.map(color => (
                  <div
                    key={color.name}
                    className={cn(
                      "p-3 rounded-md border",
                      color.contrastIssues.length > 0 && "border-red-500"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="h-4 w-4 rounded-full" 
                        style={{background: `hsl(${color.value})`}}
                      />
                      <span className="font-medium">{color.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {color.value}
                    </div>
                    {color.contrastIssues.length > 0 && (
                      <div className="text-xs text-red-500 mt-1">
                        {color.contrastIssues.map((issue, i) => (
                          <div key={i}>{issue}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* We would display spacing and font issues here */}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
