
import React, { useState, useRef, useEffect } from 'react';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';
import { HelpCircle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  type?: 'help' | 'info' | 'tip';
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  showDelay?: number;
  hideDelay?: number;
  className?: string;
}

export const SmartTooltip: React.FC<SmartTooltipProps> = ({
  children,
  content,
  type = 'info',
  position = 'auto',
  showDelay = 500,
  hideDelay = 200,
  className
}) => {
  const [visible, setVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const icons = {
    help: <HelpCircle className="h-3 w-3" />,
    info: <Info className="h-3 w-3" />,
    tip: <Lightbulb className="h-3 w-3" />
  };

  const variants = {
    help: 'info',
    info: 'default',
    tip: 'warning'
  } as const;

  useEffect(() => {
    if (position === 'auto' && triggerRef.current && visible) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      let newPosition = 'top';
      
      if (rect.top < 100) {
        newPosition = 'bottom';
      } else if (rect.bottom > viewportHeight - 100) {
        newPosition = 'top';
      } else if (rect.left < 100) {
        newPosition = 'right';
      } else if (rect.right > viewportWidth - 100) {
        newPosition = 'left';
      }
      
      setActualPosition(newPosition as any);
    }
  }, [position, visible]);

  const handleShow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, showDelay);
  };

  const handleHide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      className={cn("inline-block", className)}
    >
      <EnhancedTooltip
        content={
          <div className="flex items-start gap-2 max-w-xs">
            <div className="flex-shrink-0 mt-0.5">
              {icons[type]}
            </div>
            <div className="text-sm">{content}</div>
          </div>
        }
        variant={variants[type]}
        side={actualPosition === 'auto' ? 'top' : actualPosition}
        delayDuration={0}
      >
        {children}
      </EnhancedTooltip>
    </div>
  );
};

// Quick help icon component
export const HelpIcon: React.FC<{ content: React.ReactNode; className?: string }> = ({
  content,
  className
}) => (
  <SmartTooltip content={content} type="help">
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center w-4 h-4 rounded-full",
        "text-muted-foreground hover:text-foreground transition-colors",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        className
      )}
      aria-label="Help"
    >
      <HelpCircle className="h-3 w-3" />
    </button>
  </SmartTooltip>
);
