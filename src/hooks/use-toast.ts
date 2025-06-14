
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

  // Add Sonner methods to the compat function
  Object.assign(compatToast, sonnerToast);
  
  return compatToast;
};

export const toast = createCompatibleToast();

export const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
