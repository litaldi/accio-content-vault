
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy - Accio Knowledge Library</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your data." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
            
            <h2>Your Privacy Matters</h2>
            <p>
              At Accio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
            </p>
            
            <h2>Information We Collect</h2>
            <h3>Account Information</h3>
            <p>
              When you create an account, we collect your email address and any profile information you choose to provide.
            </p>
            
            <h3>Content You Save</h3>
            <p>
              We store the content you save to your knowledge library, including URLs, text, images, and files you upload.
            </p>
            
            <h3>Usage Data</h3>
            <p>
              We collect information about how you use Accio, such as features accessed and search queries, to improve our service.
            </p>
            
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Provide and maintain our service</li>
              <li>Improve AI recommendations and search results</li>
              <li>Send important service updates</li>
              <li>Provide customer support</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We use industry-standard encryption and security measures to protect your data. Your content is encrypted both in transit and at rest.
            </p>
            
            <h2>Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal data with third parties for marketing purposes. We may share data only when required by law or to protect our users.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can export your data at any time or request account deletion.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@accio.com.
            </p>
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Privacy;
