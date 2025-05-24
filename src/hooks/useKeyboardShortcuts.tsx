
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const showShortcutsHelp = useCallback(() => {
    toast({
      title: "Keyboard Shortcuts",
      description: (
        <div className="text-sm space-y-1">
          <div><kbd className="bg-muted px-1 rounded">Ctrl+K</kbd> - Quick search</div>
          <div><kbd className="bg-muted px-1 rounded">Ctrl+N</kbd> - Save new content</div>
          <div><kbd className="bg-muted px-1 rounded">Ctrl+D</kbd> - Go to dashboard</div>
          <div><kbd className="bg-muted px-1 rounded">Ctrl+/</kbd> - Show this help</div>
          <div><kbd className="bg-muted px-1 rounded">Escape</kbd> - Close dialogs</div>
        </div>
      ),
      duration: 8000,
    });
  }, [toast]);

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Quick search'
    },
    {
      key: 'n',
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
      key: '/',
      ctrlKey: true,
      action: showShortcutsHelp,
      description: 'Show keyboard shortcuts'
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open dialogs or modals
        const closeButtons = document.querySelectorAll('[data-dialog-close], [aria-label="Close"]');
        const lastCloseButton = closeButtons[closeButtons.length - 1] as HTMLElement;
        if (lastCloseButton) {
          lastCloseButton.click();
        }
      },
      description: 'Close dialogs'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.isContentEditable
      ) {
        // Exception: allow Ctrl+K for search even in input fields
        if (!(event.key === 'k' && event.ctrlKey)) {
          return;
        }
      }

      const matchingShortcut = shortcuts.find(shortcut => {
        return (
          shortcut.key.toLowerCase() === event.key.toLowerCase() &&
          !!shortcut.ctrlKey === event.ctrlKey &&
          !!shortcut.altKey === event.altKey &&
          !!shortcut.shiftKey === event.shiftKey
        );
      });

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showShortcutsHelp]);

  return { shortcuts, showShortcutsHelp };
};
