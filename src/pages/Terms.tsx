
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service - Accio Knowledge Library</title>
        <meta name="description" content="Read the terms of service for using Accio's knowledge management platform." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1>Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
            
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using Accio, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            
            <h2>Description of Service</h2>
            <p>
              Accio is a knowledge management platform that helps users save, organize, and search their digital content using AI-powered tools.
            </p>
            
            <h2>User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload malicious content or spam</li>
              <li>Violate any intellectual property rights</li>
            </ul>
            
            <h2>Content Ownership</h2>
            <p>
              You retain ownership of all content you save to Accio. We do not claim ownership of your content and will not use it for any purpose other than providing our service.
            </p>
            
            <h2>Service Availability</h2>
            <p>
              While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. We may perform maintenance or updates that temporarily affect availability.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              Accio is provided "as is" without warranties. We are not liable for any damages arising from your use of the service.
            </p>
            
            <h2>Termination</h2>
            <p>
              You may terminate your account at any time. We may suspend or terminate accounts that violate these terms.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. We will notify users of significant changes via email or through the service.
            </p>
            
            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at legal@accio.com.
            </p>
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Terms;
