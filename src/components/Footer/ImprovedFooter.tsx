
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Twitter, 
  Github, 
  Heart, 
  ArrowRight,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Zap,
  Star
} from 'lucide-react';

export const ImprovedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features', icon: Star },
        { label: 'Pricing', href: '/pricing', icon: Zap },
        { label: 'Demo', href: '/demo', icon: FileText },
        { label: 'Changelog', href: '/changelog', icon: FileText }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'Contact Us', href: '/contact', icon: Mail },
        { label: 'FAQ', href: '/faq', icon: HelpCircle },
        { label: 'Community', href: '/community', icon: Users }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Terms of Service', href: '/terms', icon: FileText },
        { label: 'Cookie Policy', href: '/cookies', icon: Shield },
        { label: 'GDPR', href: '/gdpr', icon: Shield }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', icon: Users },
        { label: 'Blog', href: '/blog', icon: FileText },
        { label: 'Careers', href: '/careers', icon: Heart },
        { label: 'Press Kit', href: '/press', icon: FileText }
      ]
    }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="max-w-md mx-auto text-center lg:max-w-2xl">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates, tips, and feature announcements delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                aria-label="Email address for newsletter"
              />
              <Button className="sm:w-auto">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-xl font-bold text-primary">Accio</span>
                <p className="text-sm text-muted-foreground">Knowledge Library</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Transform the internet into your curated knowledge base. Save, organize, and rediscover content with AI-powered intelligence.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://twitter.com/accio" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/accio" target="_blank" rel="noopener noreferrer" aria-label="View our GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:hello@accio.com" aria-label="Email us">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    >
                      <link.icon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-muted-foreground">for knowledge seekers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ImprovedFooter;
