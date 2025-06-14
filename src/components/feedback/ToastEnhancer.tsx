
import { toast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

export const useEnhancedToast = () => {
  const showSuccess = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      duration: options?.duration || 5000,
      className: "border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100",
      action: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  };

  const showError = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      duration: options?.duration || 7000,
      className: "border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100",
      action: <XCircle className="h-4 w-4 text-red-500" />
    });
  };

  const showWarning = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      duration: options?.duration || 6000,
      className: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100",
      action: <AlertTriangle className="h-4 w-4 text-yellow-500" />
    });
  };

  const showInfo = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      duration: options?.duration || 5000,
      className: "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100",
      action: <Info className="h-4 w-4 text-blue-500" />
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
