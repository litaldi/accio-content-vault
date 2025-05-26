
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Mail, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const EnhancedFooter: React.FC = () => {
  const footerSections = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API', href: '/api' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Community', href: '/community' },
      { label: 'Status', href: '/status' },
      { label: 'Report Bug', href: '/bug-report' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Cookies', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { 
      icon: Twitter, 
      href: 'https://twitter.com/accio', 
      label: 'Follow us on Twitter',
      hoverColor: 'hover:text-blue-400'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/accio', 
      label: 'Connect on LinkedIn',
      hoverColor: 'hover:text-blue-600'
    },
    { 
      icon: Github, 
      href: 'https://github.com/accio', 
      label: 'Star us on GitHub',
      hoverColor: 'hover:text-gray-800 dark:hover:text-gray-200'
    },
    { 
      icon: Mail, 
      href: 'mailto:hello@accio.app', 
      label: 'Send us an email',
      hoverColor: 'hover:text-green-600'
    }
  ];

  return (
    <footer 
      id="footer"
      className="bg-muted/30 border-t" 
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay ahead of the knowledge curve
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get productivity tips, feature updates, and expert insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              aria-label="Email address for newsletter"
              required
            />
            <Button 
              type="submit"
              variant="secondary" 
              className="shrink-0 hover:bg-white/90"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="text-sm opacity-75 mt-4">
            Join 5,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
              aria-label="Accio homepage"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg" aria-hidden="true">A</span>
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed max-w-xs">
              Transform information chaos into organized intelligence. 
              The AI-powered knowledge engine for modern professionals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center transition-all duration-200 ${social.hoverColor} hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3" role="list">
              {footerSections.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              {footerSections.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3" role="list">
              {footerSections.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3" role="list">
              {footerSections.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="flex items-center gap-1 justify-center md:justify-start">
              © 2024 Accio. All rights reserved. Built with 
              <Heart className="h-3 w-3 text-red-500 fill-current mx-1" aria-label="love" />
              for knowledge workers worldwide.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Terms
            </Link>
            <Link 
              to="/security" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
