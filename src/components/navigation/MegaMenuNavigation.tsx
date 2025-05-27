
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Brain, 
  Sparkles, 
  MessageCircle, 
  FileText, 
  Mic, 
  Tag, 
  TrendingUp,
  BarChart3,
  Lightbulb,
  Target,
  BellRing,
  Edit3,
  MapPin,
  Zap,
  Search,
  BookOpen,
  PlusCircle,
  Settings,
  Home,
  Menu,
  X,
  ChevronDown,
  Eye,
  Focus,
  Users,
  Calendar,
  Clock,
  Archive,
  Share2,
  Download,
  Upload,
  Filter,
  Layout,
  Palette,
  Globe,
  Shield,
  Activity
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const MegaMenuNavigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActivePage = (path: string) => location.pathname === path;

  const megaMenuSections = {
    'AI Features': {
      description: 'Intelligent tools powered by advanced AI',
      items: [
        { title: 'Personal Knowledge Assistant', path: '/ai-features', icon: MessageCircle, description: 'Chat with your knowledge base' },
        { title: 'AI Writing Assistant', path: '/ai-features', icon: Edit3, description: 'Enhance and improve your writing' },
        { title: 'Content Summarizer', path: '/ai-features', icon: FileText, description: 'Generate intelligent summaries' },
        { title: 'Voice Search', path: '/ai-features', icon: Mic, description: 'Natural voice commands' },
        { title: 'Smart Tagging', path: '/ai-features', icon: Tag, description: 'Automatic content categorization' },
        { title: 'Learning Path Generator', path: '/ai-features', icon: Target, description: 'Personalized learning roadmaps' },
        { title: 'Content Analysis', path: '/ai-features', icon: BarChart3, description: 'Deep insights and patterns' },
        { title: 'Smart Notifications', path: '/ai-features', icon: BellRing, description: 'Intelligent alerts and reminders' },
        { title: 'AI Insights Widget', path: '/ai-features', icon: Brain, description: 'Real-time learning insights' },
        { title: 'Content Recommendations', path: '/ai-features', icon: TrendingUp, description: 'Discover relevant content' },
        { title: 'Reading Progress Tracker', path: '/ai-features', icon: BookOpen, description: 'Monitor learning journey' },
        { title: 'Knowledge Graph', path: '/ai-features', icon: MapPin, description: 'Visualize content connections' }
      ]
    },
    'Core Features': {
      description: 'Essential productivity and organization tools',
      items: [
        { title: 'Quick Note Capture', path: '/features', icon: PlusCircle, description: 'Instantly capture thoughts and ideas' },
        { title: 'Advanced Search', path: '/search', icon: Search, description: 'Find anything instantly' },
        { title: 'Save Content', path: '/save', icon: Download, description: 'Save articles, videos, and more' },
        { title: 'Content Library', path: '/features', icon: Archive, description: 'Organize your saved content' },
        { title: 'Collections', path: '/features', icon: Layout, description: 'Create themed content groups' },
        { title: 'Reading Mode', path: '/features', icon: Eye, description: 'Distraction-free reading' },
        { title: 'Focus Dashboard', path: '/features', icon: Focus, description: 'Minimize distractions' },
        { title: 'Collaborative Workspaces', path: '/features', icon: Users, description: 'Share and collaborate' }
      ]
    },
    'Analytics & Insights': {
      description: 'Track progress and discover patterns',
      items: [
        { title: 'Content Analytics', path: '/features', icon: Activity, description: 'Usage patterns and trends' },
        { title: 'Learning Analytics', path: '/features', icon: BarChart3, description: 'Track learning progress' },
        { title: 'Content Health Monitor', path: '/features', icon: Shield, description: 'Quality and freshness tracking' },
        { title: 'Productivity Insights', path: '/features', icon: Zap, description: 'Optimize your workflow' },
        { title: 'Knowledge Gaps', path: '/features', icon: Target, description: 'Identify learning opportunities' },
        { title: 'Time Tracking', path: '/features', icon: Clock, description: 'Monitor time spent learning' }
      ]
    },
    'Productivity Tools': {
      description: 'Enhance your workflow and efficiency',
      items: [
        { title: 'Content Scheduler', path: '/features', icon: Calendar, description: 'Schedule reading and reviews' },
        { title: 'Reminder System', path: '/features', icon: BellRing, description: 'Never miss important content' },
        { title: 'Export & Import', path: '/features', icon: Upload, description: 'Data portability tools' },
        { title: 'Share & Publish', path: '/features', icon: Share2, description: 'Share your knowledge' },
        { title: 'Custom Filters', path: '/features', icon: Filter, description: 'Advanced filtering options' },
        { title: 'Themes & Customization', path: '/features', icon: Palette, description: 'Personalize your experience' }
      ]
    }
  };

  const handleDropdownToggle = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-blue-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            Accio
          </Link>

          {/* Desktop Mega Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePage('/') ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              Home
            </Link>

            {Object.entries(megaMenuSections).map(([sectionName, section]) => (
              <div key={sectionName} className="relative group">
                <button
                  className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  onMouseEnter={() => setActiveDropdown(sectionName)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {sectionName}
                  <ChevronDown className="h-3 w-3" />
                  {sectionName === 'AI Features' && (
                    <Badge variant="secondary" className="ml-1">
                      <Sparkles className="h-2 w-2 mr-1" />
                      AI
                    </Badge>
                  )}
                </button>

                {activeDropdown === sectionName && (
                  <div
                    className="absolute top-full left-0 mt-1 w-96 bg-popover border rounded-lg shadow-lg p-6 z-50"
                    onMouseEnter={() => setActiveDropdown(sectionName)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{sectionName}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors group"
                          >
                            <div className="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-3 w-3 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/settings"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePage('/settings') ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              Settings
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t py-4 max-h-96 overflow-y-auto">
            <nav className="space-y-4">
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {Object.entries(megaMenuSections).map(([sectionName, section]) => (
                <div key={sectionName} className="space-y-2">
                  <button
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                    onClick={() => handleDropdownToggle(sectionName)}
                  >
                    <span className="flex items-center gap-2">
                      {sectionName}
                      {sectionName === 'AI Features' && (
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-2 w-2 mr-1" />
                          AI
                        </Badge>
                      )}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === sectionName ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === sectionName && (
                    <div className="pl-4 space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent/50 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/settings"
                className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>

              <div className="flex items-center gap-2 px-4 pt-4 border-t">
                <ThemeToggle />
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default MegaMenuNavigation;
