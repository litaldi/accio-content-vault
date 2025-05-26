
import React from 'react';
import { Helmet } from 'react-helmet-async';

const AccountSettings: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Account Settings - Accio | Manage Your Account</title>
        <meta name="description" content="Manage your Accio account settings, preferences, and subscription details." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Manage Your Account</h2>
            <p className="text-muted-foreground mb-6">
              Account management features are currently in development. 
              Soon you'll be able to manage your profile, preferences, and subscription details.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">Coming soon:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Profile management and customization</li>
                <li>• Privacy and security settings</li>
                <li>• Notification preferences</li>
                <li>• Subscription and billing management</li>
                <li>• Data export and backup options</li>
                <li>• Account deletion and data privacy controls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
