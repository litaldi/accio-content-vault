
import React from 'react';
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
  const handleConfirm = (confirmed: boolean) => {
    onConfirm(confirmed);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Tag</DialogTitle>
          <DialogDescription>
            Does this tag accurately describe the content?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex items-center justify-center">
          <span className="text-xl font-medium px-4 py-2 bg-accent/20 rounded-full">
            {tag.name}
          </span>
        </div>
        <DialogFooter className="flex sm:justify-center gap-4">
          <Button variant="outline" onClick={() => handleConfirm(false)}>
            No
          </Button>
          <Button onClick={() => handleConfirm(true)}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagConfirmation;
