
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/design-system';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Folder,
  FolderOpen,
  Star,
  Clock,
  Tag,
  Settings,
  MoreVertical,
  Sparkles,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isSmartCollection: boolean;
  rules?: CollectionRule[];
  color: string;
  lastUpdated: string;
}

interface CollectionRule {
  type: 'tag' | 'date' | 'content_type' | 'keyword';
  operator: 'contains' | 'equals' | 'after' | 'before';
  value: string;
}

const SmartCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'React Learning',
      description: 'All React-related content',
      itemCount: 23,
      isSmartCollection: true,
      rules: [{ type: 'tag', operator: 'contains', value: 'react' }],
      color: 'bg-blue-100 text-blue-800',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'This Week\'s Saves',
      description: 'Content saved in the last 7 days',
      itemCount: 12,
      isSmartCollection: true,
      rules: [{ type: 'date', operator: 'after', value: '7-days-ago' }],
      color: 'bg-green-100 text-green-800',
      lastUpdated: 'Just now'
    },
    {
      id: '3',
      name: 'Favorites',
      description: 'My starred content',
      itemCount: 8,
      isSmartCollection: false,
      color: 'bg-yellow-100 text-yellow-800',
      lastUpdated: '1 day ago'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionType, setNewCollectionType] = useState<'manual' | 'smart'>('manual');
  
  const { toast } = useToast();

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      description: newCollectionType === 'smart' ? 'Auto-organized by rules' : 'Manually curated',
      itemCount: 0,
      isSmartCollection: newCollectionType === 'smart',
      color: 'bg-gray-100 text-gray-800',
      lastUpdated: 'Just created'
    };

    setCollections([...collections, newCollection]);
    setNewCollectionName('');
    setShowCreateForm(false);
    
    toast({
      title: "Collection Created",
      description: `${newCollection.name} has been added to your collections.`
    });
  };

  const smartCollectionTemplates = [
    {
      name: 'Recent Videos',
      rules: [
        { type: 'content_type', operator: 'equals', value: 'video' },
        { type: 'date', operator: 'after', value: '30-days-ago' }
      ]
    },
    {
      name: 'AI & Machine Learning',
      rules: [
        { type: 'keyword', operator: 'contains', value: 'artificial intelligence' },
        { type: 'tag', operator: 'contains', value: 'AI' }
      ]
    },
    {
      name: 'Productivity Articles',
      rules: [
        { type: 'tag', operator: 'contains', value: 'productivity' },
        { type: 'content_type', operator: 'equals', value: 'article' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography.H2>Collections</Typography.H2>
          <Typography.Body className="text-muted-foreground">
            Organize your knowledge into focused collections
          </Typography.Body>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Collection
        </Button>
      </div>

      {/* Create Collection Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            
            <div className="flex gap-2">
              <Button
                variant={newCollectionType === 'manual' ? 'default' : 'outline'}
                onClick={() => setNewCollectionType('manual')}
                className="flex-1 gap-2"
              >
                <Folder className="h-4 w-4" />
                Manual Collection
              </Button>
              <Button
                variant={newCollectionType === 'smart' ? 'default' : 'outline'}
                onClick={() => setNewCollectionType('smart')}
                className="flex-1 gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Smart Collection
              </Button>
            </div>

            {newCollectionType === 'smart' && (
              <div className="space-y-2">
                <Typography.Body size="sm" className="text-muted-foreground">
                  Quick templates:
                </Typography.Body>
                <div className="grid grid-cols-1 gap-2">
                  {smartCollectionTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewCollectionName(template.name)}
                      className="justify-start"
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCreateCollection} disabled={!newCollectionName.trim()}>
                Create
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {collection.isSmartCollection ? (
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-muted">
                        <Folder className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={cn(collection.color, 'border-0')}>
                    {collection.itemCount} items
                  </Badge>
                  
                  {collection.isSmartCollection && (
                    <Badge variant="outline" className="gap-1">
                      <Filter className="h-3 w-3" />
                      Auto-updated
                    </Badge>
                  )}
                </div>

                {collection.isSmartCollection && collection.rules && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Rules:</p>
                    {collection.rules.slice(0, 2).map((rule, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {rule.type}: {rule.value}
                      </Badge>
                    ))}
                    {collection.rules.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{collection.rules.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {collection.lastUpdated}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartCollections;
