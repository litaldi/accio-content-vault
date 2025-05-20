
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BarChart, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">My Content</h1>
      <div className="flex gap-2">
        <Button onClick={() => navigate('/collections')} variant="outline" className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          Collections
        </Button>
        <Button onClick={() => navigate('/analytics')} variant="outline" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          Analytics
        </Button>
        <Button onClick={() => navigate('/save')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Save New
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
