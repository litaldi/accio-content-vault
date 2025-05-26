
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Terms of Service - Accio Knowledge Library</title>
        <meta name="description" content="Read our terms of service and understand your rights and responsibilities when using Accio." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <UnifiedTypography.H1>Terms of Service</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Last updated: December 2024
              </UnifiedTypography.Lead>
            </div>

            <Card>
              <CardContent className="prose prose-gray max-w-none pt-6">
                <UnifiedTypography.H2>Acceptance of Terms</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  By accessing and using Accio, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Use License</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  Permission is granted to temporarily use Accio for personal, non-commercial 
                  transitory viewing only. This is the grant of a license, not a transfer of title.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>User Account</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  When you create an account with us, you must provide accurate, complete, and 
                  current information. You are responsible for safeguarding your password and 
                  for all activities that occur under your account.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Prohibited Uses</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  You may not use our service:
                </UnifiedTypography.Body>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To transmit any malicious code or viruses</li>
                  <li>To collect or track personal information of others</li>
                </ul>

                <UnifiedTypography.H2>Content</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  You retain all rights to content you save in your library. We do not claim 
                  ownership of your content. However, you grant us a license to use your content 
                  to provide our services, such as AI-powered organization and search.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Service Availability</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  We strive to maintain high availability but cannot guarantee uninterrupted 
                  service. We may suspend or terminate the service at any time with reasonable notice.
                </UnifiedTypography.Body>

                <UnifiedTypography.H2>Contact Information</UnifiedTypography.H2>
                <UnifiedTypography.Body>
                  If you have any questions about these Terms, please contact us at 
                  legal@accio.app.
                </UnifiedTypography.Body>
              </CardContent>
            </Card>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Terms;
