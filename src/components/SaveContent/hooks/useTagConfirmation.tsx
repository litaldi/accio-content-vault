
import { useState } from 'react';
import { Tag } from '@/types';
import { aiTaggingService } from '@/services/aiTaggingService';

export const useTagConfirmation = () => {
  const [suggestedTag, setSuggestedTag] = useState<Tag | null>(null);
  const [showTagConfirmation, setShowTagConfirmation] = useState(false);

  const processSuggestedTags = async (tags: Tag[]) => {
    if (tags.length > 0) {
      setSuggestedTag(tags[0]);
      setShowTagConfirmation(true);
      return true;
    }
    return false;
  };

  const recordTagFeedback = async (tagId: string, confirmed: boolean) => {
    await aiTaggingService.recordTagFeedback(
      tagId,
      confirmed ? 'accepted' : 'rejected'
    );
  };

  const resetTagConfirmation = () => {
    setSuggestedTag(null);
    setShowTagConfirmation(false);
  };

  return {
    suggestedTag,
    showTagConfirmation,
    setShowTagConfirmation,
    processSuggestedTags,
    recordTagFeedback,
    resetTagConfirmation
  };
};
