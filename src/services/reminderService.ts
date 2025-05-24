
import { supabase } from '@/integrations/supabase/client';
import { TagReminder, NotificationPreferences, ReminderNotification } from '@/types/reminders';

export class ReminderService {
  // Notification Preferences
  static async getNotificationPreferences(): Promise<NotificationPreferences | null> {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }

    return data;
  }

  static async updateNotificationPreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const existing = await this.getNotificationPreferences();
    
    if (existing) {
      const { data, error } = await supabase
        .from('notification_preferences')
        .update({
          ...preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: user.id,
          ...preferences
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  // Tag Reminders
  static async getTagReminders(): Promise<TagReminder[]> {
    const { data, error } = await supabase
      .from('tag_reminders')
      .select(`
        *,
        tag:tags(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tag reminders:', error);
      throw error;
    }

    return data || [];
  }

  static async createTagReminder(reminder: Omit<TagReminder, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'last_sent_at' | 'next_scheduled_at'>): Promise<TagReminder> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tag_reminders')
      .insert({
        ...reminder,
        user_id: user.id
      })
      .select(`
        *,
        tag:tags(id, name)
      `)
      .single();

    if (error) {
      console.error('Error creating tag reminder:', error);
      throw error;
    }

    return data;
  }

  static async updateTagReminder(id: string, updates: Partial<TagReminder>): Promise<TagReminder> {
    const { data, error } = await supabase
      .from('tag_reminders')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        tag:tags(id, name)
      `)
      .single();

    if (error) {
      console.error('Error updating tag reminder:', error);
      throw error;
    }

    return data;
  }

  static async deleteTagReminder(id: string): Promise<void> {
    const { error } = await supabase
      .from('tag_reminders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting tag reminder:', error);
      throw error;
    }
  }

  static async toggleReminderStatus(id: string, isActive: boolean): Promise<TagReminder> {
    return this.updateTagReminder(id, { is_active: isActive });
  }

  // Get available tags for creating reminders
  static async getAvailableTags(): Promise<Array<{ id: string; name: string }>> {
    const { data, error } = await supabase
      .from('tags')
      .select('id, name')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    return data || [];
  }

  // Get reminder notifications history
  static async getReminderNotifications(reminderId?: string): Promise<ReminderNotification[]> {
    let query = supabase
      .from('reminder_notifications')
      .select('*')
      .order('sent_at', { ascending: false });

    if (reminderId) {
      query = query.eq('reminder_id', reminderId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reminder notifications:', error);
      throw error;
    }

    return data || [];
  }
}
