
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
    name: 'React Development',
    description: 'Best practices and tutorials for React development',
    itemCount: 8,
    color: 'bg-blue-500',
    createdDate: '2024-01-10',
    isPrivate: false
  },
  {
    id: '2',
    name: 'Design Systems',
    description: 'Articles and resources about design systems and UI/UX',
    itemCount: 5,
    color: 'bg-purple-500',
    createdDate: '2024-01-15',
    isPrivate: false
  },
  {
    id: '3',
    name: 'TypeScript Guides',
    description: 'Comprehensive TypeScript learning materials',
    itemCount: 6,
    color: 'bg-green-500',
    createdDate: '2024-01-20',
    isPrivate: false
  },
  {
    id: '4',
    name: 'Personal Research',
    description: 'Private collection for personal projects',
    itemCount: 3,
    color: 'bg-red-500',
    createdDate: '2024-01-25',
    isPrivate: true
  }
];

export const demoSavedItems: SavedItem[] = [
  {
    id: '1',
    title: 'React Server Components: A Complete Guide',
    description: 'Learn everything about React Server Components, their benefits, and how to implement them in your applications.',
    url: 'https://example.com/react-server-components',
    type: 'article',
    tags: ['React', 'Server Components', 'Next.js', 'Performance'],
    collection: 'React Development',
    savedDate: '2024-01-20',
    readTime: '12 min read',
    favorite: true,
    readStatus: 'completed'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for 2024',
    description: 'Updated best practices for TypeScript development including new features and patterns.',
    url: 'https://example.com/typescript-2024',
    type: 'article',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Development'],
    collection: 'TypeScript Guides',
    savedDate: '2024-01-18',
    readTime: '8 min read',
    favorite: false,
    readStatus: 'reading'
  },
  {
    id: '3',
    title: 'Design System Implementation Guide',
    description: 'A comprehensive guide to building and maintaining design systems at scale.',
    url: 'https://example.com/design-systems',
    type: 'document',
    tags: ['Design Systems', 'UI/UX', 'Component Library', 'Figma'],
    collection: 'Design Systems',
    savedDate: '2024-01-16',
    readTime: '15 min read',
    favorite: true,
    readStatus: 'unread'
  },
  {
    id: '4',
    title: 'Advanced React Hooks Patterns',
    description: 'Explore advanced patterns for React Hooks including custom hooks and optimization techniques.',
    url: 'https://example.com/react-hooks-advanced',
    type: 'video',
    tags: ['React', 'Hooks', 'Advanced', 'Performance'],
    collection: 'React Development',
    savedDate: '2024-01-14',
    readTime: '45 min watch',
    favorite: false,
    readStatus: 'unread'
  },
  {
    id: '5',
    title: 'Web Accessibility Guidelines WCAG 2.2',
    description: 'Complete guide to implementing WCAG 2.2 accessibility guidelines in modern web applications.',
    type: 'pdf',
    tags: ['Accessibility', 'WCAG', 'Web Standards', 'Inclusive Design'],
    savedDate: '2024-01-12',
    readTime: '25 min read',
    favorite: true,
    readStatus: 'reading'
  },
  {
    id: '6',
    title: 'CSS Grid Layout Masterclass',
    description: 'Master CSS Grid with practical examples and real-world layout patterns.',
    url: 'https://example.com/css-grid-masterclass',
    type: 'video',
    tags: ['CSS', 'Grid Layout', 'Responsive Design', 'Frontend'],
    savedDate: '2024-01-10',
    readTime: '60 min watch',
    favorite: false,
    readStatus: 'unread'
  },
  {
    id: '7',
    title: 'Node.js Performance Optimization',
    description: 'Techniques and tools for optimizing Node.js application performance.',
    url: 'https://example.com/nodejs-performance',
    type: 'article',
    tags: ['Node.js', 'Performance', 'Backend', 'JavaScript'],
    savedDate: '2024-01-08',
    readTime: '10 min read',
    favorite: false,
    readStatus: 'completed'
  },
  {
    id: '8',
    title: 'Figma to Code Workflow',
    description: 'Streamline your design-to-development workflow with these Figma tips and tools.',
    url: 'https://example.com/figma-workflow',
    type: 'article',
    tags: ['Figma', 'Design', 'Workflow', 'Frontend'],
    collection: 'Design Systems',
    savedDate: '2024-01-06',
    readTime: '7 min read',
    favorite: true,
    readStatus: 'completed'
  }
];

export const demoAnalytics: AnalyticsData = {
  totalItems: 24,
  itemsThisWeek: 5,
  itemsThisMonth: 12,
  readingTime: '4.2h',
  topTags: [
    { name: 'React', count: 8 },
    { name: 'TypeScript', count: 6 },
    { name: 'Design', count: 5 },
    { name: 'Performance', count: 4 },
    { name: 'JavaScript', count: 4 }
  ],
  activityData: [
    { date: '2024-01-01', items: 1 },
    { date: '2024-01-02', items: 0 },
    { date: '2024-01-03', items: 2 },
    { date: '2024-01-04', items: 1 },
    { date: '2024-01-05', items: 3 },
    { date: '2024-01-06', items: 1 },
    { date: '2024-01-07', items: 2 }
  ],
  categoryBreakdown: [
    { category: 'Articles', count: 12, percentage: 50 },
    { category: 'Videos', count: 6, percentage: 25 },
    { category: 'Documents', count: 4, percentage: 17 },
    { category: 'PDFs', count: 2, percentage: 8 }
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
