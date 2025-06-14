
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MarketingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Updates', href: '/updates' },
        { label: 'Beta', href: '/beta' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact', href: '/contact' },
        { label: 'Status', href: '/status' },
        { label: 'Bug Reports', href: '/bugs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Security', href: '/security' },
        { label: 'Cookies', href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/accio', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/accio', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/accio', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@accio.app', label: 'Email' }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/60">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Transform scattered information into organized intelligence with AI-powered knowledge management.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
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

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Accio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/accessibility" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Accessibility
            </Link>
            <Link 
              to="/sitemap" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Sitemap
            </Link>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ using Lovable.dev
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
