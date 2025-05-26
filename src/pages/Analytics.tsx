
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  Brain, 
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Knowledge Items',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      description: 'Documents, articles, and resources'
    },
    {
      title: 'Team Members Active',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: Users,
      description: 'Users who accessed content this week'
    },
    {
      title: 'Search Queries',
      value: '3,429',
      change: '+18%',
      trend: 'up',
      icon: Brain,
      description: 'Knowledge searches performed'
    },
    {
      title: 'Avg. Response Time',
      value: '0.3s',
      change: '-15%',
      trend: 'up',
      icon: Clock,
      description: 'Average search response time'
    }
  ];

  const topContent = [
    { title: 'Product Documentation v2.1', views: 234, type: 'Document' },
    { title: 'API Integration Guide', views: 189, type: 'Guide' },
    { title: 'Customer Onboarding Process', views: 156, type: 'Process' },
    { title: 'Security Best Practices', views: 143, type: 'Policy' },
    { title: 'Team Meeting Notes - Q4', views: 127, type: 'Notes' }
  ];

  const searchTrends = [
    { query: 'API authentication', count: 45 },
    { query: 'customer support process', count: 38 },
    { query: 'product roadmap', count: 32 },
    { query: 'security compliance', count: 28 },
    { query: 'team onboarding', count: 24 }
  ];

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Accio Enterprise</title>
        <meta name="description" content="Gain insights into your team's knowledge usage, search patterns, and content performance." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <EnterpriseNavigation />
        
        <main className="flex-grow">
          <EnterpriseSpacing.Section>
            <EnterpriseSpacing.Container>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <EnterpriseTypography.H1 className="mb-2">
                    Analytics Dashboard
                  </EnterpriseTypography.H1>
                  <EnterpriseTypography.Body>
                    Understand how your team uses knowledge and identify opportunities for improvement
                  </EnterpriseTypography.Body>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex bg-muted rounded-lg p-1">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                      <Button
                        key={range}
                        variant={timeRange === range ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                        className="h-8"
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                        <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm font-medium text-foreground mb-1">{stat.title}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Top Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Most Accessed Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topContent.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">{item.title}</div>
                            <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{item.views}</div>
                            <div className="text-xs text-muted-foreground">views</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Search Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Top Search Queries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchTrends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{trend.query}</div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(trend.count / 45) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="ml-4 text-lg font-bold">{trend.count}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Knowledge Usage Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive charts coming soon</p>
                      <p className="text-sm text-muted-foreground">Detailed usage analytics and trends</p>
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

export default Analytics;
