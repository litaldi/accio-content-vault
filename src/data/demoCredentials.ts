
export const DEMO_CREDENTIALS = {
  regular: {
    email: 'demo@accio.ai',
    password: 'Demo1234',
    label: 'Regular User Demo',
    description: 'Standard user with basic features'
  },
  admin: {
    email: 'admin@accio.ai', 
    password: 'Admin1234',
    label: 'Admin User Demo',
    description: 'Administrator with full access'
  }
} as const;

export type DemoUserType = keyof typeof DEMO_CREDENTIALS;

export const isDemoEmail = (email: string): boolean => {
  return Object.values(DEMO_CREDENTIALS).some(cred => cred.email === email);
};

export const getDemoUserRole = (email: string): 'admin' | 'user' | null => {
  if (email === DEMO_CREDENTIALS.admin.email) return 'admin';
  if (email === DEMO_CREDENTIALS.regular.email) return 'user';
  return null;
};
