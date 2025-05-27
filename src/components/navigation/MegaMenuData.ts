
import { 
  LayoutDashboard, 
  Bookmark, 
  FolderOpen, 
  Brain, 
  PlusCircle,
  User, 
  Settings, 
  Activity,
  BookOpen,
  GraduationCap,
  FileText,
  Eye,
  MessageCircle,
  MessageSquare,
  FileCheck,
  Shield,
  Sparkles,
  Home
} from 'lucide-react';

export interface MegaMenuItem {
  title: string;
  href: string;
  icon: any;
  description: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export const megaMenuData: MegaMenuSection[] = [
  {
    title: "Product",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Your personalized command center"
      },
      {
        title: "Saved Content",
        href: "/saved",
        icon: Bookmark,
        description: "Access your saved articles and resources"
      },
      {
        title: "Collections",
        href: "/collections",
        icon: FolderOpen,
        description: "Organize content into themed collections"
      },
      {
        title: "AI Assistant",
        href: "/ai-features",
        icon: Brain,
        description: "Intelligent knowledge management tools"
      },
      {
        title: "Quick Capture",
        href: "/save",
        icon: PlusCircle,
        description: "Instantly save content from anywhere"
      }
    ]
  },
  {
    title: "My Account",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: User,
        description: "Manage your account and preferences"
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Customize your experience"
      },
      {
        title: "Activity Log",
        href: "/activity",
        icon: Activity,
        description: "Track your learning journey"
      }
    ]
  },
  {
    title: "Learn & Resources",
    items: [
      {
        title: "Help Center",
        href: "/help",
        icon: BookOpen,
        description: "Find answers and get support"
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        icon: GraduationCap,
        description: "Learn how to use Accio effectively"
      },
      {
        title: "Blog",
        href: "/blog",
        icon: FileText,
        description: "Latest insights and tips"
      },
      {
        title: "Accessibility Guide",
        href: "/accessibility",
        icon: Eye,
        description: "Making Accio accessible for everyone"
      }
    ]
  },
  {
    title: "Support & Legal",
    items: [
      {
        title: "Contact Us",
        href: "/contact",
        icon: MessageCircle,
        description: "Get in touch with our team"
      },
      {
        title: "Feedback",
        href: "/feedback",
        icon: MessageSquare,
        description: "Share your thoughts and suggestions"
      },
      {
        title: "Terms of Service",
        href: "/terms",
        icon: FileCheck,
        description: "Our terms and conditions"
      },
      {
        title: "Privacy Policy",
        href: "/privacy",
        icon: Shield,
        description: "How we protect your data"
      }
    ]
  }
];

export const quickAccessItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage"
  }
];
