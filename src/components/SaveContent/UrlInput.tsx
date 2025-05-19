
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LinkIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Use the same form schema as in useSaveContentForm
const formSchema = z.object({
  url: z.string()
    .trim()
    .min(1, { message: "URL is required" })
    .refine((url) => {
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch (e) {
        return false;
      }
    }, { message: "Please enter a valid URL" })
});

type FormValues = z.infer<typeof formSchema>;

interface UrlInputProps {
  form: UseFormReturn<FormValues>;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ form, isLoading }) => {
  return (
    <FormField
      control={form.control}
      name="url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>URL</FormLabel>
          <div className="flex items-center relative">
            <LinkIcon className="w-4 h-4 absolute left-3 text-muted-foreground" aria-hidden="true" />
            <FormControl>
              <Input 
                placeholder="https://example.com" 
                className="pl-9"
                {...field} 
                disabled={isLoading}
                aria-label="URL to save"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UrlInput;
