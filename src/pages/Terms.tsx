import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>Terms of Service - Accio Knowledge Library</title>
        <meta name="description" content="Terms of service and usage guidelines for Accio Knowledge Library." />
      </Helmet>

      <div className="py-8 space-y-8">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <h1>Terms of Service</h1>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using Accio Knowledge Library, you agree to be bound by these Terms of Service
                ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Accio Knowledge Library provides a platform for users to save, organize, and manage their
                personal knowledge. The Service may include features such as saving content, tagging,
                searching, and AI-powered organization.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                To access certain features of the Service, you may be required to create an account. You
                are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>

              <h2>4. User Content</h2>
              <p>
                You retain ownership of the content you save to Accio Knowledge Library ("User Content").
                By saving User Content to the Service, you grant Accio a license to use, reproduce,
                modify, and distribute your User Content solely for the purpose of providing the Service.
              </p>

              <h2>5. Prohibited Conduct</h2>
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul>
                <li>Violating any applicable law or regulation</li>
                <li>Infringing the rights of others</li>
                <li>Distributing malware or other harmful content</li>
                <li>Interfering with the operation of the Service</li>
              </ul>

              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Accio and
                are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL ACCIO BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>

              <h2>9. Termination</h2>
              <p>
                Accio may terminate your access to the Service at any time, with or without cause.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                State of California, without regard to its conflict of law principles.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                Accio may modify these Terms at any time by posting the revised Terms on the Service.
                Your continued use of the Service after the posting of revised Terms constitutes your
                acceptance of the revised Terms.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@accio.app.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Terms;
