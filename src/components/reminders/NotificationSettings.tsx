
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ReminderService } from '@/services/reminderService';
import { NotificationPreferences } from '@/types/reminders';
import { Mail, Smartphone, Bell } from 'lucide-react';

interface NotificationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['notification-preferences'],
    queryFn: ReminderService.getNotificationPreferences,
    enabled: open,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (updates: Partial<NotificationPreferences>) =>
      ReminderService.updateNotificationPreferences(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });
      toast({
        title: 'Settings updated',
        description: 'Your notification preferences have been saved.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update notification preferences.',
        variant: 'destructive',
      });
      console.error('Error updating preferences:', error);
    },
  });

  const handleToggle = (field: keyof NotificationPreferences, value: boolean) => {
    updatePreferencesMutation.mutate({ [field]: value });
  };

  const notificationOptions = [
    {
      key: 'email_notifications' as keyof NotificationPreferences,
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive reminder notifications via email',
    },
    {
      key: 'push_notifications' as keyof NotificationPreferences,
      icon: Smartphone,
      title: 'Push Notifications',
      description: 'Get push notifications on your device (when supported)',
    },
    {
      key: 'in_app_notifications' as keyof NotificationPreferences,
      icon: Bell,
      title: 'In-App Notifications',
      description: 'Show notifications within the application',
    },
  ];

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>
              Configure how you receive reminder notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Configure how you receive reminder notifications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {notificationOptions.map((option, index) => {
            const IconComponent = option.icon;
            const value = preferences?.[option.key];
            const isEnabled = typeof value === 'boolean' ? value : false;

            return (
              <div key={option.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <Label htmlFor={option.key} className="text-sm font-medium">
                        {option.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id={option.key}
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggle(option.key, checked)}
                    disabled={updatePreferencesMutation.isPending}
                  />
                </div>
                {index < notificationOptions.length - 1 && <Separator className="my-4" />}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Push notifications require browser permission and may not be supported on all devices. 
            Email notifications are the most reliable delivery method.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
