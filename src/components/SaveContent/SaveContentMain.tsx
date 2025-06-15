
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText, Sparkles } from 'lucide-react';
import SaveContentForm from '@/components/SaveContent';
import FileUploadForm from '@/components/FileUploadForm';
import { Tag } from '@/types';

interface SaveContentMainProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSaveContent: (url: string, tags: Tag[]) => void;
  handleFileUploadComplete: (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => void;
}

export const SaveContentMain: React.FC<SaveContentMainProps> = ({
  activeTab,
  setActiveTab,
  handleSaveContent,
  handleFileUploadComplete
}) => {
  const handleFileUpload = (file: File) => {
    console.log('File selected:', file.name);
  };

  return (
    <div className="md:col-span-2">
      <Card className="shadow-lg border-2 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Your Content Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="url" className="flex items-center gap-2 text-base">
                <Link className="h-5 w-5" />
                URL / Website
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5" />
                Upload File
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="pt-4 space-y-6 animate-fade-in">
              <SaveContentForm onSaveContent={handleSaveContent} />
            </TabsContent>
            
            <TabsContent value="file" className="pt-4 space-y-6 animate-fade-in">
              <FileUploadForm 
                onFileUploaded={handleFileUpload}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
