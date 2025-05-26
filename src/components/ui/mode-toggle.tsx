
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-9 w-9 rounded-lg transition-all duration-200",
            "hover:bg-accent/50 hover:scale-105 active:scale-100",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "dark:hover:bg-accent/30"
          )}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={cn(
          "bg-background border shadow-lg backdrop-blur-xl min-w-[120px]",
          "dark:bg-background/95 dark:border-border/40"
        )}
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'light' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'dark' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'system' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
