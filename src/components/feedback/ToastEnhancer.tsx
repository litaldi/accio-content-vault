
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X, Sparkles } from 'lucide-react';

export const useEnhancedToast = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 4000,
      className: "border-green-200 bg-green-50 text-green-900",
      action: (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ),
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 6000,
      variant: "destructive",
      action: (
        <AlertCircle className="h-4 w-4" />
      ),
    });
  };

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900",
      action: (
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
      ),
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 4000,
      className: "border-blue-200 bg-blue-50 text-blue-900",
      action: (
        <Info className="h-4 w-4 text-blue-600" />
      ),
    });
  };

  const showLoading = (title: string, description?: string) => {
    return toast({
      title,
      description,
      duration: Infinity,
      className: "border-gray-200 bg-gray-50 text-gray-900",
    });
  };

  const showCelebration = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className: "border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-900",
      action: (
        <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
      ),
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
