
import React from 'react';
import { Tag } from '@/types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Tag as TagIcon, ThumbsUp, ThumbsDown } from 'lucide-react';

interface TagConfirmationDialogProps {
  tag: Tag;
  onConfirm: (confirmed: boolean) => void;
  onClose: () => void;
}

const TagConfirmationDialog = ({ tag, onConfirm, onClose }: TagConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };

  const handleReject = () => {
    onConfirm(false);
    onClose();
  };

  return (
    <AlertDialog open={!!tag} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            Is this tag accurate?
          </AlertDialogTitle>
          <AlertDialogDescription>
            AI suggested the tag <span className="font-semibold">"{tag.name}"</span> for this content.
            Is this an accurate categorization?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleReject}>
            <span className="inline-flex items-center">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Not accurate
            </span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            <span className="inline-flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Yes, it's accurate
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TagConfirmationDialog;
