
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, save content, or contact us for support. This includes your email address, content you save, and usage preferences.

We also automatically collect certain information about your device and usage patterns, including IP address, browser type, and how you interact with our service. This helps us improve the platform and provide better AI recommendations.`
    },
    {
      title: 'How We Use Your Information',
      content: `We use your information to provide, maintain, and improve our services, including:
      
• Organizing and categorizing your saved content using AI
• Providing personalized search results and recommendations
• Sending you service updates and support communications
• Analyzing usage patterns to improve our algorithms
• Ensuring security and preventing fraud

We never use your personal content to train our AI models or share it with third parties for advertising purposes.`
    },
    {
      title: 'Data Security',
      content: `We implement enterprise-grade security measures to protect your data:

• End-to-end encryption for all content in transit and at rest
• SOC 2 Type II compliance and regular security audits
• Multi-factor authentication and access controls
• Regular security training for all team members
• Incident response procedures and monitoring

Your data is stored in secure, geographically distributed data centers with redundant backups.`
    },
    {
      title: 'Data Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:

• With your explicit consent
• To comply with legal obligations or court orders
• To protect our rights, privacy, safety, or property
• In connection with a business transaction (merger, acquisition, etc.)
• With service providers who assist in operating our platform (under strict confidentiality agreements)`
    },
    {
      title: 'Your Rights and Choices',
      content: `You have several rights regarding your personal information:

• Access: Request a copy of your personal data
• Correction: Update or correct inaccurate information
• Deletion: Request deletion of your account and data
• Portability: Export your data in standard formats
• Withdrawal: Withdraw consent for data processing

To exercise these rights, contact us at privacy@accio.app. We will respond within 30 days.`
    },
    {
      title: 'International Data Transfers',
      content: `Accio operates globally, and your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:

• Standard contractual clauses approved by relevant authorities
• Adequacy decisions by data protection authorities
• Other lawful transfer mechanisms as required

We maintain the same level of protection regardless of where your data is processed.`
    },
    {
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services and fulfill legal obligations:

• Account information: Until you delete your account
• Saved content: Until you delete it or your account
• Usage data: Typically 2-3 years for analytics purposes
• Support communications: Up to 7 years for record-keeping

When you delete your account, we remove your personal data within 30 days, except where retention is required by law.`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your experience:

• Essential cookies: Required for basic platform functionality
• Analytics cookies: Help us understand usage patterns
• Preference cookies: Remember your settings and preferences

You can control cookie settings through your browser, though disabling certain cookies may affect platform functionality.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - How We Protect Your Data | Accio</title>
        <meta name="description" content="Learn how Accio protects your privacy and data with enterprise-grade security, transparent practices, and your rights as a user." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We're committed to protecting your privacy and being transparent about how we collect, 
              use, and safeguard your information.
            </p>
            <div className="text-sm text-muted-foreground">
              Last updated: January 1, 2025
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="mb-12 p-6 bg-muted/20 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Accio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our 
                  AI-powered knowledge management platform. By using Accio, you agree to the practices 
                  described in this policy.
                </p>
              </div>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-12">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <div><strong>Email:</strong> privacy@accio.app</div>
                    <div><strong>Address:</strong> Accio Inc., 123 Innovation Drive, San Francisco, CA 94105</div>
                    <div><strong>Data Protection Officer:</strong> dpo@accio.app</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
