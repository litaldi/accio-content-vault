
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
  CreditCard,
  Smartphone,
  Building2,
  Shield
} from 'lucide-react';

const EnterpriseFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Search', href: '/search' },
        { name: 'Collections', href: '/collections' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Integrations', href: '/integrations' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Status', href: '/status' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Cookie Policy', href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/accio', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/accio', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/accio', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@accio.app', icon: Mail }
  ];

  const paymentMethods = [
    { name: 'Credit/Debit Cards', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
    { name: 'PayPal', icon: 'PayPal', description: 'Secure PayPal payments' },
    { name: 'Bit', icon: 'Bit', description: 'Israeli digital payments' },
    { name: 'Apple Pay', icon: Smartphone, description: 'Apple Pay & Google Pay' },
    { name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfers' }
  ];

  return (
    <footer className="bg-background border-t" role="contentinfo">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Newsletter Section */}
        <div className="py-16">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay ahead of the knowledge curve
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Get productivity tips, feature updates, and expert insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                aria-label="Email address for newsletter"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Accio</span>
              </Link>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Transform information chaos into organized intelligence. 
                The AI-powered knowledge engine for modern professionals.
              </p>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 hover:bg-accent transition-colors"
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
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Secure Payment Options
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group cursor-help"
                      title={method.description}
                    >
                      {method.icon === 'PayPal' ? (
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                      ) : method.icon === 'Bit' ? (
                        <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                      ) : (
                        <method.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  All payments are encrypted and secure. We never store your payment information.
                </p>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
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

        <Separator />

        {/* Bottom Section */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Accio. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>for knowledge workers worldwide.</span>
            </div>
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnterpriseFooter;
