
import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tag } from '@/types';

interface TagConfirmationProps {
  tag: Tag;
  isOpen: boolean;
  onConfirm: (confirmed: boolean) => void;
  onClose: () => void;
}

const TagConfirmation: React.FC<TagConfirmationProps> = ({
  tag,
  isOpen,
  onConfirm,
  onClose,
}) => {
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      // Focus the "No" button by default to prevent accidental confirmation
      setTimeout(() => {
        if (noButtonRef.current) {
          noButtonRef.current.focus();
        }
      }, 100);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  const handleConfirm = (confirmed: boolean) => {
    onConfirm(confirmed);
    onClose();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`sm:max-w-[425px] transition-all duration-300 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Confirm Tag Accuracy</DialogTitle>
          <DialogDescription>
            Does this tag accurately describe the content you just saved?
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 flex items-center justify-center">
          <span 
            className="text-xl font-medium px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
            aria-live="polite"
          >
            {tag.name}
          </span>
        </div>
        <DialogFooter className="flex sm:justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleConfirm(false)}
            ref={noButtonRef}
            className="hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            No, it's not accurate
          </Button>
          <Button 
            onClick={() => handleConfirm(true)}
            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Yes, it's accurate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagConfirmation;
