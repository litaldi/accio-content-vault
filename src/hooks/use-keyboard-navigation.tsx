
import { useEffect, useState, useCallback } from 'react';

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  vertical?: boolean;
  horizontal?: boolean; 
  circular?: boolean;
  itemsLength: number;
  onNavigate?: (index: number) => void;
  initialIndex?: number;
  ariaActiveDescendant?: string;
}

/**
 * Hook to handle keyboard navigation in components like menus, lists, grids, etc.
 */
export function useKeyboardNavigation({
  enabled = true,
  vertical = true,
  horizontal = false,
  circular = true,
  itemsLength,
  onNavigate,
  initialIndex = -1,
  ariaActiveDescendant
}: UseKeyboardNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  // Generate proper ids for keyboard navigation
  const getItemId = useCallback((index: number): string => {
    if (!ariaActiveDescendant) return '';
    return `${ariaActiveDescendant}-item-${index}`;
  }, [ariaActiveDescendant]);
  
  const navigate = useCallback((nextIndex: number) => {
    let newIndex = nextIndex;
    
    if (circular) {
      // Wrap around to the beginning or end
      if (nextIndex < 0) {
        newIndex = itemsLength - 1;
      } else if (nextIndex >= itemsLength) {
        newIndex = 0;
      }
    } else {
      // Clamp to valid range
      newIndex = Math.max(0, Math.min(itemsLength - 1, nextIndex));
    }
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < itemsLength) {
      setActiveIndex(newIndex);
      onNavigate?.(newIndex);
    }
  }, [activeIndex, itemsLength, onNavigate, circular]);

  // Reset active index when items length changes
  useEffect(() => {
    if (activeIndex >= itemsLength) {
      setActiveIndex(itemsLength > 0 ? itemsLength - 1 : -1);
    }
  }, [itemsLength, activeIndex]);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let handled = false;

      switch (e.key) {
        case 'ArrowUp':
          if (vertical) {
            navigate(activeIndex - 1);
            handled = true;
          }
          break;
        case 'ArrowDown':
          if (vertical) {
            navigate(activeIndex + 1);
            handled = true;
          }
          break;
        case 'ArrowLeft':
          if (horizontal) {
            navigate(activeIndex - 1);
            handled = true;
          }
          break;
        case 'ArrowRight':
          if (horizontal) {
            navigate(activeIndex + 1);
            handled = true;
          }
          break;
        case 'Home':
          navigate(0);
          handled = true;
          break;
        case 'End':
          navigate(itemsLength - 1);
          handled = true;
          break;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, activeIndex, vertical, horizontal, navigate, itemsLength]);

  return {
    activeIndex,
    setActiveIndex: navigate,
    getItemId,
    ariaProps: ariaActiveDescendant ? {
      'aria-activedescendant': activeIndex >= 0 ? getItemId(activeIndex) : undefined,
      role: 'listbox'
    } : {}
  };
}
