
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WifiOff, Wifi, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineItem {
  id: string;
  title: string;
  type: 'article' | 'document' | 'bookmark';
  downloadedAt: Date;
  size: number;
  status: 'synced' | 'pending' | 'conflict';
}

const OfflineSync: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineItems, setOfflineItems] = useState<OfflineItem[]>([]);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back online",
        description: "Your content will sync automatically."
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Don't worry, your saved content is still available.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Mock offline items
  useEffect(() => {
    const mockItems: OfflineItem[] = [
      {
        id: '1',
        title: 'React Performance Optimization Guide',
        type: 'article',
        downloadedAt: new Date(),
        size: 2.5,
        status: 'synced'
      },
      {
        id: '2',
        title: 'Design System Documentation',
        type: 'document',
        downloadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        size: 5.2,
        status: 'pending'
      }
    ];
    setOfflineItems(mockItems);
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSyncProgress(i);
    }

    setIsSyncing(false);
    toast({
      title: "Sync complete",
      description: "All your content is up to date."
    });
  };

  const formatSize = (size: number) => {
    return size > 1 ? `${size.toFixed(1)} MB` : `${(size * 1024).toFixed(0)} KB`;
  };

  const getStatusIcon = (status: OfflineItem['status']) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Upload className="h-4 w-4 text-orange-500" />;
      case 'conflict': return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: OfflineItem['status']) => {
    switch (status) {
      case 'synced': return 'bg-green-500/10 text-green-600';
      case 'pending': return 'bg-orange-500/10 text-orange-600';
      case 'conflict': return 'bg-red-500/10 text-red-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            Offline Content
          </div>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sync Status */}
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Syncing...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          )}

          {/* Sync Button */}
          <Button
            onClick={handleSync}
            disabled={!isOnline || isSyncing}
            className="w-full"
            variant={isOnline ? "default" : "secondary"}
          >
            {isSyncing ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : isOnline ? (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Sync Now
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 mr-2" />
                Offline Mode
              </>
            )}
          </Button>

          {/* Offline Items */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Available Offline</h4>
            {offlineItems.length > 0 ? (
              offlineItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatSize(item.size)}</span>
                      <span>•</span>
                      <span>{item.downloadedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No offline content available</p>
            )}
          </div>

          {/* Storage Info */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <div className="flex justify-between">
              <span>Offline storage used:</span>
              <span>{formatSize(offlineItems.reduce((acc, item) => acc + item.size, 0))}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineSync;
