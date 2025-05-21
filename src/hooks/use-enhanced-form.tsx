
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

interface UseEnhancedFormProps<TFormValues extends FieldValues> {
  validationSchema: ZodType<TFormValues, ZodTypeDef, TFormValues>;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit?: (data: TFormValues) => Promise<void> | void;
  onError?: (error: any) => void;
}

interface UseEnhancedFormReturn<TFormValues extends FieldValues> extends UseFormReturn<TFormValues> {
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  submitError: string | null;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Enhanced form hook that combines React Hook Form with Zod validation
 * and provides additional submit handling functionality
 */
export function useEnhancedForm<TFormValues extends FieldValues>({
  validationSchema,
  defaultValues,
  onSubmit,
  onError
}: UseEnhancedFormProps<TFormValues>): UseEnhancedFormReturn<TFormValues> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<TFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const handleFormSubmit = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      // Clear previous submission state
      setSubmitError(null);

      // Trigger form validation
      const formValid = await methods.trigger();
      if (!formValid) return;

      // Get form values
      const values = methods.getValues();

      try {
        setIsSubmitting(true);
        if (onSubmit) {
          await onSubmit(values);
        }
        setIsSubmitSuccessful(true);
      } catch (err: any) {
        setSubmitError(err.message || 'An unexpected error occurred');
        if (onError) {
          onError(err);
        } else {
          console.error('Form submission error:', err);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods, onSubmit, onError]
  );

  const resetForm = useCallback(() => {
    methods.reset();
    setIsSubmitting(false);
    setIsSubmitSuccessful(false);
    setSubmitError(null);
  }, [methods]);

  return {
    ...methods,
    isSubmitting,
    isSubmitSuccessful,
    submitError,
    handleSubmit: handleFormSubmit,
    reset: resetForm,
  };
}
