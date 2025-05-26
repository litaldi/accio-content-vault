
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Slack, 
  Chrome, 
  Github, 
  Twitter, 
  Youtube, 
  Bookmark,
  Zap,
  Settings
} from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';
import { copy } from '@/utils/copy';

const Integrations: React.FC = () => {
  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Save messages and files directly from Slack to your knowledge base',
      icon: Slack,
      connected: true,
      category: 'Communication'
    },
    {
      id: 'chrome',
      name: 'Chrome Extension',
      description: 'Save web pages, articles, and research with one click',
      icon: Chrome,
      connected: true,
      category: 'Browser'
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Import repositories, issues, and documentation',
      icon: Github,
      connected: false,
      category: 'Development'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      description: 'Save tweets and threads for later reference',
      icon: Twitter,
      connected: false,
      category: 'Social'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Save videos and automatically extract transcripts',
      icon: Youtube,
      connected: false,
      category: 'Media'
    },
    {
      id: 'bookmarks',
      name: 'Browser Bookmarks',
      description: 'Import and sync your existing bookmarks',
      icon: Bookmark,
      connected: false,
      category: 'Browser'
    }
  ];

  const categories = ['All', 'Communication', 'Browser', 'Development', 'Social', 'Media'];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Integrations - Accio</title>
        <meta name="description" content="Connect your favorite tools and services to Accio." />
      </Helmet>

      <Spacing.Section size="lg">
        <Spacing.Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">
                Connect Your Tools
              </Typography.H1>
              <Typography.Lead>
                Seamlessly integrate with your favorite apps and services
              </Typography.Lead>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <integration.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                      <Switch checked={integration.connected} />
                    </div>
                    <CardDescription className="mt-3">
                      {integration.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {integration.connected ? (
                        <>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="gap-2">
                          <Zap className="h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Integration Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2</div>
                    <div className="text-sm text-muted-foreground">Active Integrations</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1.2k</div>
                    <div className="text-sm text-muted-foreground">Items Synced</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24h</div>
                    <div className="text-sm text-muted-foreground">Last Sync</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </div>
  );
};

export default Integrations;
