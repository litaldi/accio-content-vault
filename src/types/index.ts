export interface User {
  id: string;
  email?: string; // Make email optional to match Supabase User type
  created_at: string;
  subscription_tier?: "free" | "pro";
}

export interface SavedContent {
  id: string;
  user_id: string;
  url?: string;
  title: string;
  description: string;
  image_url?: string;
  file_url?: string;
  file_type?: "image" | "pdf";
  file_size?: number;
  created_at: string;
  tags: Tag[];
  embedding?: number[]; // Vector embedding for semantic search
  summary?: string; // AI-generated summary
  collection_ids?: string[]; // Collections this content belongs to
  has_summary?: boolean; // Whether content has AI summary available
}

export interface Tag {
  id: string;
  name: string;
  auto_generated: boolean;
  confirmed?: boolean;
}

export interface TagConfirmationProps {
  tag: Tag;
  onConfirm: (confirmed: boolean) => void;
  onClose: () => void;
}

export interface SearchStats {
  tag_id: string;
  tag_name: string;
  search_count: number;
}

export interface SearchResult {
  content: SavedContent;
  score?: number; // Relevance score for semantic search
}

export interface FileUploadProps {
  onUploadComplete: (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => void;
}

export interface TagEditorProps {
  tags: Tag[];
  onTagsChange: (newTags: Tag[]) => void;
  readOnly?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  content_ids: string[];
  created_at: string;
  parent_id?: string; // For nested collections
}
