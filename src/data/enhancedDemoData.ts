
export interface DemoUser {
  email: string;
  password: string;
  role: 'admin' | 'user';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    joinDate: string;
    preferences: {
      theme: 'light' | 'dark' | 'system';
      language: 'en' | 'he' | 'ar';
      notifications: boolean;
      accessibility: {
        fontSize: 'small' | 'medium' | 'large';
        highContrast: boolean;
        reducedMotion: boolean;
      };
    };
  };
}

export interface SavedItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: 'article' | 'document' | 'video' | 'link' | 'pdf' | 'image';
  tags: string[];
  collection?: string;
  savedDate: string;
  readTime?: string;
  thumbnail?: string;
  content?: string;
  favorite: boolean;
  readStatus: 'unread' | 'reading' | 'completed';
  summary?: string;
  wordCount?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  color: string;
  createdDate: string;
  isPrivate: boolean;
  tags: string[];
  lastAccessed: string;
}

export interface AnalyticsData {
  totalItems: number;
  itemsThisWeek: number;
  itemsThisMonth: number;
  readingTime: string;
  topTags: { name: string; count: number; trend: 'up' | 'down' | 'stable' }[];
  activityData: { date: string; items: number; readTime: number }[];
  categoryBreakdown: { category: string; count: number; percentage: number }[];
  weeklyProgress: { week: string; saved: number; read: number }[];
  readingStreak: number;
  favoriteTopics: string[];
}

export const enhancedDemoUsers: DemoUser[] = [
  {
    email: 'admin@demo.com',
    password: 'Admin123!',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      joinDate: '2024-01-01',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: true,
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
        },
      },
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
        },
      },
    }
  }
];

export const enhancedDemoCollections: Collection[] = [
  {
    id: '1',
    name: 'React Development',
    description: 'Modern React patterns, hooks, and best practices for building scalable applications',
    itemCount: 12,
    color: 'bg-blue-500',
    createdDate: '2024-01-10',
    isPrivate: false,
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
    lastAccessed: '2024-01-25'
  },
  {
    id: '2',
    name: 'Design Systems',
    description: 'Comprehensive resources on building and maintaining design systems at scale',
    itemCount: 8,
    color: 'bg-purple-500',
    createdDate: '2024-01-15',
    isPrivate: false,
    tags: ['Design', 'UI/UX', 'Components', 'Figma'],
    lastAccessed: '2024-01-24'
  },
  {
    id: '3',
    name: 'TypeScript Guides',
    description: 'Advanced TypeScript concepts and practical implementation strategies',
    itemCount: 10,
    color: 'bg-green-500',
    createdDate: '2024-01-20',
    isPrivate: false,
    tags: ['TypeScript', 'JavaScript', 'Types', 'Development'],
    lastAccessed: '2024-01-23'
  },
  {
    id: '4',
    name: 'AI & Machine Learning',
    description: 'Latest developments in AI, ML models, and practical applications',
    itemCount: 15,
    color: 'bg-orange-500',
    createdDate: '2024-01-22',
    isPrivate: false,
    tags: ['AI', 'Machine Learning', 'Python', 'Research'],
    lastAccessed: '2024-01-25'
  },
  {
    id: '5',
    name: 'Personal Research',
    description: 'Private collection for personal projects and confidential materials',
    itemCount: 5,
    color: 'bg-red-500',
    createdDate: '2024-01-25',
    isPrivate: true,
    tags: ['Personal', 'Research', 'Private'],
    lastAccessed: '2024-01-25'
  }
];

