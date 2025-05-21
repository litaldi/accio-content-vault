
import { renderHook, act } from '@testing-library/react';
import { useEnhancedForm } from '@/hooks/use-enhanced-form';
import { z } from 'zod';
import { waitFor } from '@testing-library/react';

// Create a more complete mock event that satisfies BaseSyntheticEvent
const createMockEvent = () => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  nativeEvent: {} as Event,
  target: document.createElement('form'),
  currentTarget: document.createElement('form'),
  bubbles: true,
  cancelable: true,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: true,
  timeStamp: Date.now(),
  type: 'submit',
  isDefaultPrevented: () => false,
  isPropagationStopped: () => false,
  persist: () => {},
});

describe('useEnhancedForm', () => {
  // Create a simple validation schema for testing
  const testSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
  });

  // Default values for the form
  const defaultValues = {
    name: '',
    email: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useEnhancedForm({
      validationSchema: testSchema,
      defaultValues,
    }));

    expect(result.current.getValues()).toEqual(defaultValues);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSubmitSuccessful).toBe(false);
    expect(result.current.submitError).toBeNull();
  });

  it('should validate form fields according to schema', async () => {
    const { result } = renderHook(() => useEnhancedForm({
      validationSchema: testSchema,
      defaultValues,
    }));

    // Set invalid values and attempt to submit
    act(() => {
      result.current.setValue('name', '');
      result.current.setValue('email', 'invalid-email');
    });

    // Try to submit the form with proper mock event
    await act(async () => {
      await result.current.handleSubmit(createMockEvent());
    });

    // Check validation errors
    expect(result.current.formState.errors.name).toBeDefined();
    expect(result.current.formState.errors.email).toBeDefined();
    expect(createMockEvent().preventDefault).toHaveBeenCalled();
  });

  it('should call onSubmit when form is valid', async () => {
    const onSubmitMock = jest.fn();
    
    const { result } = renderHook(() => useEnhancedForm({
      validationSchema: testSchema,
      defaultValues,
      onSubmit: onSubmitMock,
    }));

    // Set valid values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
    });

    // Submit the form with proper mock event
    await act(async () => {
      await result.current.handleSubmit(createMockEvent());
    });

    // Check if onSubmit was called with the form values
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(result.current.isSubmitSuccessful).toBe(true);
  });

  it('should handle submission errors', async () => {
    const errorMessage = 'Submission failed';
    const onSubmitMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    const onErrorMock = jest.fn();
    
    const { result } = renderHook(() => useEnhancedForm({
      validationSchema: testSchema,
      defaultValues,
      onSubmit: onSubmitMock,
      onError: onErrorMock,
    }));

    // Set valid values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
    });

    // Submit the form with proper mock event
    await act(async () => {
      await result.current.handleSubmit(createMockEvent());
    });

    // Check error handling
    expect(onSubmitMock).toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalled();
    expect(result.current.submitError).toBe(errorMessage);
    expect(result.current.isSubmitSuccessful).toBe(false);
  });

  it('should reset the form state', async () => {
    const onSubmitMock = jest.fn();
    
    const { result } = renderHook(() => useEnhancedForm({
      validationSchema: testSchema,
      defaultValues,
      onSubmit: onSubmitMock,
    }));

    // Set some values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
    });

    // Submit successfully
    await act(async () => {
      await result.current.handleSubmit(createMockEvent());
    });

    expect(result.current.isSubmitSuccessful).toBe(true);
    
    // Reset form
    act(() => {
      result.current.reset();
    });

    // Check if form state is reset
    expect(result.current.getValues()).toEqual(defaultValues);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSubmitSuccessful).toBe(false);
    expect(result.current.submitError).toBeNull();
  });
});
