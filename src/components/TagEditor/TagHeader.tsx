
import React from 'react';
import { Tag as TagIcon } from 'lucide-react';

interface TagHeaderProps {
  isCompact: boolean;
  readOnly: boolean;
  tagCount: number;
  maxTags?: number;
}

const TagHeader: React.FC<TagHeaderProps> = ({
  isCompact,
  readOnly,
  tagCount,
  maxTags
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <TagIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <h3 className={`font-medium ${isCompact ? 'text-sm' : 'text-base'}`}>
        Tags {!readOnly && maxTags ? `(${tagCount}/${maxTags})` : ''}
      </h3>
    </div>
  );
};

export default TagHeader;
