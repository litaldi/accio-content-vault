
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Privacy Policy - Accio Knowledge Library</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your personal information." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <UnifiedTypography.H1>Privacy Policy</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Last updated: December 2024
              </UnifiedTypography.Lead>
            </div>

            <Card>
              <CardContent className="prose prose-gray max-w-none pt-6">
                <UnifiedTypography.H2>Information We Collect</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  We collect information you provide directly to us, such as when you create an account, 
                  save content, or contact us for support. This includes your name, email address, 
                  and the content you choose to save in your library.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>How We Use Your Information</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  We use the information we collect to:
                </UnifiedTypography.Body>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your content and provide AI-powered organization</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>

                <UnifiedTypography.H2>Data Security</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. All data 
                  is encrypted in transit and at rest using industry-standard encryption.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Data Retention</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  We retain your information for as long as your account is active or as needed 
                  to provide you services. You can delete your account at any time from your 
                  settings page.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Your Rights</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  You have the right to access, update, or delete your personal information. 
                  You can also export all your data from your account settings. If you have 
                  any questions about your data, please contact us.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Contact Us</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@accio.app.
                </UnifiedTypography.Body>
              </CardContent>
            </Card>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Privacy;
