
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FormField } from './FormField';
import { FormFieldConfig } from './types';
import { sanitizeInput, validateEmail } from '@/utils/security';
import { cn } from '@/lib/utils';

interface DynamicFormProps {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  className?: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  description,
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => 
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateField = useCallback((field: FormFieldConfig, value: string) => {
    if (field.required && !value.trim()) {
      return { isValid: false, message: `${field.label} is required` };
    }

    if (field.type === 'email' && value.trim()) {
      return validateEmail(value);
    }

    if (field.validation && value.trim()) {
      return field.validation(value);
    }

    return { isValid: true, message: '' };
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      const result = validateField(field, formData[field.name]);
      if (!result.isValid) {
        newErrors[field.name] = result.message;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields, formData, validateField]);

  const updateField = (fieldName: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [fieldName]: sanitizedValue }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    } catch (error: any) {
      setSubmitError(error.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormProgress = () => {
    const filledFields = fields.filter(field => formData[field.name].trim()).length;
    return (filledFields / fields.length) * 100;
  };

  if (isSubmitted) {
    return (
      <Card className={cn("max-w-md mx-auto", className)}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Success!</h3>
              <p className="text-muted-foreground">Your form has been submitted successfully.</p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Submit Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span>{Math.round(getFormProgress())}%</span>
          </div>
          <Progress value={getFormProgress()} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              error={errors[field.name]}
              onChange={(value) => updateField(field.name, value)}
              disabled={isSubmitting}
            />
          ))}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
