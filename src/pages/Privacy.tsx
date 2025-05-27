
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const Privacy = () => {
  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Accio</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your personal data." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              At Accio, we believe that privacy is a fundamental right. This Privacy Policy explains how we collect, 
              use, and protect your personal information when you use our knowledge management platform.
            </p>
            <p>
              We are committed to being transparent about our data practices and giving you control over your information.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <p className="text-muted-foreground">
                When you create an account, we collect your email address, name, and any profile information you choose to provide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Content Data</h3>
              <p className="text-muted-foreground">
                We store the content you save to Accio, including articles, notes, documents, and any metadata you add to organize your knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <p className="text-muted-foreground">
                We collect information about how you use our service, including features accessed, search queries, and interaction patterns to improve our AI capabilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technical Data</h3>
              <p className="text-muted-foreground">
                We automatically collect certain technical information, including your IP address, browser type, device information, and log data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service Provision</h3>
              <p className="text-muted-foreground">
                We use your information to provide, maintain, and improve Accio's knowledge management features, including AI-powered organization and search.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Personalization</h3>
              <p className="text-muted-foreground">
                We personalize your experience by using your usage patterns to improve content recommendations and search results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p className="text-muted-foreground">
                We may send you service-related notifications, updates, and promotional messages (which you can opt out of).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Security and Fraud Prevention</h3>
              <p className="text-muted-foreground">
                We use your information to protect our service and users from fraud, abuse, and security threats.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              How We Protect Your Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Encryption</h3>
              <p className="text-muted-foreground">
                All data is encrypted in transit using TLS and at rest using AES-256 encryption standards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Access Controls</h3>
              <p className="text-muted-foreground">
                We implement strict access controls and the principle of least privilege for our team members.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Regular Security Audits</h3>
              <p className="text-muted-foreground">
                We conduct regular security assessments and penetration testing to identify and address vulnerabilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Minimization</h3>
              <p className="text-muted-foreground">
                We only collect and retain the minimum amount of data necessary to provide our services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sharing Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service Providers</h3>
              <p className="text-muted-foreground">
                We may share information with trusted third-party service providers who help us operate our platform, under strict confidentiality agreements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal Requirements</h3>
              <p className="text-muted-foreground">
                We may disclose information if required by law or in response to valid legal processes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Business Transfers</h3>
              <p className="text-muted-foreground">
                In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What We Don't Share</h3>
              <p className="text-muted-foreground">
                We never sell your personal data to third parties or use it for advertising purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Access and Export</h3>
              <p className="text-muted-foreground">
                You can access and export your data at any time through your account settings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Correction and Deletion</h3>
              <p className="text-muted-foreground">
                You can update or delete your personal information and content through your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Portability</h3>
              <p className="text-muted-foreground">
                You can request a copy of your data in a machine-readable format.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Account Deletion</h3>
              <p className="text-muted-foreground">
                You can delete your account at any time, and we will permanently remove your data within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@accio.app</p>
              <p><strong>Address:</strong> Accio Privacy Team, San Francisco, CA</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We will respond to privacy-related inquiries within 30 days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
