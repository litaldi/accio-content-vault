
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tag } from '@/types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface TagConfirmationDialogProps {
  tag: Tag | null;
  isOpen: boolean;
  onConfirm: (tagId: string, isAccurate: boolean) => void;
  onClose: () => void;
}

export const TagConfirmationDialog: React.FC<TagConfirmationDialogProps> = ({
  tag,
  isOpen,
  onConfirm,
  onClose,
}) => {
  if (!tag) return null;

  const handleConfirm = (isAccurate: boolean) => {
    onConfirm(tag.id, isAccurate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="tag-confirmation-title" aria-describedby="tag-confirmation-description">
        <DialogHeader>
          <DialogTitle id="tag-confirmation-title">Is this tag accurate?</DialogTitle>
          <DialogDescription id="tag-confirmation-description">
            Please confirm if the AI-generated tag accurately describes the content you've saved.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <span className="text-xl font-medium px-4 py-2 bg-primary/10 rounded-full">
            {tag.name}
          </span>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleConfirm(false)}
            className="flex items-center gap-2"
            aria-label="This tag is not accurate"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Not Accurate</span>
          </Button>
          <Button 
            onClick={() => handleConfirm(true)}
            className="flex items-center gap-2"
            aria-label="This tag is accurate"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Accurate</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagConfirmationDialog;
