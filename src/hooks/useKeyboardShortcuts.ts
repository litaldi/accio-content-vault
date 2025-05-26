
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseKeyboardShortcutsProps {
  onOpenQuickCapture?: () => void;
  onOpenShortcuts?: () => void;
  onToggleSidebar?: () => void;
  onFocusSearch?: () => void;
}

export const useKeyboardShortcuts = ({
  onOpenQuickCapture,
  onOpenShortcuts,
  onToggleSidebar,
  onFocusSearch,
}: UseKeyboardShortcutsProps = {}) => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore shortcuts when typing in inputs
    if (e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).contentEditable === 'true') {
      return;
    }

    // Handle single key shortcuts
    switch (e.key) {
      case '?':
        e.preventDefault();
        onOpenShortcuts?.();
        break;
        
      case '/':
        e.preventDefault();
        onFocusSearch?.();
        break;
        
      case 'n':
        e.preventDefault();
        onOpenQuickCapture?.();
        break;
        
      case 'r':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          window.location.reload();
        }
        break;
    }

    // Handle Ctrl/Cmd combinations
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '/':
          e.preventDefault();
          onToggleSidebar?.();
          break;
          
        case 'k':
          e.preventDefault();
          // Command palette would go here
          console.log('Command palette shortcut triggered');
          break;
      }
      
      // Handle Ctrl+Shift combinations
      if (e.shiftKey) {
        switch (e.key) {
          case 'C':
            e.preventDefault();
            onOpenQuickCapture?.();
            break;
        }
      }
    }

    // Handle 'g' key sequences for navigation
    if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      
      // Set up a temporary listener for the next key
      const handleNextKey = (nextE: KeyboardEvent) => {
        nextE.preventDefault();
        document.removeEventListener('keydown', handleNextKey);
        
        switch (nextE.key) {
          case 'd':
            navigate('/dashboard');
            break;
          case 's':
            navigate('/search');
            break;
          case 'c':
            navigate('/collections');
            break;
          case 'a':
            navigate('/analytics');
            break;
          case 'h':
            navigate('/');
            break;
        }
      };
      
      document.addEventListener('keydown', handleNextKey);
      
      // Clean up if no second key is pressed within 2 seconds
      setTimeout(() => {
        document.removeEventListener('keydown', handleNextKey);
      }, 2000);
    }
  }, [navigate, onOpenQuickCapture, onOpenShortcuts, onToggleSidebar, onFocusSearch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
