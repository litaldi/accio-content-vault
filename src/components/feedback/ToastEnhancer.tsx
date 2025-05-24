
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Sparkles } from 'lucide-react';

export const useEnhancedToast = () => {
  const { toast } = useToast();

  const showSuccess = (message: string, description?: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-semibold">{message}</span>
        </div>
      ),
      description,
      className: "border-l-4 border-l-green-500 bg-green-50 text-green-900",
      duration: 4000,
    });
  };

  const showError = (message: string, description?: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="font-semibold">{message}</span>
        </div>
      ),
      description,
      variant: "destructive",
      className: "border-l-4 border-l-red-500",
      duration: 6000,
    });
  };

  const showInfo = (message: string, description?: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">{message}</span>
        </div>
      ),
      description,
      className: "border-l-4 border-l-blue-500 bg-blue-50 text-blue-900",
      duration: 5000,
    });
  };

  const showWarning = (message: string, description?: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span className="font-semibold">{message}</span>
        </div>
      ),
      description,
      className: "border-l-4 border-l-yellow-500 bg-yellow-50 text-yellow-900",
      duration: 5000,
    });
  };

  const showDelight = (message: string, description?: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span className="font-semibold">{message}</span>
        </div>
      ),
      description,
      className: "border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-900",
      duration: 6000,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showDelight,
    toast, // fallback to original
  };
};
