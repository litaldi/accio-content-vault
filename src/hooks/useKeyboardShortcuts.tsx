
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 's',
      ctrlKey: true,
      action: () => navigate('/save'),
      description: 'Save new content'
    },
    {
      key: 'd',
      ctrlKey: true,
      action: () => navigate('/dashboard'),
      description: 'Go to dashboard'
    },
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        } else {
          toast({
            title: "Search not available",
            description: "No search box found on this page",
          });
        }
      },
      description: 'Focus search'
    },
    {
      key: '/',
      action: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: 'Focus search (alternative)'
    },
    {
      key: 'h',
      ctrlKey: true,
      action: () => navigate('/'),
      description: 'Go to home'
    },
    {
      key: '?',
      shiftKey: true,
      action: () => {
        toast({
          title: "Keyboard Shortcuts",
          description: "Ctrl+S: Save content, Ctrl+D: Dashboard, Ctrl+K: Search, Ctrl+H: Home",
          duration: 5000
        });
      },
      description: 'Show keyboard shortcuts'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        // Only allow certain shortcuts when in input fields
        if (!(event.key === 'Escape' || (event.ctrlKey && ['s', 'd', 'h'].includes(event.key)))) {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.altKey === !!shortcut.altKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.metaKey === !!shortcut.metaKey
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, toast]);

  return { shortcuts };
};
