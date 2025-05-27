
export interface DemoUser {
  email: string;
  password: string;
  role: 'admin' | 'user';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    joinDate: string;
  };
}

export interface SavedItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: 'article' | 'document' | 'video' | 'link' | 'pdf';
  tags: string[];
  collection?: string;
  savedDate: string;
  readTime?: string;
  thumbnail?: string;
  content?: string;
  favorite: boolean;
  readStatus: 'unread' | 'reading' | 'completed';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  color: string;
  createdDate: string;
  isPrivate: boolean;
}

export interface AnalyticsData {
  totalItems: number;
  itemsThisWeek: number;
  itemsThisMonth: number;
  readingTime: string;
  topTags: { name: string; count: number }[];
  activityData: { date: string; items: number }[];
  categoryBreakdown: { category: string; count: number; percentage: number }[];
}

export const demoUsers: DemoUser[] = [
  {
    email: 'demo@yourapp.com',
    password: 'Demo1234!',
    role: 'user',
    profile: {
      firstName: 'Demo',
      lastName: 'User',
      joinDate: '2024-01-01',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    email: 'admin@demo.com',
    password: 'Admin123!',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      joinDate: '2024-01-01',
    }
  },
  {
    email: 'user@demo.com',
    password: 'User123!',
    role: 'user',
    profile: {
      firstName: 'Demo',
      lastName: 'User',
      joinDate: '2024-01-15',
    }
  }
];

export const demoCollections: Collection[] = [
  {
    id: '1',
    name: 'AI & Technology',
    description: 'Latest developments in artificial intelligence and technology trends',
    itemCount: 12,
    color: 'bg-blue-500',
    createdDate: '2024-01-10',
    isPrivate: false
  },
  {
    id: '2',
    name: 'Design & UX',
    description: 'User experience design principles and creative inspiration',
    itemCount: 8,
    color: 'bg-purple-500',
    createdDate: '2024-01-15',
    isPrivate: false
  },
  {
    id: '3',
    name: 'Business Strategy',
    description: 'Strategic insights and business development resources',
    itemCount: 6,
    color: 'bg-green-500',
    createdDate: '2024-01-20',
    isPrivate: false
  },
  {
    id: '4',
    name: 'Personal Research',
    description: 'Private collection for personal projects and ideas',
    itemCount: 5,
    color: 'bg-orange-500',
    createdDate: '2024-01-25',
    isPrivate: true
  }
];

