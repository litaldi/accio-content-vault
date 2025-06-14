
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Plus, BarChart3 } from 'lucide-react';
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Content', value: '0', icon: BookOpen },
    { title: 'Recent Searches', value: '0', icon: Search },
    { title: 'Tags Created', value: '0', icon: BarChart3 },
    { title: 'This Week', value: '0', icon: Plus },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge management dashboard" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ResponsiveContainer maxWidth="xl" padding="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}! Here's your knowledge overview.
              </p>
            </div>

            {/* Stats Grid */}
            <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 4 }}>
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with your knowledge management journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button className="h-auto p-4 flex flex-col items-start gap-2">
                    <Plus className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Add Content</div>
                      <div className="text-sm text-muted-foreground">
                        Upload files or save URLs
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <Search className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Search Knowledge</div>
                      <div className="text-sm text-muted-foreground">
                        Find what you need quickly
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <div>
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm text-muted-foreground">
                        Track your progress
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest knowledge management activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity yet.</p>
                  <p className="text-sm">Start by adding some content to your knowledge base!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
