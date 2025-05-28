import { 
  Home, 
  Sparkles, 
  Brain, 
  DollarSign, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  Mail, 
  Info, 
  Shield, 
  FileText, 
  Eye, 
  LayoutDashboard, 
  Search, 
  Bookmark, 
  FolderOpen, 
  Activity, 
  User, 
  Settings,
  PlusCircle,
  MessageCircle,
  FileCheck,
  Zap
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Public navigation for non-authenticated users
export const publicNavigation: NavigationSection[] = [
  {
    title: "Product",
    items: [
      {
        title: "Features",
        href: "/features",
        description: "Discover all the powerful features",
        icon: Sparkles,
        isPopular: true
      },
      {
        title: "How It Works",
        href: "/how-it-works",
        description: "Learn how Accio transforms your workflow",
        icon: Brain,
        isNew: true
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "Simple, transparent pricing",
        icon: DollarSign
      }
    ]
  },
  {
    title: "Learn",
    items: [
      {
        title: "Blog",
        href: "/blog",
        description: "Latest insights and tips",
        icon: BookOpen
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions",
        icon: HelpCircle
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with us",
        icon: Mail
      }
    ]
  },
  {
    title: "Company",
    items: [
      {
        title: "About",
        href: "/about",
        description: "Learn about our mission",
        icon: Info
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Knowledge management insights",
        icon: BookOpen
      }
    ]
  },
  {
    title: "Legal",
    items: [
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        description: "How we protect your data",
        icon: Shield
      },
      {
        title: "Terms of Service",
        href: "/terms-of-service",
        description: "Terms and conditions",
        icon: FileText
      }
    ]
  }
];

// Authenticated user navigation
export const authenticatedNavigation: NavigationSection[] = [
  {
    title: "Workspace",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Your personalized command center",
        icon: LayoutDashboard,
        isPopular: true
      },
      {
        title: "Search",
        href: "/search",
        description: "Find your content instantly",
        icon: Search
      },
      {
        title: "Quick Capture",
        href: "/save",
        description: "Save content from anywhere",
        icon: PlusCircle,
        isNew: true
      }
    ]
  },
  {
    title: "Organization",
    items: [
      {
        title: "Saved Content",
        href: "/saved",
        description: "Access your saved items",
        icon: Bookmark
      },
      {
        title: "Collections",
        href: "/collections",
        description: "Organize into themed collections",
        icon: FolderOpen
      },
      {
        title: "Activity",
        href: "/activity",
        description: "Track your learning journey",
        icon: Activity
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/profile",
        description: "Manage your account",
        icon: User
      },
      {
        title: "Settings",
        href: "/settings",
        description: "Customize your experience",
        icon: Settings
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        title: "Help Center",
        href: "/help",
        description: "Find answers and get support",
        icon: HelpCircle
      },
      {
        title: "AI Features",
        href: "/ai-features",
        description: "Explore AI capabilities",
        icon: Brain
      }
    ]
  }
];

// Quick access items (always visible)
export const quickAccessItems = [
  {
    title: "Home",
    href: "/",
    description: "Return to homepage",
    icon: Home
  }
];
