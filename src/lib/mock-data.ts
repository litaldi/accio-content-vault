
import { SavedContent, Tag } from '@/types';

// Mock content data
export const mockContents: SavedContent[] = [
  {
    id: '1',
    user_id: 'user123',
    url: 'https://example.com/article1',
    title: 'How to Build a React App',
    description: 'Learn the basics of React and build your first application with this step-by-step tutorial.',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070',
    created_at: new Date(2025, 4, 10).toISOString(),
    tags: [
      { id: 't1', name: 'react', auto_generated: true, confirmed: true },
      { id: 't2', name: 'javascript', auto_generated: true, confirmed: true },
      { id: 't3', name: 'tutorial', auto_generated: true, confirmed: false }
    ]
  },
  {
    id: '2',
    user_id: 'user123',
    url: 'https://example.com/article2',
    title: 'Job Interview Tips',
    description: 'Top 10 tips to prepare for your next tech job interview and stand out from other candidates.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2688',
    created_at: new Date(2025, 4, 15).toISOString(),
    tags: [
      { id: 't4', name: 'job', auto_generated: true, confirmed: true },
      { id: 't5', name: 'interview', auto_generated: true, confirmed: true },
      { id: 't6', name: 'career', auto_generated: true, confirmed: true }
    ]
  },
  {
    id: '3',
    user_id: 'user123',
    url: 'https://example.com/article3',
    title: 'Productivity Tools for Developers',
    description: 'A curated list of the best productivity tools that every developer should try in 2025.',
    created_at: new Date(2025, 4, 18).toISOString(),
    tags: [
      { id: 't7', name: 'productivity', auto_generated: true, confirmed: true },
      { id: 't8', name: 'tools', auto_generated: true, confirmed: true },
      { id: 't9', name: 'development', auto_generated: true, confirmed: true }
    ]
  },
  // Add a file example
  {
    id: '4',
    user_id: 'user123',
    title: 'Project Requirements.pdf',
    description: 'Project specifications and requirements document',
    file_url: 'https://example.com/files/requirements.pdf',
    file_type: 'pdf',
    file_size: 2500000,
    created_at: new Date(2025, 4, 19).toISOString(),
    tags: [
      { id: 't10', name: 'project', auto_generated: true, confirmed: true },
      { id: 't11', name: 'documentation', auto_generated: true, confirmed: true }
    ]
  }
];
