
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Slack, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  Settings2,
  Users,
  Hash,
  Bell,
  Loader2
} from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { LoadingState } from '@/components/ui/loading-state';

interface SlackConnection {
  isConnected: boolean;
  teamName?: string;
  teamDomain?: string;
  botUserId?: string;
  accessToken?: string;
  channels?: SlackChannel[];
}

interface SlackChannel {
  id: string;
  name: string;
  isPrivate: boolean;
  memberCount: number;
}

const SlackIntegration: React.FC = () => {
  const { showSuccess, showError, showInfo } = useEnhancedToast();
  const [connection, setConnection] = useState<SlackConnection>({ isConnected: false });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [notifications, setNotifications] = useState({
    newContent: true,
    weeklyDigest: true,
    teamActivity: false
  });

  // Mock Slack OAuth URL (in real implementation, this would be generated)
  const getSlackAuthUrl = () => {
    const clientId = 'your-slack-app-client-id';
    const scopes = 'channels:read,chat:write,users:read';
    const redirectUri = encodeURIComponent(`${window.location.origin}/integrations/slack/callback`);
    return `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  };

  const handleConnectSlack = () => {
    setIsLoading(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setConnection({
        isConnected: true,
        teamName: 'Acme Corp',
        teamDomain: 'acmecorp',
        botUserId: 'U01234567',
        channels: [
          { id: 'C1', name: 'general', isPrivate: false, memberCount: 42 },
          { id: 'C2', name: 'product-team', isPrivate: false, memberCount: 12 },
          { id: 'C3', name: 'knowledge-updates', isPrivate: false, memberCount: 8 },
          { id: 'C4', name: 'executive-team', isPrivate: true, memberCount: 5 }
        ]
      });
      setIsLoading(false);
      showSuccess(
        'Slack Connected!', 
        'Successfully connected to your Slack workspace. You can now share knowledge and receive notifications.'
      );
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnection({ isConnected: false });
    setSelectedChannel('');
    showInfo('Slack Disconnected', 'Your Slack integration has been removed.');
  };

  const handleShareToSlack = async () => {
    if (!selectedChannel) {
      showError('Channel Required', 'Please select a channel to share to.');
      return;
    }

    setIsLoading(true);
    
    // Simulate sharing content
    setTimeout(() => {
      setIsLoading(false);
      showSuccess(
        'Shared to Slack!', 
        `Content shared to #${connection.channels?.find(c => c.id === selectedChannel)?.name}`
      );
    }, 1000);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    showInfo(
      'Settings Updated', 
      `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications ${notifications[key] ? 'disabled' : 'enabled'}.`
    );
  };

  if (!connection.isConnected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slack-600 rounded-lg">
              <Slack className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium">Connect to Slack</p>
              <p className="text-sm text-muted-foreground">
                Share knowledge discoveries and get team notifications
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleConnectSlack}
            disabled={isLoading}
            className="bg-slack-600 hover:bg-slack-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Slack className="h-4 w-4 mr-2" />
                Connect Slack
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>✓ Secure OAuth 2.0 authentication</p>
          <p>✓ No data stored on our servers</p>
          <p>✓ You can disconnect at any time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-green-900">Connected to {connection.teamName}</p>
            <p className="text-sm text-green-700">@{connection.teamDomain}.slack.com</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDisconnect}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Disconnect
          </Button>
        </div>
      </div>

      {/* Quick Share */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Hash className="h-4 w-4" />
          Quick Share to Channel
        </h4>
        
        <div className="flex gap-2">
          <select 
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          >
            <option value="">Select a channel...</option>
            {connection.channels?.map(channel => (
              <option key={channel.id} value={channel.id}>
                #{channel.name} ({channel.memberCount} members)
                {channel.isPrivate ? ' 🔒' : ''}
              </option>
            ))}
          </select>
          
          <Button 
            onClick={handleShareToSlack}
            disabled={!selectedChannel || isLoading}
            size="sm"
          >
            Share Current Page
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notification Preferences
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm">New Content Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified when new knowledge is added</p>
            </div>
            <Switch 
              checked={notifications.newContent}
              onCheckedChange={() => handleNotificationChange('newContent')}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Weekly Digest</p>
              <p className="text-xs text-muted-foreground">Summary of team knowledge activity</p>
            </div>
            <Switch 
              checked={notifications.weeklyDigest}
              onCheckedChange={() => handleNotificationChange('weeklyDigest')}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Team Activity</p>
              <p className="text-xs text-muted-foreground">Real-time updates on team interactions</p>
            </div>
            <Switch 
              checked={notifications.teamActivity}
              onCheckedChange={() => handleNotificationChange('teamActivity')}
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="pt-4 border-t">
        <Button variant="outline" size="sm" className="w-full">
          <Settings2 className="h-4 w-4 mr-2" />
          Advanced Slack Settings
        </Button>
      </div>
    </div>
  );
};

export default SlackIntegration;
