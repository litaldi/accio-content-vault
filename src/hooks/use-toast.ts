
import * as React from "react"
import { toast as sonnerToast } from "sonner"

// Create a compatibility layer for the old toast API
const createCompatibleToast = () => {
  const compatToast = (props: any) => {
    if (typeof props === 'string') {
      return sonnerToast(props);
    }
    
    if (props && typeof props === 'object') {
      const { title, description, variant, ...rest } = props;
      
      if (variant === 'destructive') {
        return sonnerToast.error(title || description, {
          description: title && description ? description : undefined,
          ...rest
        });
      }
      
      return sonnerToast(title || description, {
        description: title && description ? description : undefined,
        ...rest
      });
    }
    
    return sonnerToast(props);
  };

  // Properly assign all Sonner methods to the compat function
  compatToast.success = sonnerToast.success;
  compatToast.error = sonnerToast.error;
  compatToast.warning = sonnerToast.warning;
  compatToast.info = sonnerToast.info;
  compatToast.loading = sonnerToast.loading;
  compatToast.dismiss = sonnerToast.dismiss;
  compatToast.promise = sonnerToast.promise;
  compatToast.custom = sonnerToast.custom;
  
  return compatToast;
};

export const toast = createCompatibleToast();

export const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
