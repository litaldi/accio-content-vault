
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ReminderService } from '@/services/reminderService';
import { TagReminder } from '@/types/reminders';
import { CreateReminderDialog } from './CreateReminderDialog';
import { EditReminderDialog } from './EditReminderDialog';
import { NotificationSettings } from './NotificationSettings';
import { 
  Bell, 
  Plus, 
  Calendar, 
  Clock, 
  Tag, 
  Settings,
  Edit,
  Trash2,
  Pause,
  Play
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ReminderManager: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState<TagReminder | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['tag-reminders'],
    queryFn: ReminderService.getTagReminders,
  });

  const toggleReminderMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      ReminderService.toggleReminderStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag-reminders'] });
      toast({
        title: 'Reminder updated',
        description: 'The reminder status has been changed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update reminder status.',
        variant: 'destructive',
      });
      console.error('Error toggling reminder:', error);
    },
  });

  const deleteReminderMutation = useMutation({
    mutationFn: ReminderService.deleteTagReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag-reminders'] });
      toast({
        title: 'Reminder deleted',
        description: 'The reminder has been permanently removed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete reminder.',
        variant: 'destructive',
      });
      console.error('Error deleting reminder:', error);
    },
  });

  const getFrequencyDisplay = (reminder: TagReminder) => {
    switch (reminder.frequency) {
      case 'daily':
        return `Daily at ${reminder.time_of_day}`;
      case 'weekly':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = reminder.day_of_week !== undefined ? days[reminder.day_of_week] : 'Unknown';
        return `Every ${day} at ${reminder.time_of_day}`;
      case 'monthly':
        const dayNum = reminder.day_of_month || 1;
        const suffix = dayNum === 1 ? 'st' : dayNum === 2 ? 'nd' : dayNum === 3 ? 'rd' : 'th';
        return `Monthly on the ${dayNum}${suffix} at ${reminder.time_of_day}`;
      default:
        return 'Unknown frequency';
    }
  };

  const handleToggleReminder = (reminder: TagReminder) => {
    toggleReminderMutation.mutate({
      id: reminder.id,
      isActive: !reminder.is_active,
    });
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminderMutation.mutate(reminderId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Tag Reminders</CardTitle>
                <CardDescription>
                  Get notified about content with specific tags
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettingsDialog(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Reminder
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : reminders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No reminders yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first reminder to get notified about tagged content
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Reminder
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{reminder.title}</h3>
                        <Badge variant={reminder.is_active ? "default" : "secondary"}>
                          {reminder.is_active ? "Active" : "Paused"}
                        </Badge>
                      </div>
                      {reminder.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {reminder.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleReminder(reminder)}
                        disabled={toggleReminderMutation.isPending}
                      >
                        {reminder.is_active ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingReminder(reminder)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReminder(reminder.id)}
                        disabled={deleteReminderMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{reminder.tag?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{getFrequencyDisplay(reminder)}</span>
                    </div>
                    {reminder.next_scheduled_at && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          Next: {formatDistanceToNow(new Date(reminder.next_scheduled_at), { addSuffix: true })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateReminderDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      {editingReminder && (
        <EditReminderDialog
          reminder={editingReminder}
          open={!!editingReminder}
          onOpenChange={(open) => !open && setEditingReminder(null)}
        />
      )}

      <NotificationSettings
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </div>
  );
};
