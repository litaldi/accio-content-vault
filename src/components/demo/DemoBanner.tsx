
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DemoBanner: React.FC = () => {
  const { user, isDemoMode } = useAuth();
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isDemoMode || !isVisible || user) {
    return null;
  }

  return (
    <Alert className="border-blue-200 bg-blue-50 text-blue-800">
      <Info className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          You're viewing the demo version. Sign up to save your data and access all features!
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss demo banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;
