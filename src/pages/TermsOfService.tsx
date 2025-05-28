
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using Accio, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service constitute a legally binding agreement between you and Accio Inc. ("Company," "we," "our," or "us") regarding your use of our AI-powered knowledge management platform.`
    },
    {
      title: 'Description of Service',
      content: `Accio provides an AI-powered knowledge management platform that helps users organize, search, and manage their digital content. Our services include:

• Automatic content organization using artificial intelligence
• Semantic search capabilities
• Cross-platform synchronization
• Collaboration tools for teams
• Browser extensions and mobile applications
• API access for integrations

We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.`
    },
    {
      title: 'User Accounts and Registration',
      content: `To use certain features of Accio, you must register for an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and update your account information
• Keep your password secure and not share it with others
• Notify us immediately of any unauthorized use of your account
• Be responsible for all activities that occur under your account

You must be at least 13 years old to use Accio. If you are under 18, you represent that you have parental consent.`
    },
    {
      title: 'Acceptable Use Policy',
      content: `You agree to use Accio only for lawful purposes and in accordance with these Terms. You may not:

• Use the service for any illegal or unauthorized purpose
• Violate any laws in your jurisdiction
• Transmit viruses, malware, or other harmful code
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the service or servers
• Scrape, harvest, or collect user information
• Use the service to store or share copyrighted material without permission
• Impersonate others or provide false information

We reserve the right to suspend or terminate accounts that violate this policy.`
    },
    {
      title: 'Content Ownership and License',
      content: `You retain ownership of all content you submit, upload, or store using Accio ("User Content"). By using our service, you grant us a limited, non-exclusive, royalty-free license to:

• Store, process, and display your User Content
• Use your content to provide and improve our services
• Create derivative works necessary for service functionality (such as thumbnails or excerpts)

This license exists only to enable us to provide the service and terminates when you delete your content or account.

You represent that you have the right to grant this license for all User Content you submit.`
    },
    {
      title: 'Privacy and Data Protection',
      content: `Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, which is incorporated into these Terms by reference.

Key privacy principles:
• We use enterprise-grade security to protect your data
• We never sell your personal information to third parties
• You have control over your data and can export or delete it at any time
• We comply with applicable data protection laws including GDPR and CCPA

Please review our Privacy Policy for detailed information about our data practices.`
    },
    {
      title: 'Payment Terms',
      content: `For paid plans:

• Fees are billed in advance on a monthly or annual basis
• All payments are non-refundable except as required by law
• You can cancel your subscription at any time
• Price changes will be communicated with 30 days' notice
• Overdue accounts may be suspended after notice

We use third-party payment processors and do not store your payment information on our servers.`
    },
    {
      title: 'Intellectual Property',
      content: `Accio and its original content, features, and functionality are owned by Accio Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

Our service includes proprietary AI algorithms and technologies that are protected intellectual property. You may not:

• Copy, modify, or reverse engineer our software
• Remove or alter any proprietary notices
• Use our trademarks without written permission
• Create derivative works based on our service

We respect the intellectual property rights of others and expect users to do the same.`
    },
    {
      title: 'Disclaimers and Limitation of Liability',
      content: `Accio is provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to:

• Merchantability and fitness for a particular purpose
• Non-infringement of third-party rights
• Uninterrupted or error-free operation
• Security or accuracy of data

To the maximum extent permitted by law, Accio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.

Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above may not apply to you.`
    },
    {
      title: 'Termination',
      content: `Either party may terminate these Terms at any time:

• You may delete your account and stop using the service
• We may terminate or suspend your account for violations of these Terms
• We may discontinue the service with reasonable notice

Upon termination:
• Your right to use the service immediately ceases
• We will delete your data according to our data retention policy
• Provisions that should survive termination will remain in effect

You can export your data at any time before termination.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Legal Agreement | Accio</title>
        <meta name="description" content="Read Accio's Terms of Service to understand your rights and responsibilities when using our AI-powered knowledge management platform." />
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
              Please read these terms carefully as they govern your use of Accio and our services.
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
                <h2 className="text-xl font-semibold mb-4">Agreement Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service ("Terms") govern your access to and use of Accio's AI-powered 
                  knowledge management platform. By creating an account or using our services, you agree 
                  to be bound by these Terms and our Privacy Policy.
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
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <div><strong>Email:</strong> legal@accio.app</div>
                    <div><strong>Address:</strong> Accio Inc., 123 Innovation Drive, San Francisco, CA 94105</div>
                    <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    These Terms may be updated periodically. We will notify you of any material changes 
                    via email or through our platform.
                  </p>
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
