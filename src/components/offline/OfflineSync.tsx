
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WifiOff, Wifi, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface OfflineSyncProps {
  className?: string;
}

const OfflineSync: React.FC<OfflineSyncProps> = ({ className }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncProgress, setSyncProgress] = useState(0);
  const [offlineItems] = useState(3);
  const [issyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
          Offline Sync
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Connection Status</span>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
        
        {offlineItems > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending sync</span>
              <Badge variant="secondary">
                {offlineItems} item{offlineItems !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            {issyncing && (
              <div className="space-y-2">
                <Progress value={syncProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Syncing changes... {syncProgress}%
                </p>
              </div>
            )}
            
            <Button 
              onClick={handleSync}
              disabled={!isOnline || issyncing}
              className="w-full gap-2"
              size="sm"
            >
              {issyncing ? (
                <>
                  <Download className="h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Sync Now
                </>
              )}
            </Button>
          </div>
        )}
        
        {offlineItems === 0 && (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All changes synced</p>
          </div>
        )}
        
        {!isOnline && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                You're offline
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                Changes will sync when connection is restored.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfflineSync;
