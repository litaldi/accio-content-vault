
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  BellRing, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen,
  Zap,
  Settings,
  Check,
  X,
  Calendar
} from 'lucide-react';

export const SmartNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'reminder',
      title: 'Review saved articles',
      message: 'You have 12 unread articles from this week',
      time: '2 hours ago',
      isRead: false,
      priority: 'medium',
      actionable: true
    },
    {
      id: '2',
      type: 'insight',
      title: 'Knowledge gap detected',
      message: 'Consider adding more content about "Data Science" to complete your learning path',
      time: '1 day ago',
      isRead: false,
      priority: 'high',
      actionable: true
    },
    {
      id: '3',
      type: 'collaboration',
      title: 'New team workspace',
      message: 'Sarah invited you to join "Q4 Planning" workspace',
      time: '2 days ago',
      isRead: true,
      priority: 'low',
      actionable: true
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Milestone reached!',
      message: 'You\'ve saved 100 pieces of content this month',
      time: '3 days ago',
      isRead: true,
      priority: 'low',
      actionable: false
    }
  ]);

  const [settings, setSettings] = useState({
    smartReminders: true,
    learningInsights: true,
    collaborationUpdates: true,
    achievementAlerts: false,
    emailDigest: true,
    pushNotifications: true
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="h-4 w-4" />;
      case 'insight': return <TrendingUp className="h-4 w-4" />;
      case 'collaboration': return <Users className="h-4 w-4" />;
      case 'achievement': return <Zap className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary" />
              Smart Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">We'll notify you about important updates</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'bg-muted/30' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-2">
                        {notification.actionable && (
                          <Button variant="ghost" size="sm">
                            <BookOpen className="h-3 w-3" />
                          </Button>
                        )}
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Smart Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded to review and organize your content
                </p>
              </div>
              <Switch 
                checked={settings.smartReminders}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, smartReminders: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Learning Insights</Label>
                <p className="text-sm text-muted-foreground">
                  AI-powered suggestions to improve your knowledge base
                </p>
              </div>
              <Switch 
                checked={settings.learningInsights}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, learningInsights: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Collaboration Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about team activities and shared content
                </p>
              </div>
              <Switch 
                checked={settings.collaborationUpdates}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, collaborationUpdates: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Achievement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Celebrate milestones and learning achievements
                </p>
              </div>
              <Switch 
                checked={settings.achievementAlerts}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, achievementAlerts: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Weekly Email Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Summary of your week's knowledge activities
                </p>
              </div>
              <Switch 
                checked={settings.emailDigest}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emailDigest: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
