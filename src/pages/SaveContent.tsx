
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContent/SaveContentForm';
import FileUploadForm from '@/components/FileUploadForm';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { SaveContentHeader } from '@/components/SaveContent/SaveContentHeader';
import { SaveContentProgress } from '@/components/SaveContent/SaveContentProgress';
import { SaveContentMain } from '@/components/SaveContent/SaveContentMain';
import { SaveContentSidebar } from '@/components/SaveContent/SaveContentSidebar';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { Tag } from '@/types';
import { copy } from '@/utils/copy';

const SaveContent = () => {
  const { showSuccess, showError, showCelebration } = useEnhancedToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("url");
  const [saveProgress, setSaveProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isLoggedIn = true;

  const handleSaveContent = async (url: string, tags: Tag[]) => {
    try {
      setIsProcessing(true);
      setSaveProgress(0);
      
      // Simulate progress steps with proper announcements
      setSaveProgress(1);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSaveProgress(2);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSaveProgress(3);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Saving content with URL:', url);
      console.log('Tags:', tags);
      
      showCelebration(
        copy.success.contentSaved,
        'Your knowledge library is growing. Ready to add more?'
      );
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving content:', error);
      showError(
        'Unable to Save Content',
        copy.errors.general
      );
    } finally {
      setIsProcessing(false);
      setSaveProgress(0);
    }
  };

  const handleFileUploadComplete = async (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => {
    try {
      setIsProcessing(true);
      console.log('File uploaded:', fileDetails);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showCelebration(
        'File Uploaded Successfully!',
        'Your file has been processed and added to your collection.'
      );
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error processing file:', error);
      showError(
        'Upload Failed',
        copy.errors.general
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Save Content', href: '/save' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <SaveContentHeader isProcessing={isProcessing} />
        
        <SaveContentProgress 
          isProcessing={isProcessing} 
          saveProgress={saveProgress} 
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <SaveContentMain
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSaveContent={handleSaveContent}
            handleFileUploadComplete={handleFileUploadComplete}
          />
          
          <SaveContentSidebar activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default SaveContent;
