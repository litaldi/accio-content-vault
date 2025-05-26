
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Search, BookmarkPlus, Tag, Brain, Sparkles } from 'lucide-react';

const Playground = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [contentNote, setContentNote] = useState('');

  const demoContent = [
    { title: 'React Performance Tips', tags: ['React', 'Performance', 'JavaScript'], type: 'Article' },
    { title: 'TypeScript Best Practices', tags: ['TypeScript', 'Programming', 'Best Practices'], type: 'Guide' },
    { title: 'AI in Web Development', tags: ['AI', 'Web Development', 'Future Tech'], type: 'Video' }
  ];

  const handleSaveDemo = () => {
    // Demo functionality - just show success
    alert('Demo content saved! In the real app, this would be saved to your knowledge base.');
  };

  const handleSearchDemo = () => {
    // Demo functionality
    alert(`Demo search for "${searchQuery}". In the real app, this would show relevant results from your knowledge base.`);
  };

  return (
    <>
      <Helmet>
        <title>Playground - Try Accio Features</title>
        <meta name="description" content="Try out Accio's powerful features in our interactive playground. Experience AI-powered knowledge management firsthand." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Play className="h-3 w-3 mr-1" />
              Interactive Demo
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Try Accio <span className="text-primary">Playground</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI-driven knowledge management. Try our core features 
              in this interactive playground.
            </p>
          </div>

          <Tabs defaultValue="search" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search">Smart Search</TabsTrigger>
              <TabsTrigger value="save">Save Content</TabsTrigger>
              <TabsTrigger value="organize">AI Organization</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Smart Search Demo
                  </CardTitle>
                  <CardDescription>
                    Try our semantic search that understands context and meaning, not just keywords.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Try searching for 'React performance optimization' or 'TypeScript tips'..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearchDemo}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Sample Content in Your Knowledge Base:</h4>
                    {demoContent.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{item.title}</h5>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="save" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookmarkPlus className="h-5 w-5" />
                    Save Content Demo
                  </CardTitle>
                  <CardDescription>
                    Experience how easy it is to save and organize any content with AI assistance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content URL or Title</label>
                      <Input
                        placeholder="https://example.com/article or 'My Important Note'"
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                      <Textarea
                        placeholder="Add your thoughts, key takeaways, or context..."
                        value={contentNote}
                        onChange={(e) => setContentNote(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleSaveDemo} className="w-full">
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Save to Knowledge Base
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">AI Magic Happens</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When you save content, our AI automatically extracts key information, 
                      suggests relevant tags, and categorizes it for easy discovery.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organize" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Organization Demo
                  </CardTitle>
                  <CardDescription>
                    See how our AI automatically organizes and connects your knowledge.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Auto-Generated Tags
                      </h4>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Performance</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">Frontend</Badge>
                        <Badge variant="secondary">Optimization</Badge>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">Related Content</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• React Hooks Best Practices</li>
                        <li>• JavaScript Performance Guide</li>
                        <li>• Frontend Optimization Tips</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">Smart Connections</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Our AI identifies relationships between your content, creating a knowledge 
                      graph that helps you discover unexpected connections and insights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ready to experience the full power of Accio?
            </p>
            <Button size="lg" asChild>
              <a href="/register">Start Your Free Trial</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;
