
export interface ContentFeatures {
  isFavorited: boolean;
  isArchived: boolean;
  lastViewed?: string;
  viewCount: number;
}

export interface FilterOptions {
  tags: string[];
  isFavorited?: boolean;
  isArchived?: boolean;
  contentType?: 'url' | 'file' | 'note';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface RecentActivity {
  type: 'viewed' | 'saved' | 'favorited' | 'archived';
  contentId: string;
  timestamp: string;
}
