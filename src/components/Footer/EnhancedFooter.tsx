
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, FileText, Shield, HelpCircle, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Security', href: '/security' },
        { label: 'Integrations', href: '/#integrations' },
        { label: 'API', href: '/api' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'FAQ', href: '/faq', icon: MessageCircle },
        { label: 'Documentation', href: '/docs', icon: FileText },
        { label: 'Blog', href: '/blog' },
        { label: 'Community', href: '/community' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/help#contact', icon: Mail },
        { label: 'Press Kit', href: '/press' },
        { label: 'Brand Guidelines', href: '/brand' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Data Processing', href: '/data' },
        { label: 'GDPR', href: '/gdpr' }
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
        "border-border/40 dark:border-border/20"
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border/40">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on new features, productivity tips, and knowledge management insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
                aria-label="Email address for newsletter"
              />
              <Button className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No spam. Unsubscribe anytime. Privacy policy applies.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-1 w-fit",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
                aria-label="Accio - Go to homepage"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm",
                  "bg-gradient-to-br from-primary to-primary/80"
                )}>
                  <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">A</span>
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-xl font-bold leading-none",
                    "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                  )}>
                    Accio
                  </span>
                  <span className="text-xs text-muted-foreground leading-none">Knowledge Engine</span>
                </div>
              </Link>
              
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Transform scattered information into an intelligent knowledge engine. 
                Save anything, find everything, achieve more with AI-powered organization.
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
                      "p-2 rounded-lg transition-all duration-200",
                      "text-muted-foreground hover:text-foreground hover:bg-accent/50",
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
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
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
                            "inline-flex items-center gap-2 text-sm transition-colors duration-200",
                            "text-muted-foreground hover:text-foreground",
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
                            "inline-flex items-center gap-2 text-sm transition-colors duration-200",
                            "text-muted-foreground hover:text-foreground",
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
        <div className={cn(
          "border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4",
          "border-border/40"
        )}>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground">
            <p>© {currentYear} Accio. All rights reserved.</p>
            <div className="flex items-center gap-3">
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
          
          <div className="text-xs text-muted-foreground">
            Made with ❤️ for knowledge workers everywhere
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
