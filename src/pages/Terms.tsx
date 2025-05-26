
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Accio Knowledge Management</title>
        <meta name="description" content="Review our terms of service for using the Accio knowledge management platform." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: May 26, 2025</p>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p>
              Welcome to Accio! These Terms of Service ("Terms") govern your access to and use of the Accio knowledge management platform, including any content, functionality, and services offered on or through our website and application (collectively, the "Service").
            </p>

            <p className="mt-4">
              Please read these Terms carefully before using our Service. By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.
            </p>

            <Separator className="my-6" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration and Security</h2>
            <p>
              To use certain features of the Service, you may need to create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Providing accurate and complete information during registration</li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              You retain all ownership rights to the content you save, create, or upload to the Service ("User Content"). By using our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your User Content solely for the purpose of providing the Service to you.
            </p>

            <p className="mt-4">
              You are solely responsible for your User Content and represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You own or have obtained all necessary rights to the User Content</li>
              <li>Your User Content does not violate any third-party rights, including intellectual property rights and privacy rights</li>
              <li>Your User Content complies with these Terms and all applicable laws and regulations</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
            <p>
              You agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or similar solicitation</li>
              <li>To impersonate or attempt to impersonate Accio, an Accio employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm Accio or users of the Service</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Subscription and Billing</h2>
            <p>
              Certain features of the Service may require a subscription. By subscribing to our paid services:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree to pay all fees in accordance with the pricing and payment terms in effect at the time of your subscription</li>
              <li>You authorize us to charge your designated payment method for these fees</li>
              <li>You agree that your subscription will automatically renew unless you cancel it prior to the renewal date</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>

            <p className="mt-4">
              Upon termination, your right to use the Service will immediately cease. If your account is terminated for any reason, you may lose all User Content associated with your account.
            </p>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall Accio, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@accio-app.com<br />
              <strong>Address:</strong> 123 Knowledge Street, San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
