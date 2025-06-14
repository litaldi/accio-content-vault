
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Clock, User, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSecureAuth } from '@/contexts/SecureAuthContext';

interface SecurityEvent {
  id: string;
  event_type: string;
  event_details: any;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

export const SecurityAuditDashboard: React.FC = () => {
  const { user } = useSecureAuth();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    suspiciousActivities: 0,
    lastLogin: null as string | null,
    activeDevices: 0
  });

  useEffect(() => {
    if (user) {
      loadSecurityData();
    }
  }, [user]);

  const loadSecurityData = async () => {
    try {
      setLoading(true);
      
      // Load recent security events
      const { data: eventsData, error: eventsError } = await supabase
        .from('security_audit_log')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);

      // Calculate stats
      const suspiciousCount = eventsData?.filter(event => 
        event.event_type.includes('suspicious') || 
        event.event_type.includes('failed') ||
        event.event_type.includes('unauthorized')
      ).length || 0;

      const lastLoginEvent = eventsData?.find(event => 
        event.event_type === 'successful_login'
      );

      setStats({
        totalEvents: eventsData?.length || 0,
        suspiciousActivities: suspiciousCount,
        lastLogin: lastLoginEvent?.created_at || null,
        activeDevices: new Set(eventsData?.map(e => e.user_agent)).size
      });

    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventSeverity = (eventType: string) => {
    if (eventType.includes('suspicious') || eventType.includes('failed') || eventType.includes('unauthorized')) {
      return 'high';
    }
    if (eventType.includes('rate_limit') || eventType.includes('invalid')) {
      return 'medium';
    }
    return 'low';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const formatEventDetails = (details: any) => {
    if (!details || typeof details !== 'object') return 'No additional details';
    
    const keys = Object.keys(details);
    if (keys.length === 0) return 'No additional details';
    
    return keys.slice(0, 3).map(key => 
      `${key}: ${typeof details[key] === 'object' ? JSON.stringify(details[key]) : details[key]}`
    ).join(', ');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Security Audit Dashboard</h2>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div className="text-sm text-muted-foreground">Suspicious Activities</div>
            </div>
            <div className="text-2xl font-bold">{stats.suspiciousActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-green-500" />
              <div className="text-sm text-muted-foreground">Active Devices</div>
            </div>
            <div className="text-2xl font-bold">{stats.activeDevices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div className="text-sm text-muted-foreground">Last Login</div>
            </div>
            <div className="text-sm font-medium">
              {stats.lastLogin ? new Date(stats.lastLogin).toLocaleDateString() : 'Never'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      {stats.suspiciousActivities > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            We've detected {stats.suspiciousActivities} suspicious activities on your account. 
            Please review the events below and contact support if you notice any unauthorized access.
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadSecurityData}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No security events recorded yet.
              </div>
            ) : (
              events.map((event) => {
                const severity = getEventSeverity(event.event_type);
                return (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getSeverityIcon(severity)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {event.event_type.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <Badge variant={getSeverityColor(severity) as any}>
                            {severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatEventDetails(event.event_details)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        {new Date(event.created_at).toLocaleString()}
                      </div>
                      {event.ip_address && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {event.ip_address}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
