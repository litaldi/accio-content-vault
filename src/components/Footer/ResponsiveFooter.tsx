
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ResponsiveFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Demo', href: '/demo' },
        { name: 'API', href: '/api' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Status', href: '/status' },
        { name: 'Community', href: '/community' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Sitemap', href: '/sitemap' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-sm text-muted-foreground leading-none">Knowledge Library</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                Transform the internet into your curated knowledge base. Save, organize, and rediscover content with AI-powered intelligence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@accio.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className={cn(
                          "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
                          "hover:underline underline-offset-4"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 max-w-md">
              <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates and tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <Button size="sm" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Follow us:</span>
              <nav className="flex items-center gap-2" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Accio. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                <span>in San Francisco</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/accessibility" 
                className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
              >
                Accessibility
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href="https://status.accio.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span>Status</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
