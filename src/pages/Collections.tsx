
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SavedContent } from '@/types';
import { Folder, FolderPlus, MoreVertical, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockContents } from '@/lib/mock-data';
import { Collection } from '@/types';
import ContentList from '@/components/ContentList';

// Mock collection data
const mockCollections: Collection[] = [
  {
    id: 'col1',
    name: 'Work Resources',
    description: 'Useful articles and resources for work',
    content_ids: ['1', '2'],
    created_at: new Date(2025, 4, 10).toISOString()
  },
  {
    id: 'col2',
    name: 'Learning Material',
    description: 'Educational content for personal development',
    content_ids: ['3', '4'],
    created_at: new Date(2025, 4, 15).toISOString()
  },
  {
    id: 'col3',
    name: 'Project Ideas',
    description: 'Inspiration for future projects',
    content_ids: [],
    created_at: new Date(2025, 4, 17).toISOString()
  }
];

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a collection name",
        variant: "destructive",
      });
      return;
    }
    
    const newCollection: Collection = {
      id: `col${collections.length + 1}`,
      name: newCollectionName,
      description: newCollectionDescription,
      content_ids: [],
      created_at: new Date().toISOString()
    };
    
    setCollections([...collections, newCollection]);
    setIsCreateDialogOpen(false);
    setNewCollectionName('');
    setNewCollectionDescription('');
    
    toast({
      title: "Collection created",
      description: "Your new collection has been created"
    });
  };

  const handleDeleteCollection = (collectionId: string) => {
    const updatedCollections = collections.filter(collection => collection.id !== collectionId);
    setCollections(updatedCollections);
    
    if (selectedCollection?.id === collectionId) {
      setSelectedCollection(null);
    }
    
    toast({
      title: "Collection deleted",
      description: "The collection has been deleted"
    });
  };

  // Get contents for a specific collection
  const getCollectionContents = (contentIds: string[]) => {
    return mockContents.filter(content => contentIds.includes(content.id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Collections</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </div>
        
        {collections.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FolderPlus className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No collections yet</h2>
            <p className="text-muted-foreground mb-6">
              Create a collection to organize your saved content
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>Create Collection</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <Folder className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <CardTitle className="line-clamp-1">{collection.name}</CardTitle>
                        <CardDescription>
                          {getCollectionContents(collection.content_ids).length} items
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCollection(collection.id)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {collection.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    View Contents
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Create Collection Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <Input
                  id="description"
                  placeholder="Brief description of this collection"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCollection}>Create Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Collection Content View Dialog */}
        <Dialog open={!!selectedCollection} onOpenChange={(open) => !open && setSelectedCollection(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            {selectedCollection && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedCollection.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground mb-4">
                    {selectedCollection.description}
                  </p>
                  
                  {selectedCollection.content_ids.length > 0 ? (
                    <ContentList contents={getCollectionContents(selectedCollection.content_ids)} />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        This collection is empty. Add content from your dashboard.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Collections;
