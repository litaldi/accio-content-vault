
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Mail, MessageCircle, FileText, Shield, HelpCircle, Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const AppFooter: React.FC = () => {
  const { preferences } = useAccessibility();
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs', icon: FileText },
        { label: 'Updates', href: '/changelog' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact', icon: Mail },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'FAQ', href: '/faq' },
        { label: 'Community', href: '/community', icon: MessageCircle },
        { label: 'Status', href: 'https://status.accio.app', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' }
      ]
    }
  ];

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/accio', 
      icon: Github,
      'aria-label': 'Follow us on GitHub' 
    },
    { 
      label: 'Twitter', 
      href: 'https://twitter.com/accio', 
      icon: Twitter,
      'aria-label': 'Follow us on Twitter' 
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/company/accio', 
      icon: Linkedin,
      'aria-label': 'Connect with us on LinkedIn' 
    }
  ];

  return (
    <footer 
      className={cn(
        "w-full border-t bg-background/95 backdrop-blur-sm mt-auto",
        preferences.highContrast && 'border-foreground'
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-1 w-fit",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
                aria-label="Accio - Go to homepage"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-xs text-muted-foreground leading-none">Knowledge Library</span>
                </div>
              </Link>
              
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your personal knowledge management system. Save, organize, and find your content effortlessly.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label={social['aria-label']}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                          )}
                        >
                          {link.icon && <link.icon className="h-3 w-3" aria-hidden="true" />}
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className={cn(
                            "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                          )}
                        >
                          {link.icon && <link.icon className="h-3 w-3" aria-hidden="true" />}
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {currentYear} Accio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link 
              to="/privacy" 
              className={cn(
                "hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              )}
            >
              Privacy
            </Link>
            <span aria-hidden="true">•</span>
            <Link 
              to="/terms" 
              className={cn(
                "hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              )}
            >
              Terms
            </Link>
            <span aria-hidden="true">•</span>
            <Link 
              to="/cookies" 
              className={cn(
                "hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              )}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
