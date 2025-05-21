
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BarChart, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h1 className="text-3xl font-bold">My Content</h1>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline"
          onClick={() => navigate('/collections')} 
        >
          <FolderOpen className="h-4 w-4 mr-2" />
          Collections
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/analytics')} 
        >
          <BarChart className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button 
          onClick={() => navigate('/save')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Save New
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
