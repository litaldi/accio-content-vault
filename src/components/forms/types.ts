
export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  required?: boolean;
  validation?: (value: string) => { isValid: boolean; message: string };
  placeholder?: string;
  description?: string;
}
