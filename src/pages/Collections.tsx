
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FolderPlus, 
  Folder, 
  FileText, 
  Users, 
  Calendar,
  MoreHorizontal,
  Share,
  Star,
  Lock,
  Globe
} from 'lucide-react';

const Collections: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const collections = [
    {
      id: '1',
      name: 'Product Documentation',
      description: 'Complete product guides, API docs, and technical specifications',
      itemCount: 156,
      collaborators: 12,
      lastUpdated: '2024-01-15',
      isStarred: true,
      visibility: 'team',
      color: 'blue',
      recentItems: ['API v2.0 Guide', 'Product Roadmap Q1', 'Feature Specifications']
    },
    {
      id: '2',
      name: 'Customer Support',
      description: 'Support processes, FAQs, and escalation procedures',
      itemCount: 89,
      collaborators: 8,
      lastUpdated: '2024-01-12',
      isStarred: false,
      visibility: 'private',
      color: 'green',
      recentItems: ['Support Ticket Process', 'Customer FAQ', 'Escalation Matrix']
    },
    {
      id: '3',
      name: 'Security & Compliance',
      description: 'Security policies, compliance checklists, and audit documentation',
      itemCount: 67,
      collaborators: 5,
      lastUpdated: '2024-01-10',
      isStarred: true,
      visibility: 'organization',
      color: 'red',
      recentItems: ['SOC 2 Checklist', 'Security Policies', 'Audit Reports']
    },
    {
      id: '4',
      name: 'Team Onboarding',
      description: 'New hire guides, training materials, and company processes',
      itemCount: 45,
      collaborators: 15,
      lastUpdated: '2024-01-08',
      isStarred: false,
      visibility: 'team',
      color: 'purple',
      recentItems: ['New Hire Checklist', 'Company Handbook', 'Training Schedule']
    }
  ];

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'private': return <Lock className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'organization': return <Globe className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'private': return 'bg-gray-100 text-gray-800';
      case 'team': return 'bg-blue-100 text-blue-800';
      case 'organization': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Collections - Accio Enterprise</title>
        <meta name="description" content="Organize and manage your knowledge collections with powerful collaboration tools." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <EnterpriseNavigation />
        
        <main className="flex-grow">
          <EnterpriseSpacing.Section>
            <EnterpriseSpacing.Container>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <EnterpriseTypography.H1 className="mb-2">
                    Knowledge Collections
                  </EnterpriseTypography.H1>
                  <EnterpriseTypography.Body>
                    Organize your content into collections for better team collaboration and knowledge management
                  </EnterpriseTypography.Body>
                </div>
                
                <Button className="gap-2">
                  <FolderPlus className="h-4 w-4" />
                  Create Collection
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Folder className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-muted-foreground">Collections</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">1,247</div>
                        <div className="text-sm text-muted-foreground">Total Items</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">89</div>
                        <div className="text-sm text-muted-foreground">Collaborators</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Starred</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Collections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Card key={collection.id} className="hover:shadow-lg transition-all duration-200 group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 bg-${collection.color}-100 rounded-xl`}>
                            <Folder className={`h-6 w-6 text-${collection.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {collection.name}
                              </CardTitle>
                              {collection.isStarred && (
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {collection.description}
                      </p>
                      
                      {/* Collection Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {collection.itemCount} items
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {collection.collaborators}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {collection.lastUpdated}
                        </div>
                      </div>
                      
                      {/* Visibility Badge */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getVisibilityColor(collection.visibility)}`}
                        >
                          {getVisibilityIcon(collection.visibility)}
                          <span className="ml-1 capitalize">{collection.visibility}</span>
                        </Badge>
                        
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Recent Items Preview */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Recent items:</p>
                        <div className="space-y-1">
                          {collection.recentItems.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-xs text-muted-foreground truncate">
                              • {item}
                            </div>
                          ))}
                          {collection.recentItems.length > 2 && (
                            <div className="text-xs text-primary">
                              +{collection.recentItems.length - 2} more items
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Create New Collection Card */}
                <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardContent className="h-full flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="p-4 bg-muted rounded-xl mb-4 group-hover:bg-primary/10 transition-colors">
                        <FolderPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                        Create New Collection
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Organize related content together
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </EnterpriseSpacing.Container>
          </EnterpriseSpacing.Section>
        </main>
        
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Collections;
