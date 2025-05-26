
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Github, Linkedin, Mail, Shield, Award, Globe, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnterpriseTypography } from '@/components/ui/enterprise-design-system';

const EnterpriseFooter = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Enterprise', href: '/enterprise' },
        { name: 'API Documentation', href: '/api-docs' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Changelog', href: '/changelog' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'For Teams', href: '/teams' },
        { name: 'For Enterprise', href: '/enterprise' },
        { name: 'For Developers', href: '/developers' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'ROI Calculator', href: '/roi' },
        { name: 'Migration Guide', href: '/migration' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: '/blog' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Downloads', href: '/downloads' },
        { name: 'System Status', href: '/status' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Contact Sales', href: '/contact-sales' },
        { name: 'Partners', href: '/partners' },
        { name: 'Investors', href: '/investors' }
      ]
    },
    {
      title: 'Legal & Compliance',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Security', href: '/security' },
        { name: 'Compliance', href: '/compliance' },
        { name: 'Data Processing', href: '/data-processing' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/accio', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/accio', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/accio', icon: Github },
    { name: 'Email', href: 'mailto:enterprise@accio.app', icon: Mail }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield },
    { name: 'ISO 27001', icon: Award },
    { name: 'GDPR Compliant', icon: Globe }
  ];

  return (
    <footer className="bg-muted/30 border-t" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <Brain className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Accio
                </span>
                <Badge variant="secondary" className="text-xs">Enterprise</Badge>
              </Link>
              
              <EnterpriseTypography.Body className="mb-6 max-w-sm">
                The enterprise knowledge platform trusted by industry leaders to transform 
                information into competitive advantage through AI-powered intelligence.
              </EnterpriseTypography.Body>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>1-800-ACCIO-AI (1-800-222-4624)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>enterprise@accio.app</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-9 w-9 p-0 hover:bg-primary/10"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
              
              {/* Certifications */}
              <div className="space-y-2">
                <EnterpriseTypography.Caption className="font-medium">
                  Security & Compliance
                </EnterpriseTypography.Caption>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Badge key={cert.name} variant="outline" className="text-xs">
                      <cert.icon className="h-3 w-3 mr-1" />
                      {cert.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <EnterpriseTypography.H3 className="text-sm font-semibold mb-4">
                      {section.title}
                    </EnterpriseTypography.H3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
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
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-border pt-8 mb-8">
            <div className="max-w-2xl">
              <EnterpriseTypography.H3 className="mb-3">
                Stay Updated with Enterprise Insights
              </EnterpriseTypography.H3>
              <EnterpriseTypography.Body className="mb-4">
                Get the latest product updates, industry insights, and best practices delivered to your inbox.
              </EnterpriseTypography.Body>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Email address for newsletter"
                />
                <Button className="whitespace-nowrap">
                  Subscribe to Updates
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 Accio Technologies, Inc. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/sitemap" className="hover:text-primary transition-colors">
                  Sitemap
                </Link>
                <Link to="/accessibility" className="hover:text-primary transition-colors">
                  Accessibility
                </Link>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Global Availability
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Version 2.4.1</span>
              <span className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnterpriseFooter;
