
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ContentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduledItems = [
    {
      id: 1,
      title: "Review AI Research Papers",
      type: "reading",
      scheduledTime: "09:00",
      duration: 60,
      priority: "high",
      status: "upcoming",
      description: "Read and summarize 3 research papers on machine learning"
    },
    {
      id: 2,
      title: "Weekly Knowledge Review",
      type: "review",
      scheduledTime: "14:00",
      duration: 30,
      priority: "medium",
      status: "completed",
      description: "Review and organize content from this week"
    },
    {
      id: 3,
      title: "Update Project Documentation",
      type: "writing",
      scheduledTime: "16:30",
      duration: 45,
      priority: "high",
      status: "in-progress",
      description: "Document new features and update user guides"
    },
    {
      id: 4,
      title: "Learning Path: Data Science",
      type: "learning",
      scheduledTime: "19:00",
      duration: 90,
      priority: "medium",
      status: "upcoming",
      description: "Continue with statistics module"
    }
  ];

  const upcomingReminders = [
    {
      title: "Daily Knowledge Digest",
      time: "08:00",
      frequency: "daily",
      enabled: true
    },
    {
      title: "Weekly Progress Review",
      time: "18:00",
      frequency: "weekly",
      enabled: true
    },
    {
      title: "Monthly Goal Assessment",
      time: "10:00",
      frequency: "monthly",
      enabled: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-950';
      default: return 'border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'upcoming': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return '📖';
      case 'writing': return '✍️';
      case 'review': return '🔍';
      case 'learning': return '🎓';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Content Scheduler
            <Badge variant="secondary">Smart Planning</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <Button className="mt-6">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule Item
            </Button>
          </div>

          {/* Today's Schedule */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Today's Schedule
            </h4>
            <div className="space-y-3">
              {scheduledItems.map((item) => (
                <Card key={item.id} className={`${getPriorityColor(item.priority)} border-l-4`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl mt-1">{getTypeIcon(item.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{item.title}</h5>
                            {getStatusIcon(item.status)}
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>🕐 {item.scheduledTime}</span>
                            <span>⏱️ {item.duration} min</span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {item.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Smart Reminders */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Smart Reminders
            </h4>
            <div className="space-y-3">
              {upcomingReminders.map((reminder, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">{reminder.title}</h5>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{reminder.time}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {reminder.frequency}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={reminder.enabled ? 'default' : 'secondary'}>
                          {reminder.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <p className="text-xs text-muted-foreground">Today's Tasks</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">225</div>
                <p className="text-xs text-muted-foreground">Total Minutes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">75%</div>
                <p className="text-xs text-muted-foreground">Week Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Weekly Schedule
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Manage Reminders
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
