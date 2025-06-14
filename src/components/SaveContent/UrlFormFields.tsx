
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link as LinkIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from './SaveContentUrlForm'; // Import FormData type

interface UrlFormFieldsProps {
  form: UseFormReturn<FormData>;
}

const UrlFormFields: React.FC<UrlFormFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="url">URL *</Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
    </>
  );
};

export default UrlFormFields;
