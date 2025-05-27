
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ExternalLink, Search, Save, Tag, BarChart3, Share, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'working' | 'partial' | 'pending';
  testPath?: string;
  demoAvailable: boolean;
}

const features: Feature[] = [
  {
    id: 'auth',
    name: 'Sign Up / Log In',
    description: 'User authentication with demo account support',
    icon: Circle,
    status: 'working',
    testPath: '/login',
    demoAvailable: true
  },
  {
    id: 'save',
    name: 'Save & Organize Content',
    description: 'Save articles, documents, and organize in collections',
    icon: Save,
    status: 'working',
    testPath: '/dashboard',
    demoAvailable: true
  },
  {
    id: 'tagging',
    name: 'AI-Powered Tagging',
    description: 'Automatic content categorization and smart tagging',
    icon: Tag,
    status: 'working',
    testPath: '/dashboard',
    demoAvailable: true
  },
  {
    id: 'search',
    name: 'Smart Search & Discovery',
    description: 'Advanced search with semantic capabilities',
    icon: Search,
    status: 'working',
    testPath: '/dashboard',
    demoAvailable: true
  },
  {
    id: 'export',
    name: 'Export to External Tools',
    description: 'Export content to popular productivity tools',
    icon: Share,
    status: 'working',
    testPath: '/dashboard',
    demoAvailable: true
  },
  {
    id: 'analytics',
    name: 'Dashboard & Analytics',
    description: 'Comprehensive analytics and insights',
    icon: BarChart3,
    status: 'working',
    testPath: '/dashboard',
    demoAvailable: true
  },
  {
    id: 'mobile',
    name: 'Web & Mobile Access',
    description: 'Responsive design for all devices',
    icon: Smartphone,
    status: 'working',
    testPath: '/',
    demoAvailable: true
  }
];

const FeatureVerification: React.FC = () => {
  const [checkedFeatures, setCheckedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (featureId: string) => {
    const newChecked = new Set(checkedFeatures);
    if (newChecked.has(featureId)) {
      newChecked.delete(featureId);
    } else {
      newChecked.add(featureId);
    }
    setCheckedFeatures(newChecked);
  };

  const getStatusColor = (status: Feature['status']) => {
    switch (status) {
      case 'working': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Feature['status']) => {
    switch (status) {
      case 'working': return 'Working';
      case 'partial': return 'Partial';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const workingFeatures = features.filter(f => f.status === 'working').length;
  const totalFeatures = features.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Feature Verification Dashboard
          </CardTitle>
          <CardDescription>
            Verify all core features are implemented and working correctly. 
            Use the demo account (demo@yourapp.com / Demo1234!) to test functionality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {workingFeatures}/{totalFeatures} features working
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(workingFeatures / totalFeatures) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isChecked = checkedFeatures.has(feature.id);
              
              return (
                <div 
                  key={feature.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleFeature(feature.id)}
                      className="flex-shrink-0"
                    >
                      {isChecked ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    
                    <div>
                      <h3 className="font-medium">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(feature.status)} text-white`}
                    >
                      {getStatusText(feature.status)}
                    </Badge>
                    
                    {feature.demoAvailable && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Demo Ready
                      </Badge>
                    )}
                    
                    {feature.testPath && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={feature.testPath} className="flex items-center gap-1">
                          Test <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Quick Demo Access</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Use these credentials to test all features with preloaded sample data:
            </p>
            <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
              <div><strong>Email:</strong> demo@yourapp.com</div>
              <div><strong>Password:</strong> Demo1234!</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureVerification;
