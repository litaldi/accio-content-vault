
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Lightbulb, 
  BookmarkCheck, 
  Search, 
  Brain, 
  ChevronRight,
  BarChart3,
  Settings
} from 'lucide-react';

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col justify-between rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md hover:bg-primary/10"
                    to="/playground"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      <Brain className="h-6 w-6 mb-2 text-primary" />
                      Try Accio
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground mb-4">
                      Experience our intuitive knowledge management platform with a free interactive demo.
                    </p>
                    <div className="text-sm text-primary flex items-center">
                      Explore playground 
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem to="/features/save" title="Save Content" icon={BookmarkCheck}>
                Save articles, documents, and web pages with a single click.
              </ListItem>
              <ListItem to="/features/search" title="Smart Search" icon={Search}>
                Find anything instantly with semantic search that understands context.
              </ListItem>
              <ListItem to="/features/organize" title="AI Organization" icon={Lightbulb}>
                Let AI automatically organize and tag your content.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem to="/blog" title="Knowledge Blog" icon={BookOpen}>
                Tips, guides, and best practices for knowledge management.
              </ListItem>
              <ListItem to="/case-studies" title="Case Studies" icon={BarChart3}>
                See how others use Accio to transform their workflows.
              </ListItem>
              <ListItem to="/docs" title="Documentation" icon={FileIcon}>
                Detailed guides and API documentation to get the most from Accio.
              </ListItem>
              <ListItem to="/help-center" title="Help Center" icon={Settings}>
                Troubleshooting, FAQs, and customer support resources.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">Pricing</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps {
  to: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

const ListItem = ({ to, title, children, icon: Icon }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

function FileIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
    </svg>
  );
}
