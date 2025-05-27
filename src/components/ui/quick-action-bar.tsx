
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Sparkles, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface QuickActionBarProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ 
  className, 
  variant = 'floating' 
}) => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Content',
      href: '/save',
      shortcut: 'Ctrl+N',
      color: 'primary',
    },
    {
      icon: Search,
      label: 'Search',
      href: '/search',
      shortcut: 'Ctrl+K',
      color: 'secondary',
    },
    {
      icon: Sparkles,
      label: 'Ask AI',
      href: '/ai-features',
      shortcut: 'Ctrl+J',
      color: 'secondary',
    },
  ];

  return (
    <div 
      className={cn(
        'flex items-center gap-2',
        variant === 'floating' && 'fixed bottom-6 right-6 z-40 bg-background/95 backdrop-blur-sm border rounded-lg p-2 shadow-lg md:hidden',
        variant === 'inline' && 'justify-center',
        className
      )}
      role="toolbar"
      aria-label="Quick actions"
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          asChild
          variant={action.color === 'primary' ? 'default' : 'outline'}
          size={variant === 'floating' ? 'icon' : 'sm'}
          className={cn(
            'transition-all duration-200 hover:scale-105',
            variant === 'floating' && 'h-12 w-12'
          )}
          aria-label={`${action.label} (${action.shortcut})`}
        >
          <Link to={action.href}>
            <action.icon className={cn(
              variant === 'floating' ? 'h-5 w-5' : 'h-4 w-4',
              variant === 'inline' && 'mr-2'
            )} />
            {variant === 'inline' && <span>{action.label}</span>}
          </Link>
        </Button>
      ))}
    </div>
  );
};
