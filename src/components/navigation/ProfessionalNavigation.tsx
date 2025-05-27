
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Search,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfessionalNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Help', href: '/help' },
  ];

  const productFeatures = [
    { 
      name: 'AI Knowledge Processing', 
      href: '/features#ai', 
      icon: Brain,
      description: 'Transform content with AI'
    },
    { 
      name: 'Smart Search', 
      href: '/features#search', 
      icon: Search,
      description: 'Find anything instantly'
    },
    { 
      name: 'Collections', 
      href: '/features#collections', 
      icon: BookOpen,
      description: 'Organize your knowledge'
    },
    { 
      name: 'Analytics', 
      href: '/features#analytics', 
      icon: TrendingUp,
      description: 'Track your progress'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Brain className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl">Accio</span>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Product <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                {productFeatures.map((feature) => (
                  <DropdownMenuItem key={feature.name} asChild>
                    <Link to={feature.href} className="flex items-start gap-3 p-3 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ProfessionalNavigation;
