
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  Settings, 
  Type, 
  Palette, 
  Clock,
  BookOpen,
  Share,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReadAloudButton from '@/components/voice/ReadAloudButton';

interface ReadingModeProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: string;
    title: string;
    content: string;
    tags?: string[];
    estimatedReadTime?: number;
    url?: string;
  };
}

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'serif' | 'sans' | 'mono';
  theme: 'light' | 'dark' | 'sepia';
  width: 'narrow' | 'medium' | 'wide';
}

const ReadingMode: React.FC<ReadingModeProps> = ({
  isOpen,
  onClose,
  content
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'serif',
    theme: 'dark',
    width: 'medium'
  });

  useEffect(() => {
    // Load saved reading preferences
    const saved = localStorage.getItem('accio_reading_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Use defaults
      }
    }
  }, []);

  const saveSettings = (newSettings: ReadingSettings) => {
    setSettings(newSettings);
    localStorage.setItem('accio_reading_settings', JSON.stringify(newSettings));
  };

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      case 'dark':
      default:
        return 'bg-gray-900 text-gray-100';
    }
  };

  const getWidthClasses = () => {
    switch (settings.width) {
      case 'narrow':
        return 'max-w-2xl';
      case 'wide':
        return 'max-w-5xl';
      case 'medium':
      default:
        return 'max-w-4xl';
    }
  };

  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'serif':
      default:
        return 'font-serif';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold truncate max-w-md">{content.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                {content.estimatedReadTime && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {content.estimatedReadTime}m read
                  </Badge>
                )}
                {content.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ReadAloudButton text={content.content} />
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 z-20 w-80 bg-background border rounded-lg shadow-lg p-4">
          <h3 className="font-semibold mb-4">Reading Settings</h3>
          
          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="text-sm font-medium mb-2 block">Font Size</label>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => saveSettings({ ...settings, fontSize: value })}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {settings.fontSize}px
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="text-sm font-medium mb-2 block">Line Height</label>
              <Slider
                value={[settings.lineHeight]}
                onValueChange={([value]) => saveSettings({ ...settings, lineHeight: value })}
                min={1.2}
                max={2.0}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {settings.lineHeight.toFixed(1)}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="text-sm font-medium mb-2 block">Font Family</label>
              <div className="grid grid-cols-3 gap-2">
                {(['serif', 'sans', 'mono'] as const).map((font) => (
                  <Button
                    key={font}
                    variant={settings.fontFamily === font ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => saveSettings({ ...settings, fontFamily: font })}
                    className="capitalize"
                  >
                    {font}
                  </Button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="text-sm font-medium mb-2 block">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'dark', 'sepia'] as const).map((theme) => (
                  <Button
                    key={theme}
                    variant={settings.theme === theme ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => saveSettings({ ...settings, theme })}
                    className="capitalize"
                  >
                    {theme}
                  </Button>
                ))}
              </div>
            </div>

            {/* Width */}
            <div>
              <label className="text-sm font-medium mb-2 block">Content Width</label>
              <div className="grid grid-cols-3 gap-2">
                {(['narrow', 'medium', 'wide'] as const).map((width) => (
                  <Button
                    key={width}
                    variant={settings.width === width ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => saveSettings({ ...settings, width })}
                    className="capitalize"
                  >
                    {width}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn("min-h-screen transition-all duration-200", getThemeClasses())}>
        <div className={cn("mx-auto px-6 py-8", getWidthClasses())}>
          <article 
            className={cn(
              "prose prose-lg max-w-none transition-all duration-200",
              getFontFamilyClass(),
              settings.theme === 'dark' && "prose-invert",
              settings.theme === 'sepia' && "prose-amber"
            )}
            style={{
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default ReadingMode;
