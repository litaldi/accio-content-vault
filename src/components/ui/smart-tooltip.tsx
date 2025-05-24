
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info, AlertTriangle, HelpCircle } from 'lucide-react';

interface SmartTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
  type?: 'default' | 'info' | 'warning' | 'help';
  className?: string;
}

const SmartTooltip: React.FC<SmartTooltipProps> = ({
  children,
  content,
  side = 'top',
  delayDuration = 700,
  type = 'default',
  className
}) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="h-3 w-3 mr-1" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />;
      case 'help':
        return <HelpCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getVariantStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 text-yellow-900 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      default:
        return '';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className={cn(
            'max-w-xs text-sm',
            getVariantStyles(),
            className
          )}
        >
          <div className="flex items-start">
            {getIcon()}
            <div>{content}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SmartTooltip;
