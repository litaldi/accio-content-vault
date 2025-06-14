export interface SavedContent {
  id: string;
  user_id?: string;
  title: string;
  content?: string;
  description?: string;
  url?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  image_url?: string;
  tags: Tag[];
  created_at: string;
  updated_at?: string;
  content_type: 'article' | 'video' | 'document' | 'image' | 'link' | 'note';
  is_favorite?: boolean;
  reading_time?: number;
  author?: string;
  source?: string;
  has_summary?: boolean;
}

export interface SearchResult extends SavedContent {
  relevance_score?: number;
  highlight?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
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
  count?: number;
  color?: string;
  auto_generated?: boolean;
  confirmed?: boolean;
}

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onUploadComplete?: (fileDetails: { file_url: string; file_type: "image" | "pdf"; file_size: number; title: string; }) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  disabled?: boolean;
}

export interface TagEditorProps {
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  readOnly?: boolean;
  maxTags?: number;
  variant?: 'default' | 'compact';
}
