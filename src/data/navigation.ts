import { 
  Home, 
  Info, 
  Zap, 
  Cog, 
  BookOpen, 
  DollarSign, 
  HelpCircle, 
  Mail,
  User,
  Settings,
  BarChart3,
  FileText,
  Users,
  Shield,
  LogOut
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
        description: 'Discover AI-powered knowledge management tools',
        icon: Zap,
        isPopular: true
      },
      {
        title: 'How It Works',
        href: '/how-it-works',
        description: 'Learn how Accio transforms your workflow',
        icon: Cog
      },
      {
        title: 'Pricing',
        href: '/pricing',
        description: 'Simple, transparent pricing for everyone',
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
        description: 'Insights, tips, and knowledge management best practices',
        icon: BookOpen
      },
      {
        title: 'FAQ',
        href: '/faq',
        description: 'Frequently asked questions and answers',
        icon: HelpCircle
      },
      {
        title: 'About',
        href: '/about',
        description: 'Our mission, team, and company story',
        icon: Info
      }
    ]
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Contact',
        href: '/contact',
        description: 'Get in touch with our team',
        icon: Mail
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
        description: 'How we protect and handle your data',
        icon: Shield
      },
      {
        title: 'Terms of Service',
        href: '/terms-of-service',
        description: 'Legal terms and conditions',
        icon: FileText
      }
    ]
  }
];

export const authenticatedNavigation: NavigationSection[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Overview',
        href: '/dashboard',
        description: 'Your knowledge management dashboard',
        icon: Home,
        isPopular: true
      },
      {
        title: 'Analytics',
        href: '/analytics',
        description: 'Insights into your knowledge patterns',
        icon: BarChart3
      },
      {
        title: 'Collections',
        href: '/collections',
        description: 'Organize your saved content',
        icon: BookOpen
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
        title: 'Team',
        href: '/team',
        description: 'Collaborate with your team members',
        icon: Users
      }
    ]
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Help Center',
        href: '/help',
        description: 'Get help and find tutorials',
        icon: HelpCircle
      },
      {
        title: 'Contact Support',
        href: '/contact',
        description: 'Reach out to our support team',
        icon: Mail
      }
    ]
  }
];

// Quick access items for mobile menu
export const quickAccessItems = [
  {
    title: 'Sign Out',
    href: '/logout',
    icon: LogOut,
    action: 'logout'
  }
];
