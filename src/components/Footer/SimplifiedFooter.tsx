
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const SimplifiedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const essentialLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Single row layout for simplicity */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Accio</span>
          </div>

          {/* Essential Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" role="navigation" aria-label="Footer navigation">
            {essentialLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Accio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimplifiedFooter;
