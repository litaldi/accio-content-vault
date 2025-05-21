
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
          <span className="inline-flex items-center">
            <FolderOpen className="h-4 w-4 mr-2" />
            Collections
          </span>
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/analytics')}
        >
          <span className="inline-flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </span>
        </Button>
        <Button onClick={() => navigate('/save')}>
          <span className="inline-flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Content
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
