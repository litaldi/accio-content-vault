
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Shield, Activity, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityEvent {
  id: string;
  event: string;
  details: any;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const SecurityAuditDashboard: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadSecurityLogs = () => {
      try {
        const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
        const securityEvents = logs.map((log: any, index: number) => ({
          id: `event-${index}`,
          event: log.event,
          details: log.details,
          timestamp: log.timestamp,
          severity: determineSeverity(log.event)
        }));
        
        setEvents(securityEvents.reverse()); // Show newest first
        setLoading(false);
      } catch (error) {
        console.error('Failed to load security logs:', error);
        setLoading(false);
      }
    };

    loadSecurityLogs();
    
    // Refresh logs every 30 seconds
    const interval = setInterval(loadSecurityLogs, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const determineSeverity = (eventType: string): 'low' | 'medium' | 'high' | 'critical' => {
    const criticalEvents = ['malicious_url_manipulation', 'external_script_injection', 'high_suspicious_activity'];
    const highEvents = ['suspicious_activity', 'rapid_form_submissions', 'excessive_api_calls'];
    const mediumEvents = ['signin_failed', 'unhandled_promise_rejection', 'uncaught_error'];
    
    if (criticalEvents.includes(eventType)) return 'critical';
    if (highEvents.includes(eventType)) return 'high';
    if (mediumEvents.includes(eventType)) return 'medium';
    return 'low';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-audit-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Please sign in to view security audit logs.</p>
        </CardContent>
      </Card>
    );
  }

  const criticalCount = events.filter(e => e.severity === 'critical').length;
  const highCount = events.filter(e => e.severity === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Security Audit Dashboard
        </h2>
        <Button onClick={exportLogs} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-orange-500">{highCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last 24h</p>
                <p className="text-2xl font-bold">
                  {events.filter(e => 
                    new Date(e.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {loading ? (
                  <p className="text-muted-foreground">Loading security events...</p>
                ) : events.length === 0 ? (
                  <p className="text-muted-foreground">No security events recorded.</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getSeverityColor(event.severity)} text-white`}>
                              {event.severity.toUpperCase()}
                            </Badge>
                            <span className="font-medium">{event.event}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                          {JSON.stringify(event.details, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardHeader>
              <CardTitle>Critical Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {events.filter(e => e.severity === 'critical').length === 0 ? (
                  <p className="text-muted-foreground">No critical events found.</p>
                ) : (
                  <div className="space-y-3">
                    {events.filter(e => e.severity === 'critical').map((event) => (
                      <div key={event.id} className="border border-red-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-500 text-white">CRITICAL</Badge>
                            <span className="font-medium">{event.event}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                          {JSON.stringify(event.details, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high">
          <Card>
            <CardHeader>
              <CardTitle>High Priority Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {events.filter(e => e.severity === 'high').length === 0 ? (
                  <p className="text-muted-foreground">No high priority events found.</p>
                ) : (
                  <div className="space-y-3">
                    {events.filter(e => e.severity === 'high').map((event) => (
                      <div key={event.id} className="border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-orange-500 text-white">HIGH</Badge>
                            <span className="font-medium">{event.event}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                          {JSON.stringify(event.details, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityAuditDashboard;
