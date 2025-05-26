
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Settings, User, LogOut, Info } from 'lucide-react';

export const RadixShowcase: React.FC = () => {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Radix UI Components Showcase</h1>
        <p className="text-muted-foreground">
          All components are styled with Tailwind CSS and follow the dark-mode theme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dialog Component */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog Component</CardTitle>
            <CardDescription>Modal dialogs with proper focus management</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Example Dialog</DialogTitle>
                  <DialogDescription>
                    This is a modal dialog built with Radix UI primitives and styled with Tailwind CSS.
                    It includes proper focus management and accessibility features.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Dropdown Menu Component */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Context menus with keyboard navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Switch Component */}
        <Card>
          <CardHeader>
            <CardTitle>Switch Component</CardTitle>
            <CardDescription>Toggle switches with accessible states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="demo-switch"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <label htmlFor="demo-switch" className="text-sm font-medium">
                Enable notifications
              </label>
            </div>
            <Badge variant={switchValue ? "default" : "secondary"}>
              Status: {switchValue ? "Enabled" : "Disabled"}
            </Badge>
          </CardContent>
        </Card>

        {/* Tooltip Component */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
            <CardDescription>Contextual information on hover/focus</CardDescription>
          </CardHeader>
          <CardContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Info className="mr-2 h-4 w-4" />
                  Hover for tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip provides additional context and information.</p>
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Component */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs Component</CardTitle>
          <CardDescription>Organized content with keyboard navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p className="text-muted-foreground">
                This is the overview tab content. Tabs provide an excellent way to organize 
                related content and improve user navigation.
              </p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <p className="text-muted-foreground">
                Features tab content goes here. Each tab can contain different types of 
                content and components.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <p className="text-muted-foreground">
                Settings and configuration options would be displayed in this tab.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Accordion Component */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion Component</CardTitle>
          <CardDescription>Collapsible content sections</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Radix UI?</AccordionTrigger>
              <AccordionContent>
                Radix UI is a low-level UI primitive library for building high-quality, 
                accessible design systems and web apps. It provides unstyled, accessible 
                components that you can customize with your own styling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why use Radix UI with Tailwind CSS?</AccordionTrigger>
              <AccordionContent>
                Radix UI provides the behavior and accessibility features, while Tailwind CSS 
                handles the styling. This combination gives you maximum flexibility and ensures 
                your components are both beautiful and accessible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does keyboard navigation work?</AccordionTrigger>
              <AccordionContent>
                All Radix UI components come with built-in keyboard navigation support. 
                You can navigate using Tab, Enter, Space, Arrow keys, and Escape as appropriate 
                for each component type.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
