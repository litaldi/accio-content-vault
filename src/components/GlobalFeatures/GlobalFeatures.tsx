
import React, { useState } from 'react';
import { QuickCaptureWidget } from '@/components/QuickCapture/QuickCaptureWidget';
import { KeyboardShortcutsPanel } from '@/components/KeyboardShortcuts/KeyboardShortcutsPanel';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const GlobalFeatures: React.FC = () => {
  const [showQuickCapture, setShowQuickCapture] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useKeyboardShortcuts({
    onOpenQuickCapture: () => setShowQuickCapture(true),
    onOpenShortcuts: () => setShowShortcuts(true),
    onFocusSearch: () => {
      // Focus search input if available
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
  });

  return (
    <>
      <QuickCaptureWidget />
      <KeyboardShortcutsPanel 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </>
  );
};

export default GlobalFeatures;
