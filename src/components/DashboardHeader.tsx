
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BarChart, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-6 rounded-lg shadow-sm border border-blue-100">
      <h1 className="text-3xl font-bold text-blue-700">My Content</h1>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
        <Button 
          onClick={() => navigate('/collections')} 
          variant="outline" 
          className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          <FolderOpen className="h-4 w-4" />
          Collections
        </Button>
        <Button 
          onClick={() => navigate('/analytics')} 
          variant="outline" 
          className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          <BarChart className="h-4 w-4" />
          Analytics
        </Button>
        <Button 
          onClick={() => navigate('/save')} 
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Save New
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
