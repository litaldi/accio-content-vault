
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Brain, Facebook, Instagram, MessageCircle, Mail, Twitter } from 'lucide-react';
import { copy } from '@/utils/copy';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: copy.marketing.social.facebook,
      hoverColor: 'hover:text-blue-600'
    },
    {
      name: 'Instagram', 
      icon: Instagram,
      href: copy.marketing.social.instagram,
      hoverColor: 'hover:text-pink-600'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      href: copy.marketing.social.discord,
      hoverColor: 'hover:text-purple-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/accio',
      hoverColor: 'hover:text-blue-400'
    }
  ];

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Playground', href: '/playground' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Integrations', href: '/integrations' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' }
    ]
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Transform scattered information into organized intelligence. 
              Build your knowledge empire with AI-powered organization and discovery.
            </p>
            
            {/* Social Media Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Connect With Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className={`transition-colors ${social.hoverColor}`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Accio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">
                Start Building
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
