
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, FieldValues, DefaultValues, SubmitHandler } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

interface UseEnhancedFormProps<TFormValues extends FieldValues> {
  validationSchema: ZodType<TFormValues, ZodTypeDef, TFormValues>;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit?: (data: TFormValues) => Promise<void> | void;
  onError?: (error: any) => void;
}

// Modified interface to not extend UseFormReturn to avoid type conflicts
interface UseEnhancedFormReturn<TFormValues extends FieldValues> {
  // Include all UseFormReturn properties
  control: UseFormReturn<TFormValues>['control'];
  formState: UseFormReturn<TFormValues>['formState'];
  getValues: UseFormReturn<TFormValues>['getValues'];
  setValue: UseFormReturn<TFormValues>['setValue'];
  setError: UseFormReturn<TFormValues>['setError'];
  clearErrors: UseFormReturn<TFormValues>['clearErrors'];
  trigger: UseFormReturn<TFormValues>['trigger'];
  register: UseFormReturn<TFormValues>['register'];
  watch: UseFormReturn<TFormValues>['watch'];
  reset: () => void;
  unregister: UseFormReturn<TFormValues>['unregister'];
  getFieldState: UseFormReturn<TFormValues>['getFieldState'];
  resetField: UseFormReturn<TFormValues>['resetField'];
  setFocus: UseFormReturn<TFormValues>['setFocus'];
  
  // Our custom properties
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  submitError: string | null;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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
      if (e?.preventDefault) {
        e.preventDefault();
      }
      
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
