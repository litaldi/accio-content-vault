
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

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
  return (
    <div className="flex items-center gap-2">
      <Badge variant={isOnline ? 'default' : 'destructive'} className="gap-1">
        {isOnline ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        {isOnline ? 'Online' : 'Offline'}
      </Badge>
      
      {isOnline && (
        <Button
          variant="outline"
          size="sm"
          onClick={onSync}
          disabled={isLoading}
          className="gap-1"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          Sync
        </Button>
      )}
    </div>
  );
};

export default OfflineIndicator;
