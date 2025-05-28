
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Account information (name, email, password)',
        'Content you save and organize in Accio',
        'Usage data and analytics to improve our service',
        'Device and browser information for technical support'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Provide and improve our AI-powered organization features',
        'Personalize your experience and content recommendations',
        'Communicate with you about your account and our services',
        'Ensure security and prevent fraud or abuse'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'End-to-end encryption for all your content',
        'SOC 2 Type II certified infrastructure',
        'Regular security audits and penetration testing',
        'Secure data centers with 99.9% uptime SLA'
      ]
    },
    {
      title: 'Your Rights',
      icon: Shield,
      content: [
        'Access and download all your data at any time',
        'Delete your account and all associated data',
        'Control what information we collect and how it\'s used',
        'Opt out of non-essential communications'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - How We Protect Your Data | Accio</title>
        <meta name="description" content="Learn how Accio protects and handles your personal data. Our comprehensive privacy policy covers data collection, usage, security, and your rights." />
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
              We believe in transparency about how we collect, use, and protect your personal information. 
              This policy explains our privacy practices in clear, understandable terms.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Sections */}
            <div className="mt-12 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Data Sharing and Third Parties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not sell, rent, or share your personal information with third parties for their marketing purposes. 
                    We may share information only in these limited circumstances:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• With your explicit consent</li>
                    <li>• To comply with legal obligations or court orders</li>
                    <li>• With service providers who help us operate our platform (under strict confidentiality agreements)</li>
                    <li>• In connection with a business transfer or acquisition (with prior notice to users)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your data may be processed and stored in countries other than your own to provide our services globally. 
                    We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy 
                    and applicable data protection laws, including GDPR and CCPA compliance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time to reflect changes in our practices or for legal reasons. 
                    We will notify you of any significant changes by email or through our platform. Your continued use of Accio 
                    after such modifications constitutes your acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this privacy policy or how we handle your data, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: privacy@accio.app</p>
                    <p>Address: 123 Innovation Drive, San Francisco, CA 94105</p>
                    <p>Phone: +1 (555) 123-4567</p>
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
