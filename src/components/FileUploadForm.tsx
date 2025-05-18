
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileUploadProps } from '@/types';
import { Upload, File, Image } from 'lucide-react';

const FileUploadForm: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!(fileType === 'application/pdf' || fileType.startsWith('image/'))) {
        toast({
          title: 'Invalid file type',
          description: 'Only PDF documents and images (jpg/png) are supported',
          variant: 'destructive',
        });
        return;
      }
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Maximum file size is 10MB',
          variant: 'destructive',
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real implementation with Supabase, you would:
      // 1. Upload file to Supabase Storage
      // 2. Get the file URL
      // 3. Save the file metadata to the database
      
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'pdf';
      
      // Mock file URL - in production this would come from Supabase Storage
      const mockFileUrl = `https://storage.example.com/${Date.now()}-${selectedFile.name}`;
      
      onUploadComplete({
        file_url: mockFileUrl,
        file_type: fileType as "image" | "pdf",
        file_size: selectedFile.size,
        title: selectedFile.name,
      });
      
      toast({
        title: 'File uploaded',
        description: 'Your file has been uploaded successfully',
      });
      
      // Reset state
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your file',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              selectedFile ? 'border-primary' : 'border-border'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                {selectedFile.type.startsWith('image/') ? (
                  <Image className="h-8 w-8 mb-2 text-primary" />
                ) : (
                  <File className="h-8 w-8 mb-2 text-primary" />
                )}
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Click to select a file</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG (max 10MB)
                </p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,image/jpeg,image/png"
              className="hidden" 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="button" 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUploadForm;
