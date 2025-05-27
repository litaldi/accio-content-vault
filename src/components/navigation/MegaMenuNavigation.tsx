
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
  Activity,
  CheckCircle2
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
      description: 'Cutting-edge AI tools for intelligent knowledge management',
      items: [
        { title: 'Personal Knowledge Assistant', path: '/ai-features', icon: MessageCircle, description: 'Chat with your knowledge base using natural language' },
        { title: 'AI Writing Assistant', path: '/ai-features', icon: Edit3, description: 'Enhance, improve, and optimize your writing with AI' },
        { title: 'AI Research Assistant', path: '/ai-features', icon: Search, description: 'Intelligent research and source discovery' },
        { title: 'Content Summarizer', path: '/ai-features', icon: FileText, description: 'Generate intelligent summaries and key insights' },
        { title: 'Voice Search Interface', path: '/ai-features', icon: Mic, description: 'Natural voice commands and search' },
        { title: 'Smart Tagging System', path: '/ai-features', icon: Tag, description: 'Automatic content categorization and organization' },
        { title: 'Learning Path Generator', path: '/ai-features', icon: Target, description: 'Personalized AI-generated learning roadmaps' },
        { title: 'Content Analysis Engine', path: '/ai-features', icon: BarChart3, description: 'Deep insights into knowledge patterns and gaps' },
        { title: 'Smart Notifications', path: '/ai-features', icon: BellRing, description: 'Intelligent alerts and learning reminders' },
        { title: 'AI Insights Widget', path: '/ai-features', icon: Brain, description: 'Real-time AI-powered learning insights' },
        { title: 'Knowledge Graph Visualizer', path: '/ai-features', icon: MapPin, description: 'Interactive visualization of knowledge connections' },
        { title: 'AI Study Buddy', path: '/ai-features', icon: Users, description: 'Collaborative learning with AI-powered social features' },
        { title: 'AI Habit Tracker', path: '/ai-features', icon: CheckCircle2, description: 'Smart habit formation with AI recommendations' },
        { title: 'AI Goal Tracker', path: '/ai-features', icon: Target, description: 'Intelligent goal setting and progress monitoring' },
        { title: 'Content Recommendations', path: '/ai-features', icon: TrendingUp, description: 'Discover relevant content based on your interests' },
        { title: 'Reading Progress Tracker', path: '/ai-features', icon: BookOpen, description: 'Monitor and optimize your learning journey' }
      ]
    },
    'Core Features': {
      description: 'Essential productivity and organization tools',
      items: [
        { title: 'Quick Note Capture', path: '/features', icon: PlusCircle, description: 'Instantly capture thoughts and ideas with smart templates' },
        { title: 'Advanced Search', path: '/search', icon: Search, description: 'Find anything instantly with powerful search filters' },
        { title: 'Save Content', path: '/save', icon: Download, description: 'Save articles, videos, and web content seamlessly' },
        { title: 'Content Library', path: '/features', icon: Archive, description: 'Organize and manage your saved content efficiently' },
        { title: 'Smart Collections', path: '/features', icon: Layout, description: 'Create themed content groups with AI assistance' },
        { title: 'Reading Mode', path: '/features', icon: Eye, description: 'Distraction-free reading experience' },
        { title: 'Focus Dashboard', path: '/features', icon: Focus, description: 'Minimize distractions and boost productivity' },
        { title: 'Collaborative Workspaces', path: '/features', icon: Users, description: 'Share knowledge and collaborate with teams' }
      ]
    },
    'Analytics & Insights': {
      description: 'Track progress and discover learning patterns',
      items: [
        { title: 'Learning Analytics', path: '/features', icon: Activity, description: 'Comprehensive analytics for learning progress' },
        { title: 'Content Health Monitor', path: '/features', icon: Shield, description: 'Track content quality and freshness' },
        { title: 'Productivity Insights', path: '/features', icon: Zap, description: 'Optimize your workflow with data-driven insights' },
        { title: 'Knowledge Gap Analysis', path: '/features', icon: Target, description: 'Identify and fill learning opportunities' },
        { title: 'Time Tracking', path: '/features', icon: Clock, description: 'Monitor time spent on learning activities' },
        { title: 'Progress Visualization', path: '/features', icon: BarChart3, description: 'Visual representations of your learning journey' }
      ]
    },
    'Productivity Tools': {
      description: 'Enhance your workflow and efficiency',
      items: [
        { title: 'Content Scheduler', path: '/features', icon: Calendar, description: 'Schedule reading sessions and reviews' },
        { title: 'Reminder System', path: '/features', icon: BellRing, description: 'Never miss important content or deadlines' },
        { title: 'Data Export & Import', path: '/features', icon: Upload, description: 'Complete data portability and backup tools' },
        { title: 'Share & Publish', path: '/features', icon: Share2, description: 'Share your knowledge with others' },
        { title: 'Advanced Filters', path: '/features', icon: Filter, description: 'Powerful filtering and search capabilities' },
        { title: 'Themes & Customization', path: '/features', icon: Palette, description: 'Personalize your learning environment' },
        { title: 'Offline Access', path: '/features', icon: Globe, description: 'Access your content without internet connection' }
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
                    <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
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
