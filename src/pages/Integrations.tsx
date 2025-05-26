
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Puzzle, Check, ExternalLink, Lock, Zap, Cloud, Chrome, FileText, Mail, Calendar } from 'lucide-react';

const Integrations = () => {
  const integrationsList = [
    { 
      name: 'Google Drive', 
      icon: Cloud, 
      description: 'Access and save content from your Google Drive',
      status: 'connected',
      category: 'Storage' 
    },
    { 
      name: 'Chrome Extension', 
      icon: Chrome, 
      description: 'Save web content with a single click',
      status: 'connected',
      category: 'Browser' 
    },
    { 
      name: 'Notion', 
      icon: FileText, 
      description: 'Import and sync content from Notion',
      status: 'disconnected',
      category: 'Productivity' 
    },
    { 
      name: 'Gmail', 
      icon: Mail, 
      description: 'Save important emails directly to your knowledge base',
      status: 'disconnected',
      category: 'Communication' 
    },
    { 
      name: 'Google Calendar', 
      icon: Calendar, 
      description: 'Schedule reminders for your knowledge items',
      status: 'disconnected',
      category: 'Productivity' 
    },
    { 
      name: 'Slack', 
      icon: Zap, 
      description: 'Save important messages and files from Slack',
      status: 'premium',
      category: 'Communication' 
    }
  ];

  return (
    <>
      <Helmet>
        <title>Integrations - Accio Knowledge Management</title>
        <meta name="description" content="Connect Accio with your favorite tools and services. Streamline your workflow with our powerful integrations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Puzzle className="h-6 w-6" />
              Integrations
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect Accio with your favorite tools and services
            </p>
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                All
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                Storage
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                Browser
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                Productivity
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                Communication
              </Badge>
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationsList.map((integration, index) => (
              <Card key={index} className={integration.status === 'premium' ? 'border-amber-200 dark:border-amber-800' : ''}>
                {integration.status === 'premium' && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-amber-500 text-white m-3">Premium</Badge>
                  </div>
                )}
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <integration.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{integration.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{integration.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {integration.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-muted-foreground">Connected</span>
                        </>
                      ) : integration.status === 'premium' ? (
                        <>
                          <Lock className="h-3 w-3 text-amber-500" />
                          <span className="text-sm text-muted-foreground">Premium Feature</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 rounded-full bg-muted-foreground/40"></div>
                          <span className="text-sm text-muted-foreground">Not Connected</span>
                        </>
                      )}
                    </div>
                    {integration.status !== 'premium' && <Switch checked={integration.status === 'connected'} />}
                  </div>
                </CardContent>
                <CardFooter>
                  {integration.status === 'connected' ? (
                    <Button variant="outline" size="sm" className="w-full">
                      Configure
                    </Button>
                  ) : integration.status === 'premium' ? (
                    <Button size="sm" className="w-full">
                      <Zap className="h-3 w-3 mr-2" />
                      Upgrade to Premium
                    </Button>
                  ) : (
                    <Button size="sm" className="w-full">
                      <Check className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {/* Add New Integration Card */}
            <Card className="border-dashed bg-muted/10 hover:bg-muted/20 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full py-8 cursor-pointer">
                <Puzzle className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">Request Integration</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Don't see the integration you need? Let us know!
                </p>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Request Integration
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrations;
