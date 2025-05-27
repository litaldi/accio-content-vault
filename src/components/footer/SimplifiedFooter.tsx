
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Brain, Facebook, Instagram, MessageCircle, Twitter, Mail, ExternalLink } from 'lucide-react';

const SimplifiedFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/accio',
      hoverColor: 'hover:text-blue-600'
    },
    {
      name: 'Instagram', 
      icon: Instagram,
      href: 'https://instagram.com/accio',
      hoverColor: 'hover:text-pink-600'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      href: 'https://discord.gg/accio',
      hoverColor: 'hover:text-purple-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/accio',
      hoverColor: 'hover:text-blue-400'
    }
  ];

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Transform scattered information into organized intelligence. 
              Build your knowledge empire with AI-powered organization.
            </p>
          </div>

          {/* Essential Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
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

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect With Us</h4>
            <div className="flex space-x-3">
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
            
            {/* Contact Button */}
            <Button variant="outline" size="sm" asChild className="mt-4">
              <Link to="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground">
            <p>© {currentYear} Accio. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
          
          <Button size="sm" asChild>
            <Link to="/register">
              Start Building
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default SimplifiedFooter;
