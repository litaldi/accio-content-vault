
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellRing, 
  Clock, 
  Target, 
  TrendingUp,
  Lightbulb,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'insight' | 'achievement' | 'suggestion';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  action?: string;
}

export const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState({
    learningReminders: true,
    insightAlerts: true,
    achievements: true,
    contentSuggestions: true
  });

  useEffect(() => {
    // Simulate smart notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'reminder',
        title: 'Learning Time',
        message: 'You saved 3 AI articles yesterday. Perfect time to review them!',
        timestamp: new Date(),
        priority: 'medium'
      },
      {
        id: '2',
        type: 'insight',
        title: 'Knowledge Pattern Detected',
        message: 'You\'re building expertise in React patterns. Consider exploring advanced hooks.',
        timestamp: new Date(Date.now() - 3600000),
        priority: 'high'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Milestone Reached!',
        message: 'You\'ve saved 50 pieces of content this month. Great progress!',
        timestamp: new Date(Date.now() - 7200000),
        priority: 'low'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reminder': return Clock;
      case 'insight': return Lightbulb;
      case 'achievement': return Target;
      case 'suggestion': return TrendingUp;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" />
            Smart Notifications
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Learning Reminders</span>
              <Switch 
                checked={settings.learningReminders}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, learningReminders: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Insight Alerts</span>
              <Switch 
                checked={settings.insightAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, insightAlerts: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Achievements</span>
              <Switch 
                checked={settings.achievements}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, achievements: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Content Suggestions</span>
              <Switch 
                checked={settings.contentSuggestions}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, contentSuggestions: checked}))}
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <Card key={notification.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={getPriorityColor(notification.priority)}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
