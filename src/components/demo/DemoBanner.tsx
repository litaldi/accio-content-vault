
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, user } = useAuth();

  if (!isDemoMode) return null;

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
      <Sparkles className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2 flex-wrap">
        <span>
          You're viewing the app in demo mode with sample data.
        </span>
        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900">
          Demo Account
        </Badge>
        <span className="text-sm text-muted-foreground">
          All changes are temporary and will reset on page reload.
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;
