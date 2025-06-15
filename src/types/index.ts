
export interface SavedContent {
  id: string;
  title: string;
  description: string;
  url?: string;
  content_type?: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  user_id: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  items: SavedContent[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url?: string;
  relevanceScore: number;
  highlights: string[];
}

export interface SearchFilters {
  type?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  source?: string;
}
