
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Globe, FileText, Camera, Link as LinkIcon, Zap, Brain } from 'lucide-react';

const SaveContent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Quick Capture - Save Knowledge Instantly | Accio</title>
        <meta name="description" content="Capture brilliant ideas instantly. Save articles, notes, and insights with AI-powered organization that makes everything discoverable." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Quick Knowledge Capture
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Never Lose Another Brilliant Idea
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Capture anything instantly. Our AI automatically organizes, tags, and makes 
              everything searchable so you can focus on creating, not organizing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* URL Capture */}
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-500" />
                  </div>
                  Save Any Web Page
                </CardTitle>
                <CardDescription>
                  Paste any URL and we'll capture the full content, extract key insights, 
                  and organize it automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="https://example.com/amazing-article" 
                  type="url"
                  className="w-full"
                />
                <Button className="w-full group">
                  <Brain className="h-4 w-4 mr-2" />
                  Capture & Analyze with AI
                </Button>
              </CardContent>
            </Card>

            {/* Manual Entry */}
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  Create Knowledge Notes
                </CardTitle>
                <CardDescription>
                  Turn thoughts into organized knowledge. Write notes, ideas, or insights 
                  that connect with your existing content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Give your knowledge a title..." 
                  className="w-full"
                />
                <Textarea 
                  placeholder="Share your thoughts, insights, or discoveries..."
                  className="w-full min-h-[120px]"
                />
                <Button className="w-full group">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Knowledge Base
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-green-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium mb-2">Smart Image Capture</h3>
                <p className="text-sm text-muted-foreground">Save images with AI-generated descriptions and insights</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-orange-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <LinkIcon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Quick Bookmarks</h3>
                <p className="text-sm text-muted-foreground">Save important links with context and connections</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-blue-500/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium mb-2">Browser Extension</h3>
                <p className="text-sm text-muted-foreground">One-click saving from anywhere on the web</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-muted/50 rounded-xl p-6">
            <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">AI-Powered Organization</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Every piece of content you save is automatically processed by our AI to extract insights, 
              create connections, and make everything instantly discoverable through semantic search.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveContent;
