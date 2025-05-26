
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Settings, 
  Share2, 
  MessageSquare,
  Clock,
  Star,
  Lock,
  Globe
} from 'lucide-react';

export const CollaborativeWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([
    {
      id: '1',
      name: 'Product Research',
      description: 'Collaborative research for Q2 product features',
      members: 8,
      contentCount: 156,
      visibility: 'private',
      lastActivity: '2 hours ago',
      isStarred: true,
      recentActivity: [
        { user: 'Sarah M.', action: 'added new article', time: '30m ago' },
        { user: 'John D.', action: 'commented on design doc', time: '1h ago' }
      ]
    },
    {
      id: '2',
      name: 'Engineering Documentation',
      description: 'Shared knowledge base for the development team',
      members: 12,
      contentCount: 89,
      visibility: 'team',
      lastActivity: '5 hours ago',
      isStarred: false,
      recentActivity: [
        { user: 'Alex P.', action: 'updated API documentation', time: '2h ago' },
        { user: 'Maria G.', action: 'shared code snippets', time: '3h ago' }
      ]
    },
    {
      id: '3',
      name: 'Public Resources',
      description: 'Curated resources for the community',
      members: 45,
      contentCount: 234,
      visibility: 'public',
      lastActivity: '1 day ago',
      isStarred: false,
      recentActivity: [
        { user: 'David L.', action: 'published tutorial', time: '6h ago' },
        { user: 'Lisa K.', action: 'added learning path', time: '1d ago' }
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const createWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
        id: Date.now().toString(),
        name: newWorkspaceName,
        description: 'New collaborative workspace',
        members: 1,
        contentCount: 0,
        visibility: 'private',
        lastActivity: 'just now',
        isStarred: false,
        recentActivity: []
      };
      setWorkspaces([newWorkspace, ...workspaces]);
      setNewWorkspaceName('');
      setShowCreateForm(false);
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Globe className="h-3 w-3" />;
      case 'team': return <Users className="h-3 w-3" />;
      default: return <Lock className="h-3 w-3" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-green-500';
      case 'team': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Collaborative Workspaces
            </CardTitle>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Workspace
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {showCreateForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter workspace name..."
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createWorkspace()}
                  />
                  <Button onClick={createWorkspace}>Create</Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      {workspace.isStarred && (
                        <Star className="h-4 w-4 text-yellow-500 mt-1" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{workspace.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          {workspace.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {workspace.members} members
                          </div>
                          <div>{workspace.contentCount} items</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workspace.lastActivity}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className="flex items-center gap-1"
                      >
                        <div className={`w-2 h-2 rounded-full ${getVisibilityColor(workspace.visibility)}`} />
                        {getVisibilityIcon(workspace.visibility)}
                        {workspace.visibility}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {workspace.recentActivity.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Recent Activity
                      </h4>
                      <div className="space-y-2">
                        {workspace.recentActivity.slice(0, 2).map((activity, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {activity.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">
                              <span className="font-medium text-foreground">{activity.user}</span> {activity.action}
                            </span>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {activity.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
