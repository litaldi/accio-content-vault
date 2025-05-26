
import { SavedContent } from '@/types';

export const mockContents: SavedContent[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    description: 'A comprehensive guide to understanding and using React Hooks in modern applications.',
    content_type: 'url',
    url: 'https://example.com/react-hooks',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [
      { id: '1', name: 'React', confirmed: true, auto_generated: false },
      { id: '2', name: 'JavaScript', confirmed: true, auto_generated: false }
    ]
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    description: 'Essential TypeScript patterns and practices for building robust applications.',
    content_type: 'document',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [
      { id: '3', name: 'TypeScript', confirmed: true, auto_generated: false },
      { id: '4', name: 'Programming', confirmed: true, auto_generated: false }
    ]
  }
];
