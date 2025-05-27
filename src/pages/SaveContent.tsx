
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Globe, FileText, Camera, Link as LinkIcon } from 'lucide-react';

const SaveContent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Quickly save and organize your content with Accio's intelligent capture tools." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Plus className="h-3 w-3 mr-1" />
              Quick Capture
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Save Content to Your Knowledge Base
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Capture articles, notes, ideas, and more. Our AI will automatically organize and make them searchable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* URL Capture */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Save from URL
                </CardTitle>
                <CardDescription>
                  Enter a web page URL to automatically capture and save its content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="https://example.com/article" 
                  type="url"
                  className="w-full"
                />
                <Button className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Capture from URL
                </Button>
              </CardContent>
            </Card>

            {/* Manual Entry */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Manual Entry
                </CardTitle>
                <CardDescription>
                  Create your own notes, ideas, or save text content directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Content title..." 
                  className="w-full"
                />
                <Textarea 
                  placeholder="Enter your content here..."
                  className="w-full min-h-[120px]"
                />
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Save Content
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">Image Capture</h3>
                <p className="text-sm text-muted-foreground">Save images with AI-generated descriptions</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <LinkIcon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">Quick Link</h3>
                <p className="text-sm text-muted-foreground">Save bookmarks and references</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Plus className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">Browser Extension</h3>
                <p className="text-sm text-muted-foreground">Install for one-click saving</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              All saved content is automatically processed by AI for intelligent organization and search.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveContent;
