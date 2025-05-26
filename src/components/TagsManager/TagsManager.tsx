
import React, { useState, useEffect } from 'react';
import { Settings, Plus, X, Edit2, Trash2, Merge, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
  createdAt: string;
  lastUsed: string;
}

const mockTags: Tag[] = [
  { id: '1', name: 'javascript', color: '#f1c40f', count: 45, createdAt: '2024-01-01', lastUsed: '2024-01-15' },
  { id: '2', name: 'react', color: '#3498db', count: 32, createdAt: '2024-01-02', lastUsed: '2024-01-14' },
  { id: '3', name: 'typescript', color: '#9b59b6', count: 28, createdAt: '2024-01-03', lastUsed: '2024-01-13' },
  { id: '4', name: 'web-development', color: '#e74c3c', count: 56, createdAt: '2024-01-04', lastUsed: '2024-01-12' },
  { id: '5', name: 'css', color: '#2ecc71', count: 23, createdAt: '2024-01-05', lastUsed: '2024-01-11' },
  { id: '6', name: 'html', color: '#e67e22', count: 19, createdAt: '2024-01-06', lastUsed: '2024-01-10' },
  { id: '7', name: 'programming', color: '#34495e', count: 67, createdAt: '2024-01-07', lastUsed: '2024-01-09' },
  { id: '8', name: 'tutorial', color: '#f39c12', count: 41, createdAt: '2024-01-08', lastUsed: '2024-01-08' },
];

interface TagsManagerProps {
  className?: string;
}

export const TagsManager: React.FC<TagsManagerProps> = ({ className }) => {
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'count' | 'recent'>('count');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const filteredTags = tags
    .filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'count':
          return b.count - a.count;
        case 'recent':
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
        default:
          return 0;
      }
    });

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;
    
    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName.toLowerCase().replace(/\s+/g, '-'),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      count: 0,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
    };
    
    setTags(prev => [...prev, newTag]);
    setNewTagName('');
    
    toast({
      title: "Tag created",
      description: `Tag "${newTag.name}" has been created successfully.`,
    });
  };

  const handleRenameTag = (tag: Tag, newName: string) => {
    if (!newName.trim()) return;
    
    setTags(prev => prev.map(t => 
      t.id === tag.id 
        ? { ...t, name: newName.toLowerCase().replace(/\s+/g, '-') }
        : t
    ));
    
    setEditingTag(null);
    
    toast({
      title: "Tag renamed",
      description: `Tag renamed to "${newName}".`,
    });
  };

  const handleDeleteTags = (tagIds: string[]) => {
    setTags(prev => prev.filter(t => !tagIds.includes(t.id)));
    setSelectedTags([]);
    
    toast({
      title: "Tags deleted",
      description: `${tagIds.length} tag(s) have been deleted.`,
    });
  };

  const handleMergeTags = (targetTagId: string, sourceTagIds: string[]) => {
    const targetTag = tags.find(t => t.id === targetTagId);
    const sourceTags = tags.filter(t => sourceTagIds.includes(t.id));
    
    if (!targetTag || sourceTags.length === 0) return;
    
    const mergedCount = targetTag.count + sourceTags.reduce((sum, tag) => sum + tag.count, 0);
    
    setTags(prev => prev
      .filter(t => !sourceTagIds.includes(t.id))
      .map(t => t.id === targetTagId ? { ...t, count: mergedCount } : t)
    );
    
    setSelectedTags([]);
    
    toast({
      title: "Tags merged",
      description: `${sourceTags.length} tag(s) merged into "${targetTag.name}".`,
    });
  };

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Settings className="h-4 w-4 mr-2" />
          Manage Tags
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Tags Manager
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="count">Sort by count</option>
                <option value="name">Sort by name</option>
                <option value="recent">Sort by recent</option>
              </select>
            </div>
          </div>

          {/* Create new tag */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Create New Tag</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter tag name..."
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
                />
                <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bulk actions */}
          {selectedTags.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedTags.length} tag(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTags(selectedTags)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                    {selectedTags.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Simple merge: merge all into first selected
                          const [target, ...sources] = selectedTags;
                          handleMergeTags(target, sources);
                        }}
                      >
                        <Merge className="h-3 w-3 mr-1" />
                        Merge
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags list */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Tags ({filteredTags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors",
                      selectedTags.includes(tag.id) 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => toggleTagSelection(tag.id)}
                        className="rounded"
                      />
                      
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      
                      <div className="flex-1">
                        {editingTag?.id === tag.id ? (
                          <Input
                            value={editingTag.name}
                            onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleRenameTag(tag, editingTag.name);
                              } else if (e.key === 'Escape') {
                                setEditingTag(null);
                              }
                            }}
                            onBlur={() => handleRenameTag(tag, editingTag.name)}
                            className="h-6 text-sm"
                            autoFocus
                          />
                        ) : (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{tag.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {tag.count}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last used: {new Date(tag.lastUsed).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingTag(tag)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTags([tag.id])}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredTags.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No tags found</p>
                    {searchQuery && (
                      <p className="text-sm">Try adjusting your search terms</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagsManager;
