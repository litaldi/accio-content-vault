
import * as React from "react"
import { toast as sonnerToast } from "sonner"

// Re-export Sonner's toast for compatibility
export const toast = sonnerToast

export const useToast = () => {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
  }
}
