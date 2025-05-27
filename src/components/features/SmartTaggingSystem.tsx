
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tag, 
  Plus, 
  X, 
  Sparkles, 
  TrendingUp,
  Hash,
  Filter
} from 'lucide-react';

export const SmartTaggingSystem = () => {
  const [newTag, setNewTag] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['AI', 'Knowledge Management']);

  const suggestedTags = [
    { name: 'Machine Learning', confidence: 95, trending: true },
    { name: 'Data Science', confidence: 88, trending: false },
    { name: 'Productivity', confidence: 92, trending: true },
    { name: 'Research', confidence: 85, trending: false },
    { name: 'Innovation', confidence: 78, trending: true },
    { name: 'Technology', confidence: 90, trending: false }
  ];

  const popularTags = [
    { name: 'AI', count: 156, growth: '+12%' },
    { name: 'Productivity', count: 134, growth: '+8%' },
    { name: 'Learning', count: 98, growth: '+15%' },
    { name: 'Technology', count: 87, growth: '+5%' },
    { name: 'Research', count: 76, growth: '+22%' },
    { name: 'Innovation', count: 65, growth: '+18%' }
  ];

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTag(newTag);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Smart Tagging System
            <Badge variant="secondary">AI-Enhanced</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tag Input */}
          <div>
            <h4 className="font-medium mb-3">Add Tags</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Enter a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={() => addTag(newTag)} disabled={!newTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Tags */}
          <div>
            <h4 className="font-medium mb-3">Selected Tags</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="default" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedTags.length === 0 && (
                <p className="text-sm text-muted-foreground">No tags selected</p>
              )}
            </div>
          </div>

          {/* AI Suggested Tags */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Suggested Tags
            </h4>
            <div className="space-y-2">
              {suggestedTags.map((tag) => (
                <div key={tag.name} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{tag.name}</span>
                    {tag.trending && (
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {tag.confidence}% confidence
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addTag(tag.name)}
                      disabled={selectedTags.includes(tag.name)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Popular Tags
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {popularTags.map((tag) => (
                <Card key={tag.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{tag.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          {tag.count} items
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {tag.growth}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-1 h-6 text-xs"
                          onClick={() => addTag(tag.name)}
                          disabled={selectedTags.includes(tag.name)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tag Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Tags
            </Button>
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Auto-Tag Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