export const enhancedDemoSavedItems: SavedItem[] = [
  {
    id: '1',
    title: 'React Server Components: Complete Implementation Guide',
    description: 'Comprehensive guide to implementing React Server Components with Next.js 14, including streaming, caching strategies, and performance optimization.',
    url: 'https://example.com/react-server-components-guide',
    type: 'article',
    tags: ['React', 'Server Components', 'Next.js', 'Performance', 'Streaming'],
    collection: 'React Development',
    savedDate: '2024-01-25',
    readTime: '15 min read',
    favorite: true,
    readStatus: 'completed',
    summary: 'Detailed walkthrough of React Server Components implementation with practical examples.',
    wordCount: 3500,
    difficulty: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'TypeScript 5.3: New Features and Migration Guide',
    description: 'Exploring the latest TypeScript features including import attributes, switch true narrowing, and performance improvements.',
    url: 'https://example.com/typescript-5-3-features',
    type: 'article',
    tags: ['TypeScript', 'JavaScript', 'Migration', 'Features', 'Development'],
    collection: 'TypeScript Guides',
    savedDate: '2024-01-24',
    readTime: '12 min read',
    favorite: false,
    readStatus: 'reading',
    summary: 'Overview of TypeScript 5.3 new features with migration examples.',
    wordCount: 2800,
    difficulty: 'advanced'
  },
  {
    id: '3',
    title: 'Building Scalable Design Systems',
    description: 'A practical approach to creating design systems that grow with your organization, including token management and component documentation.',
    url: 'https://example.com/scalable-design-systems',
    type: 'document',
    tags: ['Design Systems', 'UI/UX', 'Figma', 'Component Library', 'Documentation'],
    collection: 'Design Systems',
    savedDate: '2024-01-23',
    readTime: '20 min read',
    favorite: true,
    readStatus: 'unread',
    summary: 'Comprehensive guide to building maintainable design systems.',
    wordCount: 4200,
    difficulty: 'intermediate'
  },
  {
    id: '4',
    title: 'Advanced React Hooks Patterns',
    description: 'Deep dive into custom hooks, useEffect optimization, and advanced state management patterns for complex React applications.',
    url: 'https://example.com/advanced-react-hooks',
    type: 'video',
    tags: ['React', 'Hooks', 'Performance', 'State Management', 'Patterns'],
    collection: 'React Development',
    savedDate: '2024-01-22',
    readTime: '45 min watch',
    favorite: false,
    readStatus: 'unread',
    difficulty: 'advanced'
  },
  {
    id: '5',
    title: 'Web Accessibility Guidelines WCAG 2.2 Implementation',
    description: 'Complete implementation guide for WCAG 2.2 standards including screen reader support, keyboard navigation, and color contrast requirements.',
    type: 'pdf',
    tags: ['Accessibility', 'WCAG', 'Web Standards', 'Inclusive Design', 'Compliance'],
    savedDate: '2024-01-21',
    readTime: '30 min read',
    favorite: true,
    readStatus: 'reading',
    summary: 'Practical WCAG 2.2 implementation with code examples.',
    wordCount: 5000,
    difficulty: 'intermediate'
  },
  {
    id: '6',
    title: 'Machine Learning for Web Developers',
    description: 'Introduction to ML concepts accessible to web developers, including TensorFlow.js, model integration, and practical applications.',
    url: 'https://example.com/ml-for-web-devs',
    type: 'article',
    tags: ['Machine Learning', 'TensorFlow.js', 'Web Development', 'AI', 'JavaScript'],
    collection: 'AI & Machine Learning',
    savedDate: '2024-01-20',
    readTime: '25 min read',
    favorite: false,
    readStatus: 'completed',
    difficulty: 'beginner'
  },
  {
    id: '7',
    title: 'CSS Grid Layout Masterclass 2024',
    description: 'Complete guide to CSS Grid including subgrid, container queries, and modern layout patterns for responsive design.',
    url: 'https://example.com/css-grid-2024',
    type: 'video',
    tags: ['CSS', 'Grid Layout', 'Responsive Design', 'Frontend', 'Modern CSS'],
    savedDate: '2024-01-19',
    readTime: '60 min watch',
    favorite: false,
    readStatus: 'unread',
    difficulty: 'intermediate'
  },
  {
    id: '8',
    title: 'Node.js Performance Optimization Techniques',
    description: 'Advanced techniques for optimizing Node.js applications including memory management, clustering, and profiling.',
    url: 'https://example.com/nodejs-performance',
    type: 'article',
    tags: ['Node.js', 'Performance', 'Backend', 'JavaScript', 'Optimization'],
    savedDate: '2024-01-18',
    readTime: '18 min read',
    favorite: false,
    readStatus: 'completed',
    difficulty: 'advanced'
  },
  {
    id: '9',
    title: 'Figma to Code Workflow Automation',
    description: 'Streamlining design-to-development workflow with Figma plugins, design tokens, and automated code generation.',
    url: 'https://example.com/figma-automation',
    type: 'article',
    tags: ['Figma', 'Design Tokens', 'Automation', 'Workflow', 'Frontend'],
    collection: 'Design Systems',
    savedDate: '2024-01-17',
    readTime: '14 min read',
    favorite: true,
    readStatus: 'completed',
    difficulty: 'intermediate'
  },
  {
    id: '10',
    title: 'API Security Best Practices 2024',
    description: 'Comprehensive guide to securing REST and GraphQL APIs including authentication, authorization, and threat prevention.',
    type: 'document',
    tags: ['API Security', 'Authentication', 'Backend', 'Security', 'Best Practices'],
    savedDate: '2024-01-16',
    readTime: '22 min read',
    favorite: false,
    readStatus: 'reading',
    difficulty: 'advanced'
  }
];

