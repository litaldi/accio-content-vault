
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Link, FileText } from 'lucide-react';

const Save: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save and organize your content with Accio" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Save Content</h1>
          <p className="text-muted-foreground">
            Add new content to your knowledge library
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Save from URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/article"
                  type="url"
                />
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Save URL
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter note title"
                />
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Save;
