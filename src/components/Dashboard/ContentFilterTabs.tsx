
import React from 'react';
import { SlidersHorizontal, Clock, Tag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface ContentFilterTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ContentFilterTabs: React.FC<ContentFilterTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <div className="inline-flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Sort
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Clock className="h-4 w-4 mr-2" />
              <span>Recent first</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock className="h-4 w-4 mr-2" />
              <span>Oldest first</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="h-4 w-4 mr-2" />
              <span>Most tags</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContentFilterTabs;
