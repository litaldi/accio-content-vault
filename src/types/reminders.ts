
export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface TagReminder {
  id: string;
  user_id: string;
  tag_id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  day_of_week?: number; // 0=Sunday, 6=Saturday
  day_of_month?: number; // 1-31
  time_of_day: string; // HH:MM format
  is_active: boolean;
  last_sent_at?: string;
  next_scheduled_at?: string;
  created_at: string;
  updated_at: string;
  tag?: {
    id: string;
    name: string;
  };
}

export interface ReminderNotification {
  id: string;
  reminder_id: string;
  user_id: string;
  notification_type: 'email' | 'push' | 'in_app';
  sent_at: string;
  status: 'sent' | 'failed' | 'pending';
  error_message?: string;
  content_count: number;
}

export type FrequencyType = 'daily' | 'weekly' | 'monthly';
