
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Search, X } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

interface SemanticSearchBarProps {
  onSearch: (query: string, semantic: boolean) => void;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ onSearch }) => {
  const [isSemanticSearch, setIsSemanticSearch] = useState<boolean>(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });
  
  const { watch, setValue, handleSubmit } = form;
  const query = watch('query');
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.query.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    onSearch(values.query.trim(), isSemanticSearch);
  };
  
  const handleClearSearch = () => {
    setValue('query', '');
    // Optional: trigger a search with empty query to reset results
    // onSearch('', isSemanticSearch);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        placeholder="Search by keyword, tag, or phrase..."
                        className="pl-10 pr-10"
                        autoComplete="off"
                        aria-label="Search query"
                        {...field}
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="min-w-[100px]">
            <Search className="h-4 w-4 mr-2" aria-hidden="true" />
            Search
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="semantic-search"
            checked={isSemanticSearch}
            onCheckedChange={setIsSemanticSearch}
          />
          <Label htmlFor="semantic-search" className="cursor-pointer">
            Use semantic search
          </Label>
        </div>
      </form>
    </Form>
  );
};

export default SemanticSearchBar;
