
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Slack,
  Zap,
  Mail,
  Calendar,
  BarChart3,
  Shield,
  ArrowRight
} from 'lucide-react';
import SlackIntegration from '@/components/integrations/SlackIntegration';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';

const Integrations: React.FC = () => {
  const { showSuccess, showError } = useEnhancedToast();
  const [zapierWebhook, setZapierWebhook] = useState('');

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Share knowledge, get notifications, and sync team activity',
      icon: Slack,
      status: 'available',
      category: 'Communication',
      features: ['Share to channels', 'Smart notifications', 'Team sync'],
      component: SlackIntegration
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows and connect with 5000+ apps',
      icon: Zap,
      status: 'available',
      category: 'Automation',
      features: ['Custom workflows', 'Trigger events', 'Multi-app sync'],
      isWebhook: true
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Schedule knowledge reviews and team meetings',
      icon: Calendar,
      status: 'coming-soon',
      category: 'Productivity',
      features: ['Schedule reviews', 'Meeting prep', 'Content reminders']
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Track content engagement and team insights',
      icon: BarChart3,
      status: 'coming-soon',
      category: 'Analytics',
      features: ['Usage tracking', 'Team insights', 'Content analytics']
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Get important updates via email',
      icon: Mail,
      status: 'coming-soon',
      category: 'Communication',
      features: ['Daily digests', 'Content alerts', 'Team updates']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'coming-soon': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'available': return 'Available';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  const handleZapierWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zapierWebhook) {
      showError('Webhook URL Required', 'Please enter your Zapier webhook URL');
      return;
    }

    try {
      const response = await fetch(zapierWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'Accio Enterprise'
        })
      });

      showSuccess(
        'Zapier Integration Tested', 
        'Test webhook sent successfully. Check your Zap history to confirm.'
      );
    } catch (error) {
      showError('Webhook Error', 'Failed to send test webhook. Please check the URL.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Integrations - Accio Enterprise</title>
        <meta name="description" content="Connect your favorite tools and automate your knowledge management workflow." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <EnterpriseNavigation />
        
        <main className="flex-grow">
          <EnterpriseSpacing.Section>
            <EnterpriseSpacing.Container>
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <EnterpriseTypography.H1>
                    Integrations
                  </EnterpriseTypography.H1>
                </div>
                <EnterpriseTypography.Lead>
                  Connect your favorite tools to streamline your knowledge management workflow
                </EnterpriseTypography.Lead>
              </div>

              {/* Security Notice */}
              <Card className="mb-8 border-blue-200 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Enterprise Security</h3>
                      <p className="text-blue-800 text-sm">
                        All integrations use secure authentication and encrypted connections. 
                        Your data remains private and is never shared without explicit permission.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations Grid */}
              <div className="grid gap-6">
                {integrations.map((integration) => {
                  const IntegrationComponent = integration.component;
                  
                  return (
                    <Card key={integration.id} className="hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted rounded-xl">
                              <integration.icon className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle className="flex items-center gap-3">
                                {integration.name}
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${getStatusColor(integration.status)}`}
                                >
                                  {getStatusText(integration.status)}
                                </Badge>
                              </CardTitle>
                              <p className="text-muted-foreground text-sm mt-1">
                                {integration.description}
                              </p>
                            </div>
                          </div>
                          
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3 text-sm">Key Features:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {integration.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Integration Component */}
                        {IntegrationComponent && <IntegrationComponent />}
                        
                        {/* Zapier Webhook Setup */}
                        {integration.isWebhook && integration.id === 'zapier' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Webhook URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={zapierWebhook}
                                  onChange={(e) => setZapierWebhook(e.target.value)}
                                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                                />
                                <Button 
                                  onClick={handleZapierWebhook}
                                  size="sm"
                                  disabled={!zapierWebhook}
                                >
                                  Test
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Create a Zap with a webhook trigger to get started
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Coming Soon */}
                        {integration.status === 'coming-soon' && (
                          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">Available in upcoming release</span>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                              Notify Me
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Help Section */}
              <Card className="mt-12">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Integration Support</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        Having trouble setting up an integration? Our team is here to help.
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Support
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Request New Integration</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        Don't see the tool you need? Let us know what integrations would help your team.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Request Integration
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </EnterpriseSpacing.Container>
          </EnterpriseSpacing.Section>
        </main>
        
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Integrations;
