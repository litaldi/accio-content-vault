
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export const useBaseService = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  // Helper function to check if user is authenticated
  const requireAuth = useCallback(() => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to perform this action',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }, [user, toast]);

  return {
    user,
    toast,
    supabase,
    requireAuth
  };
};
