
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Sparkles } from 'lucide-react';

export const useEnhancedToast = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "border-green-200 bg-green-50 text-green-900",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "border-blue-200 bg-blue-50 text-blue-900",
    });
  };

  const showLoading = (title: string, description?: string) => {
    return toast({
      title,
      description,
      className: "border-gray-200 bg-gray-50 text-gray-900",
    });
  };

  const showCelebration = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-900",
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showCelebration,
    toast
  };
};
