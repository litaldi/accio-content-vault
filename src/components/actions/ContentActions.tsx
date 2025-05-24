
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Archive, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFavoritesService } from '@/services/favoritesService';
import { useArchiveService } from '@/services/archiveService';
import { cn } from '@/lib/utils';

interface ContentActionsProps {
  contentId: string;
  onView?: () => void;
  compact?: boolean;
}

export const ContentActions: React.FC<ContentActionsProps> = ({
  contentId,
  onView,
  compact = false,
}) => {
  const { toggleFavorite, isFavorited } = useFavoritesService();
  const { toggleArchive, isArchived } = useArchiveService();

  const favorited = isFavorited(contentId);
  const archived = isArchived(contentId);

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onView && (
            <DropdownMenuItem onClick={onView}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => toggleFavorite(contentId)}>
            <Heart className={cn("h-4 w-4 mr-2", favorited && "fill-red-500 text-red-500")} />
            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleArchive(contentId)}>
            <Archive className="h-4 w-4 mr-2" />
            {archived ? 'Restore' : 'Archive'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {onView && (
        <Button variant="ghost" size="sm" onClick={onView} className="h-8 px-2">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View content</span>
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleFavorite(contentId)}
        className={cn("h-8 px-2", favorited && "text-red-500")}
      >
        <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
        <span className="sr-only">
          {favorited ? 'Remove from favorites' : 'Add to favorites'}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleArchive(contentId)}
        className="h-8 px-2"
      >
        <Archive className="h-4 w-4" />
        <span className="sr-only">
          {archived ? 'Restore from archive' : 'Archive content'}
        </span>
      </Button>
    </div>
  );
};
