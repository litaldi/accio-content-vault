
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  MapPin, 
  Phone,
  ArrowRight,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Zap,
  Star,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const ResponsiveFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { preferences } = useAccessibility();

  const productLinks = [
    { path: '/features', label: 'Features', icon: Star },
    { path: '/pricing', label: 'Pricing', icon: BarChart3 },
    { path: '/integrations', label: 'Integrations', icon: Zap },
    { path: '/demo', label: 'Try Demo', icon: BookOpen }
  ];

  const companyLinks = [
    { path: '/about', label: 'About Us', icon: Users },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/careers', label: 'Careers', icon: Heart },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  const supportLinks = [
    { path: '/help', label: 'Help Center', icon: HelpCircle },
    { path: '/faq', label: 'FAQ', icon: FileText },
    { path: '/tutorials', label: 'Tutorials', icon: BookOpen },
    { path: '/status', label: 'Status', icon: BarChart3 }
  ];

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy', icon: Shield },
    { path: '/terms', label: 'Terms of Service', icon: FileText },
    { path: '/accessibility', label: 'Accessibility', icon: HelpCircle },
    { path: '/security', label: 'Security', icon: Shield }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com/accio', 
      label: 'GitHub', 
      icon: Github,
      ariaLabel: 'Visit our GitHub repository'
    },
    { 
      href: 'https://twitter.com/accio', 
      label: 'Twitter', 
      icon: Twitter,
      ariaLabel: 'Follow us on Twitter'
    },
    { 
      href: 'https://linkedin.com/company/accio', 
      label: 'LinkedIn', 
      icon: Linkedin,
      ariaLabel: 'Connect with us on LinkedIn'
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
      className={`relative bg-muted/30 border-t border-border ${
        preferences.highContrast ? 'border-foreground bg-background' : ''
      }`} 
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Newsletter Section */}
        <div className="py-12 sm:py-16 border-b border-border/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              Get the latest updates, tips, and insights delivered straight to your inbox. 
              No spam, unsubscribe anytime.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-12 text-center sm:text-left"
                aria-label="Email address for newsletter subscription"
                required
              />
              <Button 
                type="submit" 
                className="h-12 px-6 sm:px-8 font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our team.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                aria-label="Accio - Go to homepage"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-sm text-muted-foreground leading-none">Knowledge Library</span>
                </div>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Transform the way you save, organize, and rediscover online content. 
                Your personal knowledge library powered by AI intelligence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>San Francisco, CA, United States</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="tel:+1-555-0123" 
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                  >
                    +1 (555) 012-3456
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="mailto:hello@accio.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                  >
                    hello@accio.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Product</h3>
              <nav aria-label="Product navigation">
                <ul className="space-y-3" role="list">
                  {productLinks.map(link => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded text-sm"
                      >
                        <link.icon className="h-3 w-3" aria-hidden="true" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Company</h3>
              <nav aria-label="Company navigation">
                <ul className="space-y-3" role="list">
                  {companyLinks.map(link => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded text-sm"
                      >
                        <link.icon className="h-3 w-3" aria-hidden="true" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            {/* Support & Legal Links */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Support</h3>
                <nav aria-label="Support navigation">
                  <ul className="space-y-3" role="list">
                    {supportLinks.map(link => (
                      <li key={link.path}>
                        <Link 
                          to={link.path} 
                          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded text-sm"
                        >
                          <link.icon className="h-3 w-3" aria-hidden="true" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Legal</h3>
                <nav aria-label="Legal navigation">
                  <ul className="space-y-3" role="list">
                    {legalLinks.map(link => (
                      <li key={link.path}>
                        <Link 
                          to={link.path} 
                          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded text-sm"
                        >
                          <link.icon className="h-3 w-3" aria-hidden="true" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground order-2 sm:order-1">
              <div className="flex items-center gap-2">
                <span>&copy; {currentYear} Accio. All rights reserved.</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" aria-hidden="true" />
              </div>
              <span className="hidden sm:inline">•</span>
              <span>Made with care for knowledge seekers worldwide</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-1 order-1 sm:order-2">
              <span className="text-sm text-muted-foreground mr-3 hidden sm:inline">Follow us:</span>
              <nav className="flex gap-1" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 hover:scale-105"
                  >
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={social.ariaLabel}
                    >
                      <social.icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default ResponsiveFooter;
