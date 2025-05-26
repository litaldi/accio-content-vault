
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Settings,
  Brain,
  BookOpen,
  Tag
} from 'lucide-react';

interface GraphNode {
  id: string;
  title: string;
  type: 'content' | 'tag' | 'collection';
  connections: string[];
  x: number;
  y: number;
}

export const KnowledgeGraph = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Mock graph data
  const nodes: GraphNode[] = [
    { id: '1', title: 'React Patterns', type: 'content', connections: ['2', '3'], x: 100, y: 100 },
    { id: '2', title: 'TypeScript', type: 'tag', connections: ['1', '4'], x: 200, y: 150 },
    { id: '3', title: 'Frontend Development', type: 'collection', connections: ['1', '4', '5'], x: 150, y: 200 },
    { id: '4', title: 'React Hooks', type: 'content', connections: ['2', '3'], x: 250, y: 100 },
    { id: '5', title: 'UI/UX Design', type: 'content', connections: ['3'], x: 100, y: 250 },
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'content': return 'bg-blue-500';
      case 'tag': return 'bg-green-500';
      case 'collection': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'content': return BookOpen;
      case 'tag': return Tag;
      case 'collection': return Brain;
      default: return BookOpen;
    }
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Knowledge Graph
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(zoom * 1.2)}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(zoom * 0.8)}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(1)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
          <svg
            className="w-full h-full"
            style={{ transform: `scale(${zoom})` }}
            viewBox="0 0 400 300"
          >
            {/* Render connections */}
            {nodes.map(node =>
              node.connections.map(connectionId => {
                const connectedNode = nodes.find(n => n.id === connectionId);
                if (!connectedNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground opacity-30"
                  />
                );
              })
            )}
            
            {/* Render nodes */}
            {nodes.map(node => {
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode === node.id;
              
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 25 : 20}
                    className={`${getNodeColor(node.type)} transition-all cursor-pointer`}
                    onClick={() => setSelectedNode(node.id)}
                    opacity={0.9}
                  />
                  <foreignObject
                    x={node.x - 10}
                    y={node.y - 10}
                    width="20"
                    height="20"
                    className="pointer-events-none"
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </foreignObject>
                  {isSelected && (
                    <text
                      x={node.x}
                      y={node.y + 35}
                      textAnchor="middle"
                      className="text-xs font-medium fill-current"
                    >
                      {node.title}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Tags</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span>Collections</span>
          </div>
        </div>
        
        {selectedNode && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <Badge variant="outline" className="mb-2">
              {nodes.find(n => n.id === selectedNode)?.type}
            </Badge>
            <h4 className="font-medium">
              {nodes.find(n => n.id === selectedNode)?.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Connected to {nodes.find(n => n.id === selectedNode)?.connections.length} items
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
