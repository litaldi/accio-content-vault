
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ReminderService } from '@/services/reminderService';
import { TagReminder, FrequencyType } from '@/types/reminders';

interface EditReminderDialogProps {
  reminder: TagReminder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditReminderDialog: React.FC<EditReminderDialogProps> = ({
  reminder,
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag_id: '',
    frequency: 'weekly' as FrequencyType,
    day_of_week: 1,
    day_of_month: 1,
    time_of_day: '09:00',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tags = [] } = useQuery({
    queryKey: ['available-tags'],
    queryFn: ReminderService.getAvailableTags,
    enabled: open,
  });

  useEffect(() => {
    if (reminder) {
      setFormData({
        title: reminder.title,
        description: reminder.description || '',
        tag_id: reminder.tag_id,
        frequency: reminder.frequency,
        day_of_week: reminder.day_of_week || 1,
        day_of_month: reminder.day_of_month || 1,
        time_of_day: reminder.time_of_day,
      });
    }
  }, [reminder]);

  const updateReminderMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TagReminder> }) =>
      ReminderService.updateTagReminder(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag-reminders'] });
      toast({
        title: 'Reminder updated',
        description: 'Your reminder has been successfully updated.',
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update reminder. Please try again.',
        variant: 'destructive',
      });
      console.error('Error updating reminder:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.tag_id) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const updates = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      tag_id: formData.tag_id,
      frequency: formData.frequency,
      time_of_day: formData.time_of_day,
      ...(formData.frequency === 'weekly' && { day_of_week: formData.day_of_week }),
      ...(formData.frequency === 'monthly' && { day_of_month: formData.day_of_month }),
    };

    updateReminderMutation.mutate({ id: reminder.id, updates });
  };

  const weekDays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Reminder</DialogTitle>
          <DialogDescription>
            Update your tag reminder settings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Reminder Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Weekly job search review"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional description for this reminder"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag">Tag *</Label>
            <Select
              value={formData.tag_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, tag_id: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value: FrequencyType) => setFormData(prev => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.frequency === 'weekly' && (
            <div className="space-y-2">
              <Label htmlFor="day_of_week">Day of Week</Label>
              <Select
                value={formData.day_of_week.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, day_of_week: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day.value} value={day.value.toString()}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.frequency === 'monthly' && (
            <div className="space-y-2">
              <Label htmlFor="day_of_month">Day of Month</Label>
              <Select
                value={formData.day_of_month.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, day_of_month: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time_of_day}
              onChange={(e) => setFormData(prev => ({ ...prev, time_of_day: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateReminderMutation.isPending}
            >
              {updateReminderMutation.isPending ? 'Updating...' : 'Update Reminder'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
