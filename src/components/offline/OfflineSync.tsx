
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';

interface OfflineSyncProps {
  className?: string;
}

interface SyncStatus {
  isOnline: boolean;
  pendingUploads: number;
  lastSyncTime: Date | null;
  downloadProgress: number;
  isDownloading: boolean;
  isSyncing: boolean;
  offlineContent: number;
}

const OfflineSync: React.FC<OfflineSyncProps> = ({ className }) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    pendingUploads: 0,
    lastSyncTime: null,
    downloadProgress: 0,
    isDownloading: false,
    isSyncing: false,
    offlineContent: 12
  });

  const { showSuccess, showWarning } = useEnhancedToast();

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      showSuccess('Connection Restored', 'You are back online. Syncing your data...');
      autoSync();
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
      showWarning('Offline Mode', 'Working offline. Changes will sync when you reconnect.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load stored sync data
    loadSyncStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadSyncStatus = () => {
    try {
      const stored = localStorage.getItem('accio_sync_status');
      if (stored) {
        const data = JSON.parse(stored);
        setSyncStatus(prev => ({
          ...prev,
          pendingUploads: data.pendingUploads || 0,
          lastSyncTime: data.lastSyncTime ? new Date(data.lastSyncTime) : null,
          offlineContent: data.offlineContent || 0
        }));
      }
    } catch {
      // Handle parsing errors silently
    }
  };

  const saveSyncStatus = (status: Partial<SyncStatus>) => {
    try {
      const current = { ...syncStatus, ...status };
      localStorage.setItem('accio_sync_status', JSON.stringify({
        pendingUploads: current.pendingUploads,
        lastSyncTime: current.lastSyncTime,
        offlineContent: current.offlineContent
      }));
      setSyncStatus(current);
    } catch {
      // Handle storage errors silently
    }
  };

  const autoSync = async () => {
    if (!syncStatus.isOnline || syncStatus.isSyncing) return;

    saveSyncStatus({ isSyncing: true });

    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      saveSyncStatus({
        isSyncing: false,
        pendingUploads: 0,
        lastSyncTime: new Date()
      });

      showSuccess('Sync Complete', 'All your changes have been synchronized.');
    } catch (error) {
      saveSyncStatus({ isSyncing: false });
      showWarning('Sync Failed', 'Unable to sync. Will retry automatically.');
    }
  };

  const downloadForOffline = async () => {
    saveSyncStatus({ isDownloading: true, downloadProgress: 0 });

    try {
      // Simulate download with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        saveSyncStatus({ downloadProgress: i });
      }

      saveSyncStatus({
        isDownloading: false,
        downloadProgress: 100,
        offlineContent: syncStatus.offlineContent + 5
      });

      showSuccess('Download Complete', 'Content is now available offline.');
    } catch (error) {
      saveSyncStatus({ isDownloading: false, downloadProgress: 0 });
      showWarning('Download Failed', 'Unable to download content for offline use.');
    }
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {syncStatus.isOnline ? (
            <Wifi className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
          Offline & Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Status</span>
          <Badge variant={syncStatus.isOnline ? "default" : "secondary"}>
            {syncStatus.isOnline ? "Online" : "Offline"}
          </Badge>
        </div>

        {/* Last Sync */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Last sync</span>
          <span className="text-sm text-muted-foreground">
            {formatLastSync(syncStatus.lastSyncTime)}
          </span>
        </div>

        {/* Pending Uploads */}
        {syncStatus.pendingUploads > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Pending uploads</span>
            <Badge variant="outline" className="text-orange-600">
              {syncStatus.pendingUploads}
            </Badge>
          </div>
        )}

        {/* Offline Content */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Offline content</span>
          <Badge variant="secondary">
            {syncStatus.offlineContent} items
          </Badge>
        </div>

        {/* Download Progress */}
        {syncStatus.isDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Downloading...</span>
              <span>{syncStatus.downloadProgress}%</span>
            </div>
            <Progress value={syncStatus.downloadProgress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {syncStatus.isOnline && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={autoSync}
              disabled={syncStatus.isSyncing}
            >
              {syncStatus.isSyncing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {syncStatus.isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={downloadForOffline}
            disabled={syncStatus.isDownloading || !syncStatus.isOnline}
          >
            {syncStatus.isDownloading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download for Offline
          </Button>
        </div>

        {/* Status Messages */}
        {!syncStatus.isOnline && (
          <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-300">
                Working Offline
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 mt-1">
                Your changes will sync automatically when you reconnect.
              </p>
            </div>
          </div>
        )}

        {syncStatus.isOnline && syncStatus.lastSyncTime && (
          <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-green-700 dark:text-green-300">
                Up to Date
              </p>
              <p className="text-green-600 dark:text-green-400 mt-1">
                All your content is synchronized across devices.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfflineSync;
