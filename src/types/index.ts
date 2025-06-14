
export interface SavedContent {
  id: string;
  title: string;
  content?: string;
  description?: string;
  url?: string;
  tags?: string[];
  created_at: string;
  updated_at?: string;
  content_type?: 'article' | 'video' | 'document' | 'image' | 'link' | 'note';
  is_favorite?: boolean;
  reading_time?: number;
  author?: string;
  source?: string;
}

export interface SearchResult extends SavedContent {
  relevance_score?: number;
  highlight?: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  items_count: number;
  is_public?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  color?: string;
}
