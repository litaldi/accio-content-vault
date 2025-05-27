
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Globe, FileText, Camera, Link as LinkIcon, Zap, Brain, Sparkles } from 'lucide-react';

const SaveContent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Capture Knowledge Instantly - Never Lose Ideas Again | Accio</title>
        <meta name="description" content="Capture brilliant ideas instantly. Save articles, notes, and insights with AI-powered organization that makes everything discoverable forever." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Lightning-Fast Knowledge Capture
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Capture Ideas Before They Disappear
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save anything in seconds. Our AI instantly organizes, connects, and makes 
              everything searchable so you can focus on creating, not managing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-500" />
                  </div>
                  Save Any Web Content
                </CardTitle>
                <CardDescription>
                  Paste any URL and watch our AI extract the essence, identify key insights, 
                  and organize it perfectly in your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="https://amazing-article.com" 
                  type="url"
                  className="w-full"
                />
                <Button className="w-full group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Brain className="h-4 w-4 mr-2" />
                  Capture with AI Intelligence
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  Create Knowledge Notes
                </CardTitle>
                <CardDescription>
                  Transform thoughts into organized knowledge. Create notes that automatically 
                  connect with your existing content and surface when needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Give your brilliant idea a title..." 
                  className="w-full"
                />
                <Textarea 
                  placeholder="Capture your thoughts, insights, or breakthrough moments..."
                  className="w-full min-h-[120px]"
                />
                <Button className="w-full group bg-gradient-to-r from-purple-500 to-primary hover:from-purple-500/90 hover:to-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Your Knowledge Empire
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-green-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium mb-2">Smart Image Analysis</h3>
                <p className="text-sm text-muted-foreground">AI extracts insights from images and creates searchable descriptions</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-orange-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <LinkIcon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Intelligent Bookmarks</h3>
                <p className="text-sm text-muted-foreground">Save links with context that connects to your existing knowledge</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-blue-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium mb-2">One-Click Extension</h3>
                <p className="text-sm text-muted-foreground">Save from anywhere on the web with our browser extension</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl p-8 border">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered Knowledge Intelligence</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Every piece of content you save is instantly analyzed by our AI to extract insights, 
              create meaningful connections, and make everything discoverable through natural language search.
            </p>
            <Button variant="outline" className="group">
              <Sparkles className="h-4 w-4 mr-2" />
              Learn About Our AI
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveContent;
