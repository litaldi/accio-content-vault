
import { toast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

export const useEnhancedToast = () => {
  const showSuccess = (title: string, description?: string, options?: ToastOptions) => {
    toast.success(title, {
      description,
      duration: options?.duration || 5000,
      icon: <CheckCircle className="h-4 w-4" />
    });
  };

  const showError = (title: string, description?: string, options?: ToastOptions) => {
    toast.error(title, {
      description,
      duration: options?.duration || 7000,
      icon: <XCircle className="h-4 w-4" />
    });
  };

  const showWarning = (title: string, description?: string, options?: ToastOptions) => {
    toast.warning(title, {
      description,
      duration: options?.duration || 6000,
      icon: <AlertTriangle className="h-4 w-4" />
    });
  };

  const showInfo = (title: string, description?: string, options?: ToastOptions) => {
    toast.info(title, {
      description,
      duration: options?.duration || 5000,
      icon: <Info className="h-4 w-4" />
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
