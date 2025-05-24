
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2 } from 'lucide-react';

export const ReminderManager: React.FC = () => {
  const [reminders, setReminders] = useState([
    { id: '1', tag: 'reading', frequency: 'weekly', nextDate: '2025-06-01' },
    { id: '2', tag: 'learning', frequency: 'daily', nextDate: '2025-05-25' }
  ]);

  const [newTag, setNewTag] = useState('');

  const addReminder = () => {
    if (newTag.trim()) {
      const newReminder = {
        id: Date.now().toString(),
        tag: newTag,
        frequency: 'weekly',
        nextDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setReminders([...reminders, newReminder]);
      setNewTag('');
    }
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Create New Reminder
          </CardTitle>
          <CardDescription>
            Set up reminders to review content with specific tags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addReminder()}
            />
            <Button onClick={addReminder}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Reminders</CardTitle>
          <CardDescription>
            Your current tag-based reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No reminders set up yet
            </p>
          ) : (
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{reminder.tag}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {reminder.frequency} • Next: {reminder.nextDate}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReminder(reminder.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
