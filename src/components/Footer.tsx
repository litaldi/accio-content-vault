
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart,
  Shield,
  FileText,
  HelpCircle,
  Globe,
  Brain,
  CreditCard,
  Banknote
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Collections', href: '/collections' },
        { name: 'Integrations', href: '/integrations' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help', icon: HelpCircle },
        { name: 'Contact Support', href: '/contact', icon: Mail },
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: Globe },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' },
        { name: 'Status', href: '/status' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy', icon: Shield },
        { name: 'Terms of Service', href: '/terms', icon: FileText },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Security', href: '/security' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/accio', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/accio', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@accio.app', icon: Mail },
  ];

  const paymentMethods = [
    { name: 'Stripe', icon: CreditCard },
    { name: 'PayPal', icon: Banknote },
    { name: 'Bitcoin', icon: Banknote },
  ];

  return (
    <footer className="bg-background border-t transition-colors duration-200" role="contentinfo">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 group transition-all duration-200"
                aria-label="Accio - Go to homepage"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Accio
                </span>
              </Link>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Transform scattered information into organized intelligence. 
                The AI-powered knowledge engine that helps you save, organize, 
                and rediscover everything that matters.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 hover:bg-accent/50 transition-all duration-200 hover:scale-110"
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
              </div>

              {/* Payment Methods */}
              <div className="pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Secure Payments
                </p>
                <div className="flex items-center gap-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-center w-8 h-6 bg-muted rounded border transition-colors duration-200 hover:bg-accent"
                      title={method.name}
                    >
                      <method.icon className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                      >
                        {link.icon && <link.icon className="h-3 w-3" />}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
            <span>for knowledge workers worldwide.</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link 
              to="/privacy" 
              className="hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Terms
            </Link>
            <Link 
              to="/security" 
              className="hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Security
            </Link>
            <span className="text-xs">v2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
