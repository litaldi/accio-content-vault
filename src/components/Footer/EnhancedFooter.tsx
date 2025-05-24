
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { preferences } = useAccessibility();

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/accessibility', label: 'Accessibility' },
    { path: '/sitemap', label: 'Sitemap' }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com', 
      label: 'GitHub', 
      icon: Github,
      ariaLabel: 'Visit our GitHub repository'
    },
    { 
      href: 'https://linkedin.com', 
      label: 'LinkedIn', 
      icon: Linkedin,
      ariaLabel: 'Follow us on LinkedIn'
    },
    { 
      href: 'https://twitter.com', 
      label: 'Twitter', 
      icon: Twitter,
      ariaLabel: 'Follow us on Twitter'
    },
    { 
      href: 'mailto:hello@accio.com', 
      label: 'Email', 
      icon: Mail,
      ariaLabel: 'Send us an email'
    }
  ];

  return (
    <footer 
      className={`bg-background border-t border-border py-12 px-4 ${
        preferences.highContrast ? 'border-foreground' : ''
      }`} 
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              className="inline-flex items-center mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              aria-label="Accio - Go to homepage"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-bold text-primary">Accio</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              Save, organize and retrieve your online content with AI-powered tagging and powerful search capabilities.
            </p>
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Accio. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 id="footer-navigation-heading" className="font-medium text-lg mb-4">Quick Links</h3>
            <nav aria-labelledby="footer-navigation-heading">
              <ul className="space-y-3" role="list">
                {mainLinks.map(link => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 id="footer-legal-heading" className="font-medium text-lg mb-4">Legal</h3>
            <nav aria-labelledby="footer-legal-heading">
              <ul className="space-y-3" role="list">
                {legalLinks.map(link => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Bottom section with secondary info */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Designed for accessibility and ease of use
          </p>
          <nav className="flex gap-6" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm p-1"
                aria-label={social.ariaLabel}
              >
                <social.icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
