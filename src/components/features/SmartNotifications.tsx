
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  BellRing, 
  X, 
  Clock,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Calendar
} from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'reminder' | 'insight' | 'achievement' | 'recommendation';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  actionable: boolean;
}

export const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate smart notifications
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'reminder',
        title: 'Review Session Due',
        message: 'Time to review your AI learning notes from last week',
        priority: 'medium',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        actionable: true
      },
      {
        id: '2',
        type: 'insight',
        title: 'Reading Pattern Insight',
        message: 'Your productivity peaks at 2 PM. Schedule important reading then.',
        priority: 'low',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        actionable: false
      },
      {
        id: '3',
        type: 'recommendation',
        title: 'New Content Suggestion',
        message: 'Based on your interests, check out "Advanced React Patterns"',
        priority: 'medium',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        actionable: true
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return Clock;
      case 'insight': return TrendingUp;
      case 'achievement': return TrendingUp;
      case 'recommendation': return Lightbulb;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
      case 'low': return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="rounded-full shadow-lg relative"
        >
          <BellRing className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      ) : (
        <Card className="w-80 shadow-xl max-h-96 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Smart Notifications
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 ${getPriorityColor(notification.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissNotification(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionable && (
                            <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                              Act
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-3 border-t bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotifications([])}
                  className="w-full text-xs"
                >
                  Clear All Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
