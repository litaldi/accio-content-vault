
import React from 'react';
import { Command } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchKeyboardShortcutProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SearchKeyboardShortcut: React.FC<SearchKeyboardShortcutProps> = ({
  size = 'md',
  className
}) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-mono border-border/60 bg-muted/40 transition-colors duration-200",
        size === 'sm' && "text-[10px] px-1 py-0.5",
        size === 'lg' && "text-sm px-2 py-1",
        className
      )}
    >
      <Command className="h-2.5 w-2.5 mr-1" />
      K
    </Badge>
  );
};
