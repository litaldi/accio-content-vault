
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Accio Knowledge Management</title>
        <meta name="description" content="Learn about our privacy policy and how we handle your data." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: May 26, 2025</p>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p>
              At Accio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our knowledge management platform.
            </p>

            <Separator className="my-6" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create an account</li>
              <li>Use our services</li>
              <li>Contact customer support</li>
              <li>Complete forms or surveys</li>
              <li>Save content to your knowledge base</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Personal Information</h3>
            <p>
              This may include your name, email address, profile information, and payment details if you subscribe to our paid services.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Content Information</h3>
            <p>
              We collect and store the content you save, organize, and manage using our platform, including text, URLs, documents, and any metadata associated with them.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Usage Information</h3>
            <p>
              We collect information about how you interact with our services, including access times, pages viewed, links clicked, and other actions taken within the application.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
            </ul>

            <p className="mt-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@accio-app.com<br />
              <strong>Address:</strong> 123 Knowledge Street, San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
