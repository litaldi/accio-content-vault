
import { useState, useEffect } from 'react';

export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export type FieldValidation<T> = {
  value: T;
  rules: ValidationRule<T>[];
  touched: boolean;
  error: string;
  isValid: boolean;
};

export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: { [K in keyof T]?: ValidationRule<T[K]>[] }
) => {
  const createInitialState = () => {
    const state: Record<string, FieldValidation<any>> = {};
    
    for (const key in initialValues) {
      state[key] = {
        value: initialValues[key],
        rules: validationRules[key] || [],
        touched: false,
        error: '',
        isValid: true
      };
    }
    
    return state as { [K in keyof T]: FieldValidation<T[K]> };
  };

  const [fields, setFields] = useState<{ [K in keyof T]: FieldValidation<T[K]> }>(createInitialState);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate a single field
  const validateField = <K extends keyof T>(name: K, value: T[K], touched = true): string => {
    if (!validationRules[name] || !touched) return '';
    
    for (const rule of validationRules[name] || []) {
      if (!rule.validate(value)) {
        return rule.message;
      }
    }
    
    return '';
  };
  
  // Update a field value
  const setFieldValue = <K extends keyof T>(name: K, value: T[K]) => {
    setFields(prev => {
      const error = validateField(name, value, prev[name].touched);
      
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
          isValid: !error,
          touched: true
        }
      };
    });
  };
  
  // Mark field as touched (usually on blur)
  const touchField = <K extends keyof T>(name: K) => {
    setFields(prev => {
      const error = validateField(name, prev[name].value, true);
      
      return {
        ...prev,
        [name]: {
          ...prev[name],
          touched: true,
          error,
          isValid: !error
        }
      };
    });
  };
  
  // Reset the form to initial values
  const resetForm = () => {
    setFields(createInitialState());
  };
  
  // Check form validity
  useEffect(() => {
    const valid = Object.values(fields).every(field => field.isValid);
    setIsFormValid(valid);
  }, [fields]);
  
  // Form values as a simple object
  const values = Object.entries(fields).reduce((acc, [key, field]) => {
    // Using type assertion to tell TypeScript that this operation is safe
    (acc as any)[key] = field.value;
    return acc;
  }, {} as T);
  
  return {
    fields,
    setFieldValue,
    touchField,
    resetForm,
    isValid: isFormValid,
    values
  };
};

export default useFormValidation;
