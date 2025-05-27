
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Brain,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Accessibility,
  Type,
  Eye,
  Volume2,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

const EnhancedGlobalFooter = () => {
  const [accessibilityExpanded, setAccessibilityExpanded] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = size === 'large' ? '18px' : size === 'small' ? '14px' : '16px';
  };

  const handleHighContrast = (enabled: boolean) => {
    setHighContrast(enabled);
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'AI Features', href: '/ai-features' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Roadmap', href: '/roadmap', badge: 'New' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api', external: true },
        { label: 'Community', href: '/community' },
        { label: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers', badge: 'Hiring' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Partners', href: '/partners' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
        { label: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/accio', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/accio', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/accio', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@accio.dev', label: 'Email' }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-auto">
      {/* Accessibility Toolbar */}
      <div className="border-b bg-background/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAccessibilityExpanded(!accessibilityExpanded)}
              className="gap-2"
              aria-expanded={accessibilityExpanded}
              aria-controls="accessibility-tools"
            >
              <Accessibility className="h-4 w-4" />
              Accessibility Tools
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="gap-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </Button>
          </div>
          
          {accessibilityExpanded && (
            <div 
              id="accessibility-tools"
              className="mt-4 p-4 bg-background rounded-lg border space-y-4"
            >
              <h3 className="font-medium mb-3">Accessibility Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Label className="text-sm">Font Size</Label>
                  </div>
                  <div className="flex gap-1">
                    {['small', 'normal', 'large'].map((size) => (
                      <Button
                        key={size}
                        variant={fontSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFontSizeChange(size)}
                        className="text-xs h-7 w-7 p-0"
                        aria-label={`Set font size to ${size}`}
                      >
                        {size === 'small' ? 'A' : size === 'normal' ? 'A' : 'A'}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <Label className="text-sm">High Contrast</Label>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={handleHighContrast}
                    aria-label="Toggle high contrast mode"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label className="text-sm">Reduce Motion</Label>
                  </div>
                  <Switch
                    aria-label="Reduce motion and animations"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Transform scattered information into organized intelligence. 
              Your AI-powered knowledge management platform.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <nav className="space-y-3">
                {section.links.map((link) => (
                  <div key={link.label} className="flex items-center gap-2">
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {link.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 Accio. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for knowledge workers
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline" className="gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              All systems operational
            </Badge>
            <Link 
              to="/status" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Status Page
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add Label component if not available
const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <label className={className}>{children}</label>
);

export default EnhancedGlobalFooter;
