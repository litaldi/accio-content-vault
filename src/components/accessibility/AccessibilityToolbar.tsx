
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Accessibility, 
  Eye, 
  Type, 
  Contrast, 
  Zap, 
  X,
  Settings,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ isOpen, onClose }) => {
  const { preferences, updatePreferences } = useAccessibility();
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updatePreferences({ fontSize: size });
  };

  const handleZoomChange = (direction: 'in' | 'out' | 'reset') => {
    let newZoom = zoomLevel;
    
    if (direction === 'in' && zoomLevel < 200) {
      newZoom = Math.min(200, zoomLevel + 10);
    } else if (direction === 'out' && zoomLevel > 50) {
      newZoom = Math.max(50, zoomLevel - 10);
    } else if (direction === 'reset') {
      newZoom = 100;
    }
    
    setZoomLevel(newZoom);
    document.documentElement.style.zoom = `${newZoom}%`;
  };

  const resetAllSettings = () => {
    updatePreferences({
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
      announcements: true,
      keyboardNavigation: true,
    });
    setZoomLevel(100);
    document.documentElement.style.zoom = '100%';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-toolbar-title"
    >
      <div className="fixed top-4 right-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <Card className="bg-background shadow-xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle id="accessibility-toolbar-title" className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Accessibility Tools
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close accessibility toolbar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Tabs defaultValue="display" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
              </TabsList>

              <TabsContent value="display" className="space-y-4 mt-4">
                {/* Font Size Controls */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Size</label>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <Button
                        key={size}
                        variant={preferences.fontSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFontSizeChange(size)}
                        className="flex-1"
                      >
                        <Type className="h-3 w-3 mr-1" />
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zoom Level: {zoomLevel}%</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleZoomChange('out')}
                      disabled={zoomLevel <= 50}
                      aria-label="Zoom out"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleZoomChange('reset')}
                      className="flex-1"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleZoomChange('in')}
                      disabled={zoomLevel >= 200}
                      aria-label="Zoom in"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    <span className="text-sm font-medium">High Contrast</span>
                  </div>
                  <Button
                    variant={preferences.highContrast ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updatePreferences({ highContrast: !preferences.highContrast })}
                    aria-pressed={preferences.highContrast}
                  >
                    {preferences.highContrast ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Reduced Motion</span>
                  </div>
                  <Button
                    variant={preferences.reducedMotion ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updatePreferences({ reducedMotion: !preferences.reducedMotion })}
                    aria-pressed={preferences.reducedMotion}
                  >
                    {preferences.reducedMotion ? 'On' : 'Off'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-4 mt-4">
                {/* Keyboard Navigation Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Enhanced Keyboard Navigation</span>
                  </div>
                  <Button
                    variant={preferences.keyboardNavigation ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updatePreferences({ keyboardNavigation: !preferences.keyboardNavigation })}
                    aria-pressed={preferences.keyboardNavigation}
                  >
                    {preferences.keyboardNavigation ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Screen Reader Announcements Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">Screen Reader Announcements</span>
                  </div>
                  <Button
                    variant={preferences.announcements ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updatePreferences({ announcements: !preferences.announcements })}
                    aria-pressed={preferences.announcements}
                  >
                    {preferences.announcements ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Keyboard Shortcuts</h4>
                  <div className="space-y-1 text-xs">
                    <div><Badge variant="outline">Ctrl+S</Badge> Save content</div>
                    <div><Badge variant="outline">Ctrl+D</Badge> Dashboard</div>
                    <div><Badge variant="outline">Ctrl+K</Badge> Search</div>
                    <div><Badge variant="outline">?</Badge> Show shortcuts</div>
                  </div>
                </div>

                {/* Current Settings Summary */}
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Current Settings</h4>
                  <div className="space-y-1 text-xs">
                    <div>Font: {preferences.fontSize}</div>
                    <div>Zoom: {zoomLevel}%</div>
                    <div>High Contrast: {preferences.highContrast ? 'On' : 'Off'}</div>
                    <div>Reduced Motion: {preferences.reducedMotion ? 'On' : 'Off'}</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Reset All Settings */}
            <Button
              variant="destructive"
              size="sm"
              onClick={resetAllSettings}
              className="w-full"
            >
              <RotateCcw className="h-3 w-3 mr-2" />
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessibilityToolbar;
