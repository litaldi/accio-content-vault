
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Accio, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service constitute a legally binding agreement between you and Accio Inc.'
    },
    {
      title: 'Description of Service',
      content: 'Accio is an AI-powered knowledge management platform that helps users organize, discover, and leverage their information. We provide tools for content capture, automatic organization, semantic search, and collaboration features.'
    },
    {
      title: 'User Account and Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate information during registration and keep your account information updated.'
    },
    {
      title: 'Acceptable Use Policy',
      content: 'You agree not to use Accio for any unlawful purposes or to violate any applicable laws or regulations. Prohibited activities include but are not limited to: harassment, spam, intellectual property infringement, or attempting to gain unauthorized access to our systems.'
    },
    {
      title: 'Intellectual Property Rights',
      content: 'You retain ownership of all content you upload to Accio. You grant us a limited license to process and organize your content to provide our services. Our AI technology, software, and platform remain our intellectual property.'
    },
    {
      title: 'Privacy and Data Protection',
      content: 'Your privacy is important to us. Our Privacy Policy, which is incorporated into these terms by reference, explains how we collect, use, and protect your information. We implement industry-standard security measures to protect your data.'
    },
    {
      title: 'Service Availability',
      content: 'While we strive for 99.9% uptime, we cannot guarantee that Accio will be available at all times. We may need to perform maintenance or updates that temporarily affect service availability. We will provide advance notice when possible.'
    },
    {
      title: 'Limitation of Liability',
      content: 'To the maximum extent permitted by law, Accio Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Legal Terms & Conditions | Accio</title>
        <meta name="description" content="Read Accio's Terms of Service covering user rights, responsibilities, and legal terms for using our AI-powered knowledge management platform." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <FileText className="h-3 w-3 mr-1" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of Accio and outline the rights and responsibilities 
              of both users and our company.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Important Sections */}
            <div className="mt-12 space-y-8">
              <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-xl">Termination</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Either party may terminate this agreement at any time. Upon termination, your access to Accio will cease, 
                    and you will have 30 days to export your data. We reserve the right to suspend or terminate accounts 
                    that violate these terms without prior notice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Governing Law</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms are governed by the laws of the State of California, United States, without regard to 
                    conflict of law principles. Any disputes arising from these terms will be resolved through binding 
                    arbitration in San Francisco, California.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Changes to Terms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We may modify these terms from time to time. We will notify users of significant changes via email 
                    or through our platform. Continued use of Accio after changes are posted constitutes acceptance 
                    of the new terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: legal@accio.app</p>
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

export default TermsOfService;
