import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOfflineContent } from '@/hooks/useOfflineContent';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OfflineContentList from '@/components/OfflineContentList';
import OfflineIndicator from '@/components/OfflineIndicator';
import { Download, Wifi, Database, RefreshCw } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

const OfflinePage: React.FC = () => {
  const {
    offlineContents,
    offlineTags,
    isOnline,
    isLoading,
    syncWithServer,
    canAccessOffline
  } = useOfflineContent();

  const offlineOnlyCount = offlineContents.filter((c: any) => c.isOfflineOnly).length;
  const cachedCount = offlineContents.length - offlineOnlyCount;

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Offline Access - Accio</title>
        <meta name="description" content="Access your saved content offline" />
      </Helmet>
      
      <div className="py-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <UnifiedTypography.H1>Offline Access</UnifiedTypography.H1>
            <UnifiedTypography.Body>
              View and interact with your saved content, even without internet
            </UnifiedTypography.Body>
          </div>
          
          <OfflineIndicator
            isOnline={isOnline}
            isLoading={isLoading}
            onSync={syncWithServer}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cached Content</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cachedCount}</div>
              <p className="text-xs text-muted-foreground">
                Available offline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline Only</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offlineOnlyCount}</div>
              <p className="text-xs text-muted-foreground">
                Needs sync
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tags Cached</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offlineTags.length}</div>
              <p className="text-xs text-muted-foreground">
                For organization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <p className="text-xs text-muted-foreground">
                {canAccessOffline ? 'Offline ready' : 'No offline support'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Offline Content List */}
        {canAccessOffline ? (
          <OfflineContentList
            contents={offlineContents}
            isOnline={isOnline}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Offline Access Unavailable</CardTitle>
              <CardDescription>
                Your browser doesn't support the features needed for offline access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                To enable offline access, please use a modern browser that supports IndexedDB and Service Workers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </UnifiedLayout>
  );
};

export default OfflinePage;
