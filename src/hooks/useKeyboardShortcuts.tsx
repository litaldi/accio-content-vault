
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if Cmd (Mac) or Ctrl (Windows/Linux) is pressed
      if (!(event.metaKey || event.ctrlKey)) return;

      // Don't trigger if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 's':
          event.preventDefault();
          navigate('/save?type=url');
          toast({
            title: "Quick Save",
            description: "Ready to save a webpage",
          });
          break;
        case 'u':
          event.preventDefault();
          navigate('/save?type=file');
          toast({
            title: "Upload File",
            description: "Ready to upload documents",
          });
          break;
        case 'n':
          event.preventDefault();
          navigate('/save?type=note');
          toast({
            title: "New Note",
            description: "Ready to create a note",
          });
          break;
        case 'k':
          event.preventDefault();
          // Focus search bar if it exists
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            toast({
              title: "Search",
              description: "Search bar focused",
            });
          }
          break;
        case '/':
          event.preventDefault();
          // Also focus search as alternative
          const searchInputAlt = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
          if (searchInputAlt) {
            searchInputAlt.focus();
          }
          break;
        case 'h':
          event.preventDefault();
          navigate('/');
          break;
        case 'd':
          event.preventDefault();
          navigate('/dashboard');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, toast]);

  // Return available shortcuts for help text
  const shortcuts = {
    'Cmd/Ctrl + S': 'Save webpage',
    'Cmd/Ctrl + U': 'Upload file',
    'Cmd/Ctrl + N': 'New note',
    'Cmd/Ctrl + K': 'Search',
    'Cmd/Ctrl + H': 'Home',
    'Cmd/Ctrl + D': 'Dashboard'
  };

  return { shortcuts };
};
