
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tag } from '@/types';
import { Plus, X, Loader2, Link, Save } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SaveContentProps {
  onSaveContent?: (url: string, tags: Tag[]) => void;
}

const SaveContent: React.FC<SaveContentProps> = ({ onSaveContent }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      title: '',
      description: '',
    },
  });

  const addTag = (tagName: string) => {
    if (tagName.trim() && !tags.find(tag => tag.name === tagName.trim())) {
      const newTag: Tag = {
        id: `temp-${Date.now()}`,
        name: tagName.trim(),
        auto_generated: false,
        confirmed: true,
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Content saved successfully!",
        description: "Your content has been saved to your collection.",
      });

      onSaveContent?.(data.url, tags);
      form.reset();
      setTags([]);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Save Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <div className="relative">
              <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                placeholder="https://example.com"
                className="pl-10"
                {...form.register('url')}
                aria-describedby="url-error"
              />
            </div>
            {form.formState.errors.url && (
              <p id="url-error" className="text-sm text-destructive">
                {form.formState.errors.url.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...form.register('title')}
              aria-describedby="title-error"
            />
            {form.formState.errors.title && (
              <p id="title-error" className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description (optional)"
              rows={3}
              {...form.register('description')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-describedby="tags-help"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p id="tags-help" className="text-xs text-muted-foreground">
              Press Enter or click + to add tags
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                    {tag.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTag(tag.id)}
                      aria-label={`Remove ${tag.name} tag`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Content'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SaveContent;
