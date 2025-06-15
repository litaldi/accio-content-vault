import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/hooks/use-toast';

interface FileUploadFormProps {
  onFileUploaded: (file: File) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onFileUploaded(file);
      toast({
        title: 'File Uploaded',
        description: `Your file "${file.name}" has been successfully uploaded.`,
      });
    } else {
      toast({
        title: 'No File Selected',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div {...getRootProps()} className="relative border rounded-md p-4 cursor-pointer bg-muted hover:bg-accent transition-colors">
        <input {...getInputProps()} id="upload" />
        <div className="text-center">
          <UploadCloud className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? (
              'Drop the file here...'
            ) : (
              <>
                Click to upload or drag and drop
                <br />
                <span className="text-xs">
                  (Accepts images, PDF, TXT, CSV, DOC, DOCX)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {file && (
        <div className="space-y-2">
          <Label htmlFor="file-name">Selected File</Label>
          <Input
            id="file-name"
            type="text"
            value={file.name}
            readOnly
            className="cursor-not-allowed"
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!file}>
        <FileUp className="w-4 h-4 mr-2" />
        Upload File
      </Button>
    </form>
  );
};

export default FileUploadForm;
