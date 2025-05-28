
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Home, 
  Sparkles, 
  DollarSign, 
  HelpCircle, 
  Mail, 
  BookOpen,
  Info,
  Shield,
  FileText,
  GraduationCap,
  Eye,
  User,
  LogIn,
  Search,
  Bookmark,
  FolderOpen,
  Activity,
  Settings,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MegaMenuSection {
  title: string;
  links: {
    title: string;
    href: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const publicSections: MegaMenuSection[] = [
  {
    title: "Product",
    links: [
      {
        title: "Features",
        href: "/features",
        description: "Discover all the powerful features",
        icon: Sparkles
      },
      {
        title: "AI Features",
        href: "/ai-features", 
        description: "AI-powered knowledge management",
        icon: Brain
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
    title: "Resources",
    links: [
      {
        title: "Help Center",
        href: "/help",
        description: "Get help and support",
        icon: HelpCircle
      },
      {
        title: "Blog", 
        href: "/blog",
        description: "Latest news and insights",
        icon: BookOpen
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Learn how to use Accio",
        icon: GraduationCap
      }
    ]
  },
  {
    title: "Company",
    links: [
      {
        title: "About",
        href: "/about", 
        description: "Learn about our mission",
        icon: Info
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with us",
        icon: Mail
      },
      {
        title: "Accessibility",
        href: "/accessibility",
        description: "Our accessibility commitment",
        icon: Eye
      }
    ]
  },
  {
    title: "Legal",
    links: [
      {
        title: "Privacy Policy",
        href: "/privacy",
        description: "How we protect your data",
        icon: Shield
      },
      {
        title: "Terms of Service", 
        href: "/terms",
        description: "Terms and conditions",
        icon: FileText
      }
    ]
  }
];

const authenticatedSections: MegaMenuSection[] = [
  {
    title: "Workspace",
    links: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Your main workspace",
        icon: Home
      },
      {
        title: "Search",
        href: "/search", 
        description: "Find your content",
        icon: Search
      },
      {
        title: "Saved Content",
        href: "/saved",
        description: "Your saved items",
        icon: Bookmark
      }
    ]
  },
  {
    title: "Organization",
    links: [
      {
        title: "Collections",
        href: "/collections",
        description: "Organize your content",
        icon: FolderOpen
      },
      {
        title: "Activity",
        href: "/activity",
        description: "Recent activity",
        icon: Activity
      }
    ]
  },
  {
    title: "Account",
    links: [
      {
        title: "Profile",
        href: "/profile",
        description: "Manage your profile",
        icon: User
      },
      {
        title: "Settings",
        href: "/settings",
        description: "App preferences", 
        icon: Settings
      }
    ]
  }
];

export const MegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  const sections = user ? authenticatedSections : publicSections;

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleMouseEnter = (sectionTitle: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(sectionTitle);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav 
      className="bg-background border-b shadow-sm sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Accio - Home"
          >
            <Brain className="h-8 w-8" aria-hidden="true" />
            <span>Accio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 h-10 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  aria-expanded={activeDropdown === section.title}
                  aria-haspopup="true"
                  id={`menu-${section.title.toLowerCase()}`}
                >
                  {section.title}
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeDropdown === section.title && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </Button>

                {/* Dropdown Menu */}
                {activeDropdown === section.title && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-80 bg-popover border border-border rounded-lg shadow-lg p-4 animate-fade-in"
                    role="menu"
                    aria-labelledby={`menu-${section.title.toLowerCase()}`}
                  >
                    <div className="grid gap-3">
                      {section.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              isActiveLink(link.href) && "bg-accent text-accent-foreground"
                            )}
                            role="menuitem"
                          >
                            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div>
                              <div className="font-medium text-sm">{link.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {link.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Welcome back!
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <div key={section.title} className="py-2">
                  <div className="text-sm font-semibold text-muted-foreground px-3 py-2">
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                            isActiveLink(link.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <div>
                            <div className="font-medium">{link.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Welcome back!
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
