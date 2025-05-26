
import React, { useState, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accessibility, 
  Type, 
  Eye, 
  Palette, 
  Volume2, 
  MousePointer, 
  RotateCcw,
  Settings
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const ImprovedAccessibilityButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updatePreferences, resetPreferences, announceToUser } = useAccessibility();
  const isMobile = useIsMobile();

  // Count active accessibility features
  const activeFeatures = Object.entries(preferences).filter(([key, value]) => 
    value !== false && value !== 'medium' && value !== 'normal' && value !== 'light'
  ).length;

  const handleToggle = (key: keyof typeof preferences, value: any) => {
    updatePreferences({ [key]: value });
    announceToUser(`${key} ${value ? 'enabled' : 'disabled'}`);
  };

  const AccessibilityControls = () => (
    <div className="space-y-6 p-1">
      {/* Vision Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4" />
            Vision
          </CardTitle>
          <CardDescription className="text-sm">
            Adjust visual settings for better readability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Font Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center justify-between">
              Font Size
              <Badge variant="outline" className="text-xs">
                {preferences.fontSize}
              </Badge>
            </Label>
            <div className="space-y-2">
              <Slider
                value={[preferences.fontSize === 'small' ? 0 : preferences.fontSize === 'medium' ? 1 : 2]}
                onValueChange={([value]) => {
                  const sizes = ['small', 'medium', 'large'] as const;
                  handleToggle('fontSize', sizes[value]);
                }}
                max={2}
                step={1}
                className="w-full"
                aria-label="Font size"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">High Contrast</Label>
              <p className="text-xs text-muted-foreground">
                Enhance text and background contrast
              </p>
            </div>
            <Switch
              checked={preferences.highContrast}
              onCheckedChange={(checked) => handleToggle('highContrast', checked)}
              aria-label="Toggle high contrast"
            />
          </div>

          {/* Grayscale Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Grayscale Mode</Label>
              <p className="text-xs text-muted-foreground">
                Remove colors for better focus
              </p>
            </div>
            <Switch
              checked={preferences.grayscaleMode}
              onCheckedChange={(checked) => handleToggle('grayscaleMode', checked)}
              aria-label="Toggle grayscale mode"
            />
          </div>
        </CardContent>
      </Card>

      {/* Motion Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Volume2 className="h-4 w-4" />
            Motion & Animation
          </CardTitle>
          <CardDescription className="text-sm">
            Control movement and animations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Reduce Motion</Label>
              <p className="text-xs text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              checked={preferences.reducedMotion}
              onCheckedChange={(checked) => handleToggle('reducedMotion', checked)}
              aria-label="Toggle reduced motion"
            />
          </div>

          {/* Reduce Animations */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Remove Animations</Label>
              <p className="text-xs text-muted-foreground">
                Disable all decorative animations
              </p>
            </div>
            <Switch
              checked={preferences.reduceAnimations}
              onCheckedChange={(checked) => handleToggle('reduceAnimations', checked)}
              aria-label="Toggle animations"
            />
          </div>
        </CardContent>
      </Card>

      {/* Interaction Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MousePointer className="h-4 w-4" />
            Interaction
          </CardTitle>
          <CardDescription className="text-sm">
            Improve navigation and interaction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Keyboard Navigation */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Enhanced Keyboard Navigation</Label>
              <p className="text-xs text-muted-foreground">
                Improve focus indicators and shortcuts
              </p>
            </div>
            <Switch
              checked={preferences.keyboardNavigation}
              onCheckedChange={(checked) => handleToggle('keyboardNavigation', checked)}
              aria-label="Toggle enhanced keyboard navigation"
            />
          </div>

          {/* Link Highlighting */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Highlight Links</Label>
              <p className="text-xs text-muted-foreground">
                Make links more visible
              </p>
            </div>
            <Switch
              checked={preferences.highlightLinks}
              onCheckedChange={(checked) => handleToggle('highlightLinks', checked)}
              aria-label="Toggle link highlighting"
            />
          </div>

          {/* Screen Reader Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Screen Reader Mode</Label>
              <p className="text-xs text-muted-foreground">
                Enhanced support for assistive technology
              </p>
            </div>
            <Switch
              checked={preferences.screenReaderMode}
              onCheckedChange={(checked) => handleToggle('screenReaderMode', checked)}
              aria-label="Toggle screen reader mode"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reset Section */}
      <div className="pt-4">
        <Separator className="mb-4" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            resetPreferences();
            announceToUser('Accessibility preferences reset to default');
          }}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );

  const TriggerButton = (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative transition-all duration-200 hover:bg-accent",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        activeFeatures > 0 && "ring-2 ring-primary/50 bg-accent/50",
        preferences.reducedMotion && "transition-none",
        preferences.highContrast && "border-2 border-primary"
      )}
      aria-label={`Accessibility settings${activeFeatures > 0 ? `. ${activeFeatures} features active` : ''}`}
    >
      <div className="relative">
        <Accessibility className="h-4 w-4" />
        {activeFeatures > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
            variant="default"
          >
            {activeFeatures}
          </Badge>
        )}
      </div>
    </Button>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {TriggerButton}
        </SheetTrigger>
        <SheetContent side="right" className="w-[350px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Accessibility Settings
            </SheetTitle>
            <SheetDescription>
              Customize your experience with accessibility options
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <AccessibilityControls />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {TriggerButton}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
          <DialogDescription>
            Customize your experience with accessibility options
          </DialogDescription>
        </DialogHeader>
        <AccessibilityControls />
      </DialogContent>
    </Dialog>
  );
};

export default ImprovedAccessibilityButton;
