
import { 
  Home,
  Zap,
  DollarSign,
  LayoutDashboard,
  Search,
  Bookmark,
  Settings,
  HelpCircle,
  Info,
  MessageCircle,
  Brain
} from 'lucide-react';

export const getNavigationItems = (user: any) => [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '/features', icon: Zap },
  { label: 'AI Features', href: '/ai-features', icon: Brain },
  { label: 'Pricing', href: '/pricing', icon: DollarSign },
  ...(user ? [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Saved', href: '/saved', icon: Bookmark },
    { label: 'Settings', href: '/settings', icon: Settings },
  ] : []),
  { label: 'Help', href: '/help', icon: HelpCircle },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
];
