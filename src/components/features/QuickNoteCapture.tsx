
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Tag, 
  Save, 
  Mic,
  Image,
  Link,
  Clock,
  Hash,
  Sparkles,
  FileText,
  Zap
} from 'lucide-react';

export const QuickNoteCapture = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const suggestedTags = ['idea', 'research', 'meeting', 'todo', 'insight', 'reference'];
  
  const recentNotes = [
    {
      id: 1,
      title: "AI Implementation Strategy",
      preview: "Key considerations for implementing AI in our workflow...",
      tags: ['ai', 'strategy', 'planning'],
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Team Meeting Notes",
      preview: "Discussed quarterly goals and resource allocation...",
      tags: ['meeting', 'goals', 'team'],
      timestamp: "1 day ago"
    },
    {
      id: 3,
      title: "Research Findings",
      preview: "Interesting insights from competitor analysis...",
      tags: ['research', 'analysis', 'insights'],
      timestamp: "3 days ago"
    }
  ];

  const handleSaveNote = () => {
    if (!title.trim() && !content.trim()) return;
    
    // Simulate saving
    console.log('Saving note:', { title, content, tags });
    
    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Quick Note Capture
            <Badge variant="secondary">Fast Entry</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Capture Form */}
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Note title (optional)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="What's on your mind? Start typing or use voice input..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Input Tools */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className={isRecording ? 'bg-red-50 border-red-200' : ''}
              >
                <Mic className={`h-4 w-4 mr-2 ${isRecording ? 'text-red-500' : ''}`} />
                {isRecording ? 'Stop Recording' : 'Voice Input'}
              </Button>
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>

            {/* Tags Section */}
            <div>
              <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h5>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="default" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <span className="ml-1 text-xs">×</span>
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
                  className="flex-1"
                />
                <Button onClick={() => addTag(newTag)} size="sm" disabled={!newTag}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-muted-foreground mr-2">Suggested:</span>
                {suggestedTags.filter(tag => !tags.includes(tag)).map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    onClick={() => addTag(tag)}
                    className="h-6 px-2 text-xs"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Save Actions */}
            <div className="flex gap-2">
              <Button onClick={handleSaveNote} disabled={!title.trim() && !content.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
              <Button variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                Auto-Tag
              </Button>
            </div>
          </div>

          {/* Recent Notes */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Notes
            </h4>
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium mb-1">{note.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{note.preview}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                        </div>
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Quick Templates
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View All Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
