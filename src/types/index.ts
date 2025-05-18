
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface SavedContent {
  id: string;
  user_id: string;
  url: string;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
  tags: Tag[];
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
