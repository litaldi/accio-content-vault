
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Brain, ArrowRight, Mail, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const EnhancedGlobalFooter: React.FC = () => {
  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'AI Assistant', href: '/ai-features' },
      { label: 'Dashboard', href: '/dashboard' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Help & Support', href: '/help' },
      { label: 'Blog', href: '/features' }
    ],
    resources: [
      { label: 'Getting Started', href: '/help' },
      { label: 'Tutorials', href: '/help' },
      { label: 'API Docs', href: '/help' },
      { label: 'FAQ', href: '/help' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/about' },
      { label: 'Accessibility', href: '/help' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/accio', label: 'Twitter', ariaLabel: 'Follow us on Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/accio', label: 'LinkedIn', ariaLabel: 'Connect on LinkedIn' },
    { icon: Github, href: 'https://github.com/accio', label: 'GitHub', ariaLabel: 'View our GitHub' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup functionality would go here
    console.log('Newsletter signup submitted');
  };

  return (
    <footer className="bg-muted/30 border-t mt-auto" role="contentinfo">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay ahead of the knowledge curve
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get productivity tips, feature updates, and expert insights delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
              required
              aria-label="Email address for newsletter"
            />
            <Button type="submit" variant="secondary" className="shrink-0">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="text-sm opacity-75 mt-4">
            Join 5,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Transform information chaos into organized intelligence. 
              The AI-powered knowledge engine for modern professionals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <nav>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
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
            <h4 className="font-semibold mb-4">Company</h4>
            <nav>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <nav>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
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
            <h4 className="font-semibold mb-4">Legal</h4>
            <nav>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Accio. All rights reserved. Made with <Heart className="inline h-3 w-3 text-red-500" /> for knowledge workers.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedGlobalFooter;
