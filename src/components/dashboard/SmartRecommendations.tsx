
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowRight,
  BookOpen,
  Target
} from 'lucide-react';

const SmartRecommendations: React.FC = () => {
  const recommendations = [
    {
      id: '1',
      type: 'trending',
      title: 'API Security Best Practices',
      reason: 'Trending in your team',
      relevance: 95,
      readTime: '8 min',
      category: 'Security',
      description: 'Updated authentication methods and security protocols',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      type: 'personal',
      title: 'Customer Onboarding Process v2.1',
      reason: 'Based on your recent searches',
      relevance: 88,
      readTime: '12 min',
      category: 'Process',
      description: 'New streamlined onboarding workflow and checklists',
      icon: Target,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: '3',
      type: 'collaborative',
      title: 'Q4 Product Roadmap',
      reason: 'Your team is discussing this',
      relevance: 82,
      readTime: '15 min',
      category: 'Planning',
      description: 'Strategic initiatives and feature prioritization',
      icon: Users,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'Review Recent Updates',
      description: '5 documents updated this week',
      action: 'View Updates',
      icon: Clock
    },
    {
      title: 'Complete Reading List',
      description: '3 items pending review',
      action: 'Continue Reading',
      icon: BookOpen
    }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${rec.color}`}>
                  <rec.icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {rec.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {rec.relevance}% match
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{rec.reason}</span>
                      <span>•</span>
                      <span>{rec.readTime} read</span>
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                    </div>
                    
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            View All Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-xs">
                {action.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartRecommendations;
