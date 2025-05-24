
import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  isOnline: boolean;
  isLoading: boolean;
  onSync: () => void;
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  isLoading,
  onSync,
  className
}) => {
  if (isOnline && !isLoading) {
    return (
      <Badge 
        variant="outline" 
        className={cn("flex items-center gap-2 text-green-600 border-green-200 bg-green-50", className)}
      >
        <CheckCircle className="h-3 w-3" />
        <span className="hidden sm:inline">Online</span>
      </Badge>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge 
        variant="outline" 
        className={cn(
          "flex items-center gap-2",
          isOnline 
            ? "text-blue-600 border-blue-200 bg-blue-50" 
            : "text-orange-600 border-orange-200 bg-orange-50"
        )}
      >
        {isOnline ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        <span className="hidden sm:inline">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </Badge>
      
      {isOnline && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSync}
          disabled={isLoading}
          className="h-8 px-2"
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          <span className="hidden md:inline ml-1">
            {isLoading ? 'Syncing...' : 'Sync'}
          </span>
        </Button>
      )}
    </div>
  );
};

export default OfflineIndicator;
