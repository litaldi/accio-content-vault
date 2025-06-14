
import React from 'react';
import { SavedContent } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import { Calendar, FileText, Link2, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Skeleton } from '@/components/ui/enhanced-loading';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ReadAloudButton from "@/components/voice/ReadAloudButton";

const ContentList = ({ contents, searchQuery }: { contents: any[], searchQuery: string }) => (
  <div>
    {contents.length === 0 && searchQuery ? (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No results found</CardTitle>
          <CardDescription>
            We couldn't find any content matching your search query.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please try a different search term or clear the current filters.</p>
        </CardContent>
      </Card>
    ) : null}
    <ul>
      {contents.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  <Link to={`/content/${item.id}`} className="hover:underline">
                    {item.title || <Skeleton />}
                  </Link>
                </CardTitle>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {item.tags.map((tag: any) => (
                      <TooltipProvider key={tag.id}>
                        <Tooltip delayDuration={50}>
                          <TooltipTrigger asChild>
                            <Badge variant="secondary" className="cursor-pointer">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Filter content by {tag.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardDescription>
                    {item.description || <Skeleton lines={3} />}
                  </CardDescription>
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : <Skeleton />}</span>
                    {item.file_type && (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>{item.file_type}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {item.url && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={item.url} target="_blank" rel="noopener noreferrer">
                        <Link2 className="w-4 h-4 mr-2" />
                        Open Link
                      </Link>
                    </Button>
                  )}
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${item.title}.png`} />
                    <AvatarFallback>{item.title?.charAt(0).toUpperCase() || <Skeleton variant="avatar" />}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
          <ReadAloudButton text={item.summary || item.text || item.title || ''} />
        </li>
      ))}
    </ul>
  </div>
);

export default ContentList;
