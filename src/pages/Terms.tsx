
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography, Spacing } from '@/components/ui/design-system';
import MainNavigation from '@/components/navigation/MainNavigation';

const Terms: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Accio</title>
        <meta name="description" content="Read Accio's Terms of Service to understand your rights and responsibilities when using our knowledge management platform." />
      </Helmet>

      <MainNavigation />
      
      <Spacing.Section className="bg-background">
        <Spacing.Container size="lg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">Terms of Service</Typography.H1>
              <Typography.Lead>
                Last updated: {new Date().toLocaleDateString()}
              </Typography.Lead>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    By accessing and using Accio ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Use License</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Permission is granted to temporarily access and use Accio for personal, non-commercial transitory viewing only. 
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul>
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                    You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                  <p>
                    You agree not to disclose your password to any third party and to take sole responsibility for activities and actions under your account.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Content and Conduct</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    You are solely responsible for all content you upload, post, or otherwise transmit via the Service. You agree not to use the Service to:
                  </p>
                  <ul>
                    <li>Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing, or otherwise objectionable</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                    <li>Upload, post, or transmit any content that infringes upon the rights of any third party</li>
                    <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. 
                    By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Termination</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
                    under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Disclaimer</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                    this Company excludes all representations, warranties, conditions and all other terms which, but for this legal notice, 
                    might have effect in relation to this website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    In no event shall Accio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                    or due to business interruption) arising out of the use or inability to use the materials on Accio's website, 
                    even if Accio or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                    If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p>
                    Email: legal@accio.com<br />
                    Address: [Your Company Address]
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </>
  );
};

export default Terms;
