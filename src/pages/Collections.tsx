
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  Search, 
  Plus, 
  Grid3X3, 
  List, 
  Filter,
  BookmarkPlus,
  Clock,
  Star,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Collections = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const collections = [
    {
      id: 1,
      name: "Web Development",
      description: "Modern web development techniques, frameworks, and best practices",
      itemCount: 324,
      lastUpdated: "2 hours ago",
      color: "bg-blue-500",
      tags: ["React", "JavaScript", "CSS", "HTML"]
    },
    {
      id: 2,
      name: "AI & Machine Learning",
      description: "Artificial intelligence research, tools, and implementation guides",
      itemCount: 187,
      lastUpdated: "5 hours ago",
      color: "bg-purple-500",
      tags: ["Python", "TensorFlow", "Neural Networks", "Data Science"]
    },
    {
      id: 3,
      name: "Design Resources",
      description: "UI/UX design principles, tools, and creative inspiration",
      itemCount: 156,
      lastUpdated: "1 day ago",
      color: "bg-pink-500",
      tags: ["Figma", "UI Design", "Color Theory", "Typography"]
    },
    {
      id: 4,
      name: "Business Strategy",
      description: "Entrepreneurship, management, and business development insights",
      itemCount: 98,
      lastUpdated: "2 days ago",
      color: "bg-green-500",
      tags: ["Startups", "Management", "Marketing", "Finance"]
    },
    {
      id: 5,
      name: "DevOps & Cloud",
      description: "Infrastructure, deployment, and cloud computing resources",
      itemCount: 142,
      lastUpdated: "3 days ago",
      color: "bg-orange-500",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      id: 6,
      name: "Personal Development",
      description: "Self-improvement, productivity, and career growth content",
      itemCount: 89,
      lastUpdated: "1 week ago",
      color: "bg-indigo-500",
      tags: ["Productivity", "Career", "Learning", "Habits"]
    }
  ];

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <UnifiedPageLayout
      title="Collections - Organize Your Knowledge | Accio"
      description="Browse and manage your organized knowledge collections. Create, edit, and explore your curated content libraries."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Collections</h1>
            <p className="text-muted-foreground">
              Organize your knowledge into curated collections for easy access.
            </p>
          </div>
          <Button size="lg" className="mt-4 lg:mt-0 gap-2">
            <Plus className="h-5 w-5" />
            Create Collection
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search collections, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collections Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-md transition-shadow group">
              {viewMode === 'grid' ? (
                <Link to={`/collections/${collection.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${collection.color} rounded-lg flex items-center justify-center`}>
                        <FolderOpen className="h-6 w-6 text-white" />
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <BookmarkPlus className="h-4 w-4" />
                        <span>{collection.itemCount} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{collection.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {collection.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {collection.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{collection.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${collection.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FolderOpen className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{collection.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {collection.itemCount} items
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Updated {collection.lastUpdated}</span>
                        <div className="flex gap-1">
                          {collection.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/collections/${collection.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No collections found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first collection to get started"}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Collection
            </Button>
          </div>
        )}
      </div>
    </UnifiedPageLayout>
  );
};

export default Collections;
