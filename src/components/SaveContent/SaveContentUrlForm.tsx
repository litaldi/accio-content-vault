
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/types';
import { Loader2, Save } from 'lucide-react';
import UrlFormFields from './UrlFormFields';
import UrlFormTagSection from './UrlFormTagSection';
import useSaveContentForm from './hooks/useSaveContentForm';

export const formSchema = useSaveContentForm.formSchema;
export type FormData = useSaveContentForm.FormData;

interface SaveContentUrlFormProps {
  onSaveContent?: (url: string, tags: Tag[]) => void;
}

const SaveContentUrlForm: React.FC<SaveContentUrlFormProps> = ({ onSaveContent }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    isLoading,
    error,
    suggestedTag,
    showTagConfirmation,
    setShowTagConfirmation,
    form,
    handleSubmit,
    handleTagConfirmation
  } = useSaveContentForm({ 
    onSaveContent: onSaveContent || (() => {}) 
  });

  const onSubmit = async (data: any) => {
    await handleSubmit(data);
    // Reset local state on successful submission
    if (!error) {
      setTags([]);
      setTagInput('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Save Content by URL
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UrlFormFields form={form} />
          <UrlFormTagSection
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
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

        {/* Tag Confirmation Dialog */}
        {showTagConfirmation && suggestedTag && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Suggested Tag</h4>
            <p className="text-sm text-blue-700 mb-3">
              We suggest adding the tag "{suggestedTag.name}" to this content. Would you like to add it?
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleTagConfirmation(true)}
                disabled={isLoading}
              >
                Add Tag
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleTagConfirmation(false)}
                disabled={isLoading}
              >
                Skip
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SaveContentUrlForm;
