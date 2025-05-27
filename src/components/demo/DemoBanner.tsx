
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info, Users, Database, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isDemoUser } from '@/data/demoData';

const DemoBanner: React.FC = () => {
  const { user } = useAuth();
  
  if (!user?.email || !isDemoUser(user.email)) {
    return null;
  }

  const demoCredentials = [
    { email: 'demo@yourapp.com', password: 'Demo1234!', role: 'Main Demo Account' }
  ];

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Eye className="h-3 w-3 mr-1" />
            Demo Mode
          </Badge>
          <span className="text-sm font-medium">
            You're exploring Accio with sample data
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              Demo Account
            </div>
            <div className="space-y-1">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded border">
                  <div className="font-semibold text-blue-600">{cred.role}:</div>
                  <div>{cred.email}</div>
                  <div>{cred.password}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Database className="h-4 w-4" />
              Sample Data Includes
            </div>
            <ul className="text-xs space-y-1">
              <li>• 31+ Saved articles & documents</li>
              <li>• 4 Organized collections</li>
              <li>• Comprehensive analytics</li>
              <li>• AI-powered tagging system</li>
              <li>• Search & discovery features</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Test These Features</div>
            <ul className="text-xs space-y-1">
              <li>• Save & organize content</li>
              <li>• Smart search & discovery</li>
              <li>• Collection management</li>
              <li>• Analytics dashboard</li>
              <li>• Export capabilities</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            All demo changes are temporary and reset on page refresh. 
            Create a real account to save your data permanently.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;
