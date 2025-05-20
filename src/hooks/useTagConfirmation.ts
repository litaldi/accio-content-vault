import { useState } from 'react';
import { Tag } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export function useTagConfirmation() {
  const [tagToConfirm, setTagToConfirm] = useState<Tag | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { toast } = useToast();

  const trackTagConfirmation = async (tagId: string, isAccurate: boolean, userId?: string) => {
    try {
      // If Supabase is configured, we'll track this in the database
      if (supabase && userId) {
        const { error } = await supabase
          .from('tag_confirmations')
          .insert({
            tag_id: tagId,
            user_id: userId,
            is_accurate: isAccurate
          });
          
        if (error) throw error;
      } else {
        // Otherwise, we'll just log it for now (we could use localStorage as a fallback)
        console.log('Tag confirmation tracked:', { tagId, isAccurate });
      }
      
      toast({
        title: "Thank you for your feedback",
        description: "Your input helps us improve tag accuracy.",
      });
    } catch (error) {
      console.error('Error tracking tag confirmation:', error);
      toast({
        title: "Feedback recorded",
        description: "We couldn't save to the database, but noted your response.",
        variant: "default",
      });
    }
  };

  const confirmTag = (tag: Tag) => {
    setTagToConfirm(tag);
    setIsConfirmationOpen(true);
  };

  const handleTagConfirmation = (tagId: string, isAccurate: boolean) => {
    // Let's track the confirmation (even without a user ID for now)
    trackTagConfirmation(tagId, isAccurate);
    setIsConfirmationOpen(false);
    setTagToConfirm(null);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
    setTagToConfirm(null);
  };

  return {
    tagToConfirm,
    isConfirmationOpen,
    confirmTag,
    handleTagConfirmation,
    closeConfirmation
  };
}
