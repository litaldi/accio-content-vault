
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Github, Linkedin, Twitter, Mail, Heart, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { preferences } = useAccessibility();

  const productLinks = [
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/playground', label: 'Try Demo' }
  ];

  const companyLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
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
      href: 'https://github.com/accio', 
      label: 'GitHub', 
      icon: Github,
      ariaLabel: 'Visit our GitHub repository'
    },
    { 
      href: 'https://linkedin.com/company/accio', 
      label: 'LinkedIn', 
      icon: Linkedin,
      ariaLabel: 'Follow us on LinkedIn'
    },
    { 
      href: 'https://twitter.com/accio', 
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    console.log('Newsletter signup submitted');
  };

  return (
    <footer 
      className={`bg-background border-t border-border py-16 px-4 ${
        preferences.highContrast ? 'border-foreground' : ''
      }`} 
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand and Newsletter Column */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="inline-flex items-center mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
              aria-label="Accio - Go to homepage"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-xs text-muted-foreground leading-none">Knowledge Library</span>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Transform the way you save, organize, and rediscover online content with AI-powered intelligence. 
              Your personal knowledge library awaits.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1"
                  aria-label="Email address for newsletter"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Get product updates and tips. Unsubscribe anytime.
              </p>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <nav aria-label="Product navigation">
              <ul className="space-y-3" role="list">
                {productLinks.map(link => (
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
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-3" role="list">
                {companyLinks.map(link => (
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
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <nav aria-label="Legal navigation">
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
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href="tel:+1-555-0123" className="hover:text-foreground transition-colors">
                  +1 (555) 012-3456
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Accio. All rights reserved.</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" aria-hidden="true" />
            <span>Made with care for knowledge seekers</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-4">Follow us:</span>
            <nav className="flex gap-4" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm p-2 hover:bg-accent"
                  aria-label={social.ariaLabel}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
