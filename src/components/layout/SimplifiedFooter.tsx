
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { SocialMediaLinks } from '@/components/social/SocialMediaLinks';

const SimplifiedFooter = () => {
  const currentYear = new Date().getFullYear();

  const essentialLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-background border-t border-border mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          
          {/* Brand and social */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start gap-6 lg:gap-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">Accio</span>
              </Link>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Follow us for updates and tips</p>
              <SocialMediaLinks />
            </div>
          </div>

          {/* Essential Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
            {essentialLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center lg:text-left">
            © {currentYear} Accio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimplifiedFooter;
