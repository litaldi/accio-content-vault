
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Mail, Twitter, Github, Linkedin, Heart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const EnhancedUnifiedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/analytics', label: 'Analytics' }
  ];

  const resourceLinks = [
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
    { to: '/blog', label: 'Blog' },
    { href: 'https://lovable.dev', label: 'Built with Lovable', external: true }
  ];

  const toolkitLinks = [
    { href: 'https://mobbin.com', label: 'Mobbin', external: true },
    { href: 'https://webflow.com', label: 'Webflow', external: true },
    { href: 'https://lovable.dev', label: 'Lovable', external: true },
    { href: 'https://bolt.new', label: 'Bolt.new', external: true }
  ];

  const legalLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-background border-t" role="contentinfo">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:shadow-md transition-shadow">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="text-lg font-bold text-primary">Accio</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Your AI-powered knowledge library. Save anything, find everything, achieve more with intelligent content organization.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get productivity tips and feature updates.
              </p>
              <div className="flex gap-2 max-w-sm">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="text-sm"
                  aria-label="Email address for newsletter"
                />
                <Button size="sm" className="shrink-0">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to || link.href}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.to!} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Toolkit Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Toolkit</h3>
            <ul className="space-y-3">
              {toolkitLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. All rights reserved.</span>
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.to}>
                {index > 0 && <span>•</span>}
                <Link 
                  to={link.to} 
                  className="hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using</span>
            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Lovable
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedUnifiedFooter;
