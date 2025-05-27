
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Accessibility,
  Eye,
  Type,
  RotateCcw,
  Zap,
  ZapOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import AccessibilityToolbar from './AccessibilityToolbar';

interface AccessibilityButtonProps {
  variant?: 'header' | 'floating';
  className?: string;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ 
  variant = 'header',
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      announceToScreenReader('Accessibility options opened');
    }
  };

  const buttonContent = variant === 'header' ? (
    <>
      <Accessibility className="h-4 w-4" />
      <span className="sr-only">Accessibility options</span>
    </>
  ) : (
    <>
      <Accessibility className="h-5 w-5" />
      <span className="sr-only">Accessibility options</span>
    </>
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={variant === 'header' ? 'ghost' : 'outline'}
          size={variant === 'header' ? 'sm' : 'icon'}
          className={cn(
            variant === 'header' 
              ? "gap-2 hover:bg-accent" 
              : "h-12 w-12 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200",
            className
          )}
          aria-label="Open accessibility options"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {buttonContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-4" 
        align={variant === 'header' ? 'end' : 'start'}
        side={variant === 'header' ? 'bottom' : 'left'}
        role="dialog"
        aria-label="Accessibility settings"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Accessibility Options</h3>
          </div>
          <AccessibilityToolbar />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityButton;
