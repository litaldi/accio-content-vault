
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Brain,
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  Heart,
  Shield,
  FileText,
  HelpCircle,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const EnhancedGlobalFooter: React.FC = () => {
  const { highContrast } = useAccessibility();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'AI Features', href: '/ai-features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Dashboard', href: '/dashboard' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API', href: '/api' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Accessibility', href: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/accio', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/accio', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/accio', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@accio.app', icon: Mail }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    console.log('Newsletter signup submitted');
  };

  return (
    <footer 
      className={cn(
        "bg-muted/30 border-t",
        highContrast && "border-2 bg-muted/50"
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white mb-16">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Ahead of the Knowledge Curve
              </h3>
              <p className="text-lg opacity-90 mb-8">
                Get productivity tips, feature updates, and expert insights delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                  required
                  aria-label="Email address for newsletter"
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
                Join 10,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link 
                to="/" 
                className="flex items-center space-x-3 mb-6 group"
                aria-label="Accio - Go to homepage"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Accio
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                Transform scattered information into organized intelligence. 
                The AI-powered knowledge engine that helps you save, organize, 
                and rediscover everything that matters.
              </p>
              
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className={cn(
                      "h-10 w-10 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110",
                      highContrast && "border border-border"
                    )}
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

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">
                  {section.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className={cn(
                          "text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded",
                          highContrast && "hover:bg-accent hover:px-2 hover:py-1"
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

        <Separator className={cn("mb-8", highContrast && "border-2")} />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>for knowledge workers worldwide.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy" 
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              )}
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              )}
            >
              Terms
            </Link>
            <Link 
              to="/security" 
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              )}
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedGlobalFooter;
