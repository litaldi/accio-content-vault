
import { renderHook, act } from '@testing-library/react';
import useFormValidation from '@/hooks/use-form-validation';

describe('useFormValidation', () => {
  it('should initialize with provided values', () => {
    const initialValues = { name: '', email: '' };
    const { result } = renderHook(() => useFormValidation(initialValues, {}));
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.isValid).toBe(true);
  });

  it('should validate fields according to rules', () => {
    const initialValues = { name: '', email: '' };
    const validationRules = {
      name: [
        { validate: (value: string) => value.length > 0, message: 'Name is required' }
      ],
      email: [
        { validate: (value: string) => value.includes('@'), message: 'Invalid email' }
      ]
    };
    
    const { result } = renderHook(() => useFormValidation(initialValues, validationRules));
    
    // Initially fields are not touched, so should be valid
    expect(result.current.isValid).toBe(true);
    
    // Update name with invalid value and touch it
    act(() => {
      result.current.setFieldValue('name', '');
      result.current.touchField('name');
    });
    
    expect(result.current.fields.name.error).toBe('Name is required');
    expect(result.current.isValid).toBe(false);
    
    // Update name with valid value
    act(() => {
      result.current.setFieldValue('name', 'John');
    });
    
    expect(result.current.fields.name.error).toBe('');
    
    // Update email with invalid value
    act(() => {
      result.current.setFieldValue('email', 'invalid');
      result.current.touchField('email');
    });
    
    expect(result.current.fields.email.error).toBe('Invalid email');
    expect(result.current.isValid).toBe(false);
    
    // Update email with valid value
    act(() => {
      result.current.setFieldValue('email', 'john@example.com');
    });
    
    expect(result.current.fields.email.error).toBe('');
    expect(result.current.isValid).toBe(true);
  });

  it('should reset form to initial values', () => {
    const initialValues = { name: '', email: '' };
    const { result } = renderHook(() => useFormValidation(initialValues, {}));
    
    act(() => {
      result.current.setFieldValue('name', 'John');
      result.current.setFieldValue('email', 'john@example.com');
    });
    
    expect(result.current.values).toEqual({ name: 'John', email: 'john@example.com' });
    
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.values).toEqual(initialValues);
  });
});