export const demoSavedItems: SavedItem[] = [
  {
    id: '1',
    title: 'The Future of AI in Knowledge Management',
    description: 'Comprehensive analysis of how artificial intelligence is revolutionizing the way we capture, organize, and retrieve information in professional environments.',
    url: 'https://example.com/ai-knowledge-management',
    type: 'article',
    tags: ['AI', 'Knowledge Management', 'Technology', 'Future Trends'],
    collection: 'AI & Technology',
    savedDate: '2024-01-25',
    readTime: '12 min read',
    favorite: true,
    readStatus: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Building Effective Design Systems at Scale',
    description: 'A practical guide to creating and maintaining design systems that can grow with your organization while ensuring consistency and efficiency.',
    url: 'https://example.com/design-systems-scale',
    type: 'article',
    tags: ['Design Systems', 'UX Design', 'Scalability', 'Team Collaboration'],
    collection: 'Design & UX',
    savedDate: '2024-01-24',
    readTime: '15 min read',
    favorite: false,
    readStatus: 'reading',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Strategic Planning in Uncertain Times',
    description: 'How successful companies adapt their strategic planning processes to navigate uncertainty and maintain competitive advantage.',
    url: 'https://example.com/strategic-planning-uncertainty',
    type: 'document',
    tags: ['Strategy', 'Business Planning', 'Leadership', 'Adaptability'],
    collection: 'Business Strategy',
    savedDate: '2024-01-23',
    readTime: '20 min read',
    favorite: true,
    readStatus: 'unread',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'Advanced Search Algorithms Explained',
    description: 'Deep dive into modern search algorithms including semantic search, vector databases, and AI-powered content discovery.',
    url: 'https://example.com/search-algorithms',
    type: 'video',
    tags: ['Search', 'Algorithms', 'AI', 'Technology'],
    collection: 'AI & Technology',
    savedDate: '2024-01-22',
    readTime: '45 min watch',
    favorite: false,
    readStatus: 'unread'
  },
  {
    id: '5',
    title: 'User Research Best Practices 2024',
    description: 'Updated methodologies and tools for conducting effective user research that drives product decisions.',
    type: 'pdf',
    tags: ['User Research', 'UX Design', 'Best Practices', 'Methodology'],
    collection: 'Design & UX',
    savedDate: '2024-01-21',
    readTime: '25 min read',
    favorite: true,
    readStatus: 'reading'
  },
  {
    id: '6',
    title: 'Building High-Performance Teams',
    description: 'Evidence-based strategies for creating and leading teams that consistently deliver exceptional results.',
    url: 'https://example.com/high-performance-teams',
    type: 'article',
    tags: ['Leadership', 'Team Building', 'Performance', 'Management'],
    collection: 'Business Strategy',
    savedDate: '2024-01-20',
    readTime: '18 min read',
    favorite: false,
    readStatus: 'completed'
  },
  {
    id: '7',
    title: 'Responsive Design Patterns for 2024',
    description: 'Modern approaches to responsive web design that work across all devices and screen sizes.',
    url: 'https://example.com/responsive-design-2024',
    type: 'article',
    tags: ['Web Design', 'Responsive Design', 'CSS', 'Frontend'],
    collection: 'Design & UX',
    savedDate: '2024-01-19',
    readTime: '10 min read',
    favorite: false,
    readStatus: 'unread'
  },
  {
    id: '8',
    title: 'Machine Learning for Content Classification',
    description: 'How to implement ML models for automatically categorizing and tagging content in knowledge management systems.',
    url: 'https://example.com/ml-content-classification',
    type: 'article',
    tags: ['Machine Learning', 'Content Classification', 'AI', 'Automation'],
    collection: 'AI & Technology',
    savedDate: '2024-01-18',
    readTime: '22 min read',
    favorite: true,
    readStatus: 'completed'
  },
  {
    id: '9',
    title: 'Innovation in Remote Work Culture',
    description: 'Personal insights and experiments in building effective remote work practices for creative teams.',
    type: 'document',
    tags: ['Remote Work', 'Innovation', 'Culture', 'Personal'],
    collection: 'Personal Research',
    savedDate: '2024-01-17',
    readTime: '30 min read',
    favorite: false,
    readStatus: 'reading'
  },
  {
    id: '10',
    title: 'Data-Driven Decision Making Framework',
    description: 'A systematic approach to incorporating data analytics into strategic business decisions.',
    url: 'https://example.com/data-driven-decisions',
    type: 'document',
    tags: ['Data Analytics', 'Decision Making', 'Strategy', 'Framework'],
    collection: 'Business Strategy',
    savedDate: '2024-01-16',
    readTime: '16 min read',
    favorite: true,
    readStatus: 'unread'
  }
];

export const demoAnalytics: AnalyticsData = {
  totalItems: 31,
  itemsThisWeek: 7,
  itemsThisMonth: 18,
  readingTime: '8.5h',
  topTags: [
    { name: 'AI', count: 12 },
    { name: 'Design', count: 8 },
    { name: 'Strategy', count: 6 },
    { name: 'Technology', count: 5 },
    { name: 'UX Design', count: 4 },
    { name: 'Leadership', count: 3 }
  ],
  activityData: [
    { date: '2024-01-19', items: 2 },
    { date: '2024-01-20', items: 1 },
    { date: '2024-01-21', items: 3 },
    { date: '2024-01-22', items: 1 },
    { date: '2024-01-23', items: 2 },
    { date: '2024-01-24', items: 1 },
    { date: '2024-01-25', items: 2 }
  ],
  categoryBreakdown: [
    { category: 'Articles', count: 18, percentage: 58 },
    { category: 'Documents', count: 8, percentage: 26 },
    { category: 'Videos', count: 3, percentage: 10 },
    { category: 'PDFs', count: 2, percentage: 6 }
  ]
};

// Demo content utility functions
export const getDemoUserByEmail = (email: string): DemoUser | undefined => {
  return demoUsers.find(user => user.email === email);
};

export const isDemoUser = (email: string): boolean => {
  return demoUsers.some(user => user.email === email);
};

export const getDemoDataForUser = (email: string) => {
  const user = getDemoUserByEmail(email);
  if (!user) return null;

  return {
    user,
    savedItems: demoSavedItems,
    collections: demoCollections,
    analytics: demoAnalytics
  };
};
