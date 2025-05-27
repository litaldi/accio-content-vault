
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Activity as ActivityIcon, Clock, Bookmark, Search, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Activity = () => {
  const activities = [
    {
      type: 'save',
      description: 'Saved "Advanced React Patterns" to AI & Development',
      time: '2 hours ago',
      icon: Bookmark
    },
    {
      type: 'search',
      description: 'Searched for "machine learning algorithms"',
      time: '4 hours ago',
      icon: Search
    },
    {
      type: 'ai',
      description: 'Used AI assistant to summarize 3 articles',
      time: '6 hours ago',
      icon: Brain
    },
    {
      type: 'save',
      description: 'Created new collection "Design Systems"',
      time: '1 day ago',
      icon: Bookmark
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Activity Log - Accio</title>
        <meta name="description" content="Track your learning journey and see your recent activity on Accio." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <ActivityIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Activity Log</h1>
            <p className="text-muted-foreground">Track your learning journey</p>
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
            <p className="text-muted-foreground">
              Start using Accio to see your activity here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
