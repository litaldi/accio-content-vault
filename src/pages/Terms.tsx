
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, Shield, AlertTriangle, Mail } from 'lucide-react';

const Terms = () => {
  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - Accio</title>
        <meta name="description" content="Read Accio's Terms of Service to understand your rights and responsibilities when using our platform." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Scale className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              By accessing and using Accio ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of these terms, then you may not access the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </CardContent>
        </Card>

        {/* Account Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Account Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Creation</h3>
              <p className="text-muted-foreground">
                You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account and password.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Account Responsibility</h3>
              <p className="text-muted-foreground">
                You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Age Requirement</h3>
              <p className="text-muted-foreground">
                You must be at least 13 years old to use this Service. If you are under 18, you must have parental consent.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Acceptable Use Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Permitted Use</h3>
              <p className="text-muted-foreground">
                You may use Accio for lawful purposes only, to organize and manage your personal or professional knowledge and information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prohibited Activities</h3>
              <p className="text-muted-foreground mb-2">You may not:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Upload content that violates intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service to spam, harass, or harm others</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Reverse engineer or attempt to extract our source code</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Content and Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Content and Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ownership</h3>
              <p className="text-muted-foreground">
                You retain ownership of all content and data you upload to Accio. We do not claim ownership of your content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">License to Use</h3>
              <p className="text-muted-foreground">
                By uploading content, you grant us a limited license to store, process, and display your content solely to provide the Service to you.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Processing</h3>
              <p className="text-muted-foreground">
                We may use AI and machine learning to analyze your content to provide features like organization suggestions and smart search.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Content Responsibility</h3>
              <p className="text-muted-foreground">
                You are solely responsible for your content and must ensure you have the right to upload and share it.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Availability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service Uptime</h3>
              <p className="text-muted-foreground">
                We strive to maintain high service availability but cannot guarantee 100% uptime. We may need to perform maintenance or updates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Service Modifications</h3>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any part of the Service with reasonable notice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Billing and Payments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Billing and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Subscription Plans</h3>
              <p className="text-muted-foreground">
                Some features require a paid subscription. Billing occurs according to your chosen plan (monthly or annually).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Terms</h3>
              <p className="text-muted-foreground">
                Payments are due in advance. Failure to pay may result in service suspension or termination.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Refunds</h3>
              <p className="text-muted-foreground">
                Refunds are handled on a case-by-case basis. Contact our support team for refund requests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service "As Is"</h3>
              <p className="text-muted-foreground">
                The Service is provided "as is" without warranties of any kind, either express or implied.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Limitation</h3>
              <p className="text-muted-foreground">
                In no event shall Accio be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Backup</h3>
              <p className="text-muted-foreground">
                While we implement backup systems, you are responsible for maintaining your own backups of important data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Termination by You</h3>
              <p className="text-muted-foreground">
                You may terminate your account at any time through your account settings or by contacting us.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Termination by Us</h3>
              <p className="text-muted-foreground">
                We may terminate or suspend your account for violations of these Terms or for any other reason with reasonable notice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Effect of Termination</h3>
              <p className="text-muted-foreground">
                Upon termination, your right to use the Service will cease immediately. We will provide you with a reasonable opportunity to export your data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. 
              Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@accio.app</p>
              <p><strong>Address:</strong> Accio Legal Team, San Francisco, CA</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
