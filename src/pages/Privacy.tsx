
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography, Spacing } from '@/components/ui/design-system';
import MainNavigation from '@/components/navigation/MainNavigation';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Accio</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your personal information in our comprehensive Privacy Policy." />
      </Helmet>

      <MainNavigation />
      
      <Spacing.Section className="bg-background">
        <Spacing.Container size="lg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">Privacy Policy</Typography.H1>
              <Typography.Lead>
                Last updated: {new Date().toLocaleDateString()}
              </Typography.Lead>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, save content, or contact us for support. 
                    This may include:
                  </p>
                  <ul>
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Content you save to our service</li>
                    <li>Communications with us</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We use the information we collect to:
                  </p>
                  <ul>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new features and services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul>
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>In connection with a business transfer</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. 
                    We may also retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul>
                    <li>Right to access your personal information</li>
                    <li>Right to correct inaccurate information</li>
                    <li>Right to delete your personal information</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We use cookies and similar tracking technologies to collect and track information about your use of our service. 
                    You can control cookies through your browser settings, but disabling cookies may affect the functionality of our service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
                    If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure that such transfers comply with applicable data protection laws and that your information receives adequate protection.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Changes to Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                    and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p>
                    Email: privacy@accio.com<br />
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

export default Privacy;
