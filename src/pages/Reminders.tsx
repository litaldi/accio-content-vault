import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Bell, Clock, Calendar, MoreHorizontal } from 'lucide-react';

const Reminders = () => {
  // Sample reminders data
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Review Q3 Marketing Report",
      description: "Finalize and share the Q3 marketing report with the team",
      dueDate: "2024-08-15",
      time: "9:00 AM",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Follow up with John Doe",
      description: "Send a follow-up email to John regarding the partnership proposal",
      dueDate: "2024-08-16",
      time: "11:00 AM",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Prepare Presentation Slides",
      description: "Create presentation slides for the upcoming client meeting",
      dueDate: "2024-08-17",
      time: "2:00 PM",
      status: "Upcoming"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Reminders - Accio</title>
        <meta name="description" content="Manage your content reminders and notifications" />
      </Helmet>
      
      <ProfessionalNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reminders</h1>
            <p className="text-muted-foreground">
              Stay on top of your important tasks and deadlines
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Reminder
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="card-interactive group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {reminder.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {reminder.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {reminder.description}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {reminder.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {reminder.dueDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Create New Reminder Card */}
          <Card className="card-interactive border-dashed hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg mb-2">Create New Reminder</CardTitle>
              <CardDescription className="mb-4">
                Set a new reminder to stay on track
              </CardDescription>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reminders;
