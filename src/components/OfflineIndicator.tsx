
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OfflineIndicatorProps {
  isOnline: boolean;
  isLoading: boolean;
  onSync: () => void;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  isLoading,
  onSync
}) => {
  if (isOnline) {
    return (
      <Badge variant="secondary" className="flex items-center gap-2">
        <Wifi className="h-3 w-3" />
        Online
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="destructive" className="flex items-center gap-2">
        <WifiOff className="h-3 w-3" />
        Offline
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={onSync}
        disabled={isLoading}
        className="h-6"
      >
        {isLoading ? (
          <RefreshCw className="h-3 w-3 animate-spin" />
        ) : (
          'Sync'
        )}
      </Button>
    </div>
  );
};

export default OfflineIndicator;
