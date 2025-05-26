
import { useState } from 'react';

interface ToastProps {
  id?: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substr(2, 9);
    const toastWithId = { ...props, id };
    
    console.log('Toast:', toastWithId);
    setToasts(prev => [...prev, toastWithId]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const dismiss = (id?: string) => {
    if (id) {
      setToasts(prev => prev.filter(t => t.id !== id));
    } else {
      setToasts([]);
    }
  };

  return { toast, toasts, dismiss };
};
