
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

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
        {/* Single row layout for desktop, stacked for mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Accio</span>
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              © {currentYear}
            </span>
          </div>

          {/* Essential Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 sm:gap-6">
            {essentialLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded truncate"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile copyright */}
          <span className="text-sm text-muted-foreground sm:hidden">
            © {currentYear} All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SimplifiedFooter;
