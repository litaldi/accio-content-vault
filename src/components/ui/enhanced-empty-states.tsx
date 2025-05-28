
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  FolderOpen, 
  Sparkles, 
  BookOpen,
  Tag,
  Plus,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'content' | 'search' | 'collections' | 'tags' | 'recent';
  searchQuery?: string;
  onAction?: () => void;
  className?: string;
}

export const EnhancedEmptyState: React.FC<EmptyStateProps> = ({
  type,
  searchQuery,
  onAction,
  className
}) => {
  const getConfig = () => {
    switch (type) {
      case 'content':
        return {
          icon: FileText,
          title: 'Start Building Your Knowledge Empire',
          description: 'Capture your first piece of content and let Accio help you organize and rediscover it with AI-powered intelligence.',
          actionText: 'Add Your First Content',
          suggestions: [
            'Save an article from the web',
            'Upload a document or PDF',
            'Create a quick note',
            'Import from bookmarks'
          ],
          gradient: 'from-blue-500/20 to-purple-500/20'
        };
      
      case 'search':
        return {
          icon: Search,
          title: searchQuery ? `No results for "${searchQuery}"` : 'Ready to Search',
          description: searchQuery 
            ? 'Try different keywords, check spelling, or broaden your search terms.'
            : 'Search across all your saved content using natural language or specific keywords.',
          actionText: searchQuery ? 'Clear Search' : 'Try AI Search',
          suggestions: searchQuery ? [
            'Check for typos',
            'Use broader terms',
            'Try related keywords',
            'Search by content type'
          ] : [
            '"Show me articles about React"',
            '"Notes from last week"',
            '"Documents I haven\'t read"',
            '"Meeting summaries"'
          ],
          gradient: 'from-green-500/20 to-teal-500/20'
        };
      
      case 'collections':
        return {
          icon: FolderOpen,
          title: 'Create Your First Collection',
          description: 'Collections help you organize related content. Group articles, notes, and documents by project, topic, or priority.',
          actionText: 'Create Collection',
          suggestions: [
            'Work Projects',
            'Learning Resources',
            'Meeting Notes',
            'Research Materials'
          ],
          gradient: 'from-orange-500/20 to-red-500/20'
        };
      
      case 'tags':
        return {
          icon: Tag,
          title: 'No Tags Yet',
          description: 'Tags make your content discoverable. Add tags to categorize and quickly find related items.',
          actionText: 'Add First Tag',
          suggestions: [
            'Priority tags: urgent, important',
            'Topic tags: design, development',
            'Status tags: to-read, completed',
            'Project tags: client-work, personal'
          ],
          gradient: 'from-pink-500/20 to-purple-500/20'
        };
      
      case 'recent':
        return {
          icon: BookOpen,
          title: 'No Recent Activity',
          description: 'Your recent activity will appear here as you interact with your content.',
          actionText: 'Explore Content',
          suggestions: [
            'View saved articles',
            'Create a new note',
            'Update a collection',
            'Search your content'
          ],
          gradient: 'from-indigo-500/20 to-blue-500/20'
        };
      
      default:
        return {
          icon: Lightbulb,
          title: 'Getting Started',
          description: 'Welcome to your knowledge management workspace.',
          actionText: 'Get Started',
          suggestions: [],
          gradient: 'from-gray-500/20 to-slate-500/20'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center py-16 px-6 max-w-2xl mx-auto",
      className
    )}>
      {/* Animated Icon */}
      <div className={cn(
        "w-20 h-20 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden",
        "bg-gradient-to-br", config.gradient,
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent"
      )}>
        <Icon className="h-10 w-10 text-primary relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {config.title}
      </h3>
      
      <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
        {config.description}
      </p>

      {/* Action Button */}
      {onAction && (
        <Button 
          onClick={onAction}
          className="mb-8 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          {config.actionText}
        </Button>
      )}

      {/* Suggestions */}
      {config.suggestions.length > 0 && (
        <div className="space-y-4 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Suggestions</span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {config.suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-3 py-1 cursor-default hover:bg-primary/10 transition-colors"
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
