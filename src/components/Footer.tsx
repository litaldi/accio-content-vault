
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
  HelpCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
    { name: 'Terms of Service', href: '/terms', icon: FileText },
    { name: 'Help Center', href: '/help', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/accio', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/accio', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@accio.app', icon: Mail },
  ];

  return (
    <footer className="bg-background border-t mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 group transition-all duration-200"
                aria-label="Accio - Go to homepage"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Accio
                </span>
              </Link>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Transform scattered information into organized intelligence with AI-powered knowledge management.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 hover:bg-accent/50 transition-all duration-200"
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
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2" role="list">
                <li>
                  <Link
                    to="/collections"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analytics"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <ul className="space-y-2" role="list">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <link.icon className="h-3 w-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>for knowledge workers worldwide.</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link 
              to="/privacy" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
