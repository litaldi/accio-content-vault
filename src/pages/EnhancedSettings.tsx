
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibilitySettings } from '@/components/accessibility/AccessibilitySettings';

const EnhancedSettings: React.FC = () => {
  const { user } = useAuth();
  
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Enhanced Settings - Accio</title>
        <meta name="description" content="Enhanced settings for your Accio account" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Enhanced Settings</h1>
          <p className="text-muted-foreground mt-2">
            Welcome {userName}, customize your experience
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <AccessibilitySettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default EnhancedSettings;
