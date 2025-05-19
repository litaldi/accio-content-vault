
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
import { Badge } from '@/components/ui/badge';
import { CheckIcon, X } from 'lucide-react';

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
  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };
  
  const handleReject = () => {
    onConfirm(false);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Tag</DialogTitle>
          <DialogDescription>
            Our system has detected the following tag for your content. Is this tag relevant?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex justify-center">
          <Badge variant="outline" className="text-base px-4 py-2 border-2">
            {tag.name}
          </Badge>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <Button onClick={handleReject} variant="outline" className="sm:flex-1">
            <X className="mr-2 h-4 w-4" />
            Not Relevant
          </Button>
          <Button onClick={handleConfirm} className="sm:flex-1">
            <CheckIcon className="mr-2 h-4 w-4" />
            Confirm Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagConfirmation;
