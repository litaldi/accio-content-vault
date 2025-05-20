
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
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {t('common.accessibility.fontSize', 'Font Size')}
        </label>
        <span className="text-xs text-muted-foreground">{fontSize}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => changeFontSize(Math.max(70, fontSize - 10))}
          aria-label={t('common.accessibility.decreaseFontSize', 'Decrease font size')}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Slider
          value={[fontSize]}
          min={70}
          max={150}
          step={10}
          onValueChange={(value) => changeFontSize(value[0])}
          aria-label={t('common.accessibility.adjustFontSize', 'Adjust font size')}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => changeFontSize(Math.min(150, fontSize + 10))}
          aria-label={t('common.accessibility.increaseFontSize', 'Increase font size')}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
