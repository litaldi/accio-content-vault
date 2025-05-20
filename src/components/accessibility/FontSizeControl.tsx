
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface FontSizeControlProps {
  fontSize: number;
  changeFontSize: (value: number) => void;
}

export function FontSizeControl({ fontSize, changeFontSize }: FontSizeControlProps) {
  const { t } = useTranslation();
  
  // Handlers for keyboard interactions
  const handleDecreaseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      changeFontSize(Math.max(70, fontSize - 10));
    }
  };
  
  const handleIncreaseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      changeFontSize(Math.min(150, fontSize + 10));
    }
  };
  
  return (
    <div className="space-y-2" role="group" aria-labelledby="font-size-label">
      <div className="flex items-center justify-between">
        <label id="font-size-label" className="text-sm font-medium">
          {t('common.accessibility.fontSize', 'Font Size')}
        </label>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {fontSize}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => changeFontSize(Math.max(70, fontSize - 10))}
          onKeyDown={handleDecreaseKeyDown}
          aria-label={t('common.accessibility.decreaseFontSize', 'Decrease font size')}
          aria-controls="font-size-slider"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Slider
          id="font-size-slider"
          value={[fontSize]}
          min={70}
          max={150}
          step={10}
          onValueChange={(value) => changeFontSize(value[0])}
          aria-label={t('common.accessibility.adjustFontSize', 'Adjust font size')}
          aria-valuemin={70}
          aria-valuemax={150}
          aria-valuenow={fontSize}
          aria-valuetext={`${fontSize}%`}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => changeFontSize(Math.min(150, fontSize + 10))}
          onKeyDown={handleIncreaseKeyDown}
          aria-label={t('common.accessibility.increaseFontSize', 'Increase font size')}
          aria-controls="font-size-slider"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
