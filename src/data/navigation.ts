
import { 
  Home, 
  Star, 
  BookOpen, 
  MessageCircle, 
  LayoutDashboard, 
  Search, 
  FolderOpen, 
  BarChart3,
  HelpCircle,
  DollarSign,
  Users,
  FileText,
  Settings,
  User
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
  icon: any;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const publicNavigation: NavigationSection[] = [
  {
    title: 'Product',
    items: [
      {
        title: 'Features',
        href: '/features',
        description: 'Discover AI-powered knowledge management capabilities',
        icon: Star,
        isPopular: true
      },
      {
        title: 'How It Works',
        href: '/how-it-works',
        description: 'Learn how Accio transforms your information workflow',
        icon: BookOpen
      },
      {
        title: 'Pricing',
        href: '/pricing',
        description: 'Simple, transparent pricing for every team size',
        icon: DollarSign
      }
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Blog',
        href: '/blog',
        description: 'Latest insights on knowledge management and AI',
        icon: FileText,
        isNew: true
      },
      {
        title: 'Help Center',
        href: '/help',
        description: 'Get help and learn how to use Accio effectively',
        icon: HelpCircle
      },
      {
        title: 'Contact',
        href: '/contact',
        description: 'Get in touch with our team',
        icon: MessageCircle
      }
    ]
  }
];

export const authenticatedNavigation: NavigationSection[] = [
  {
    title: 'Workspace',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        description: 'Overview of your knowledge base and recent activity',
        icon: LayoutDashboard,
        isPopular: true
      },
      {
        title: 'Search',
        href: '/search',
        description: 'Find information across all your saved content',
        icon: Search
      },
      {
        title: 'Collections',
        href: '/collections',
        description: 'Organize your content into smart collections',
        icon: FolderOpen
      },
      {
        title: 'Analytics',
        href: '/analytics',
        description: 'Insights into your knowledge usage patterns',
        icon: BarChart3,
        isNew: true
      }
    ]
  },
  {
    title: 'Account',
    items: [
      {
        title: 'Profile',
        href: '/profile',
        description: 'Manage your account and preferences',
        icon: User
      },
      {
        title: 'Settings',
        href: '/settings',
        description: 'Configure your Accio experience',
        icon: Settings
      },
      {
        title: 'Help Center',
        href: '/help',
        description: 'Get help and learn how to use Accio effectively',
        icon: HelpCircle
      }
    ]
  }
];