export const enhancedDemoAnalytics: AnalyticsData = {
  totalItems: 45,
  itemsThisWeek: 8,
  itemsThisMonth: 23,
  readingTime: '12.5h',
  readingStreak: 7,
  favoriteTopics: ['React', 'TypeScript', 'Design Systems', 'Performance'],
  topTags: [
    { name: 'React', count: 15, trend: 'up' },
    { name: 'TypeScript', count: 12, trend: 'up' },
    { name: 'Design Systems', count: 8, trend: 'stable' },
    { name: 'Performance', count: 7, trend: 'up' },
    { name: 'JavaScript', count: 6, trend: 'down' },
    { name: 'CSS', count: 5, trend: 'stable' }
  ],
  activityData: [
    { date: '2024-01-19', items: 2, readTime: 45 },
    { date: '2024-01-20', items: 1, readTime: 25 },
    { date: '2024-01-21', items: 3, readTime: 90 },
    { date: '2024-01-22', items: 1, readTime: 45 },
    { date: '2024-01-23', items: 2, readTime: 60 },
    { date: '2024-01-24', items: 1, readTime: 30 },
    { date: '2024-01-25', items: 2, readTime: 75 }
  ],
  categoryBreakdown: [
    { category: 'Articles', count: 25, percentage: 56 },
    { category: 'Videos', count: 12, percentage: 27 },
    { category: 'Documents', count: 6, percentage: 13 },
    { category: 'PDFs', count: 2, percentage: 4 }
  ],
  weeklyProgress: [
    { week: 'Week 1', saved: 12, read: 8 },
    { week: 'Week 2', saved: 15, read: 12 },
    { week: 'Week 3', saved: 10, read: 14 },
    { week: 'Week 4', saved: 8, read: 11 }
  ]
};

// Enhanced utility functions
export const getEnhancedDemoUserByEmail = (email: string): DemoUser | undefined => {
  return enhancedDemoUsers.find(user => user.email === email);
};

export const isEnhancedDemoUser = (email: string): boolean => {
  return enhancedDemoUsers.some(user => user.email === email);
};

export const getEnhancedDemoDataForUser = (email: string) => {
  const user = getEnhancedDemoUserByEmail(email);
  if (!user) return null;

  return {
    user,
    savedItems: enhancedDemoSavedItems,
    collections: enhancedDemoCollections,
    analytics: enhancedDemoAnalytics
  };
};

// Sample uploaded files data
export const demoUploadedFiles = [
  {
    id: 'file1',
    name: 'React_Best_Practices_2024.pdf',
    type: 'pdf',
    size: 2500000,
    url: '/demo-files/react-best-practices.pdf',
    uploadDate: '2024-01-20',
    tags: ['React', 'Best Practices', 'PDF']
  },
  {
    id: 'file2',
    name: 'Design_System_Mockups.png',
    type: 'image',
    size: 1200000,
    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    uploadDate: '2024-01-18',
    tags: ['Design', 'Mockups', 'Image']
  },
  {
    id: 'file3',
    name: 'API_Documentation.md',
    type: 'document',
    size: 45000,
    url: '/demo-files/api-docs.md',
    uploadDate: '2024-01-15',
    tags: ['API', 'Documentation', 'Markdown']
  }
];
