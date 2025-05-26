
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  Sparkles,
  Maximize2,
  Filter,
  Zap,
  Search,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  connections: number;
  strength: number;
  x: number;
  y: number;
}

interface KnowledgeConnection {
  from: string;
  to: string;
  strength: number;
  type: 'strong' | 'medium' | 'weak';
}

interface AIKnowledgeGraphProps {
  className?: string;
}

export const AIKnowledgeGraph: React.FC<AIKnowledgeGraphProps> = ({ className }) => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [connections, setConnections] = useState<KnowledgeConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    generateKnowledgeGraph();
  }, []);

  const generateKnowledgeGraph = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockNodes: KnowledgeNode[] = [
        { id: '1', title: 'React Hooks', category: 'Frontend', connections: 8, strength: 95, x: 50, y: 30 },
        { id: '2', title: 'TypeScript', category: 'Programming', connections: 12, strength: 88, x: 80, y: 50 },
        { id: '3', title: 'Node.js', category: 'Backend', connections: 6, strength: 72, x: 20, y: 70 },
        { id: '4', title: 'Productivity', category: 'Skills', connections: 15, strength: 85, x: 70, y: 20 },
        { id: '5', title: 'UI/UX Design', category: 'Design', connections: 9, strength: 78, x: 30, y: 60 },
        { id: '6', title: 'Machine Learning', category: 'AI', connections: 4, strength: 65, x: 60, y: 80 }
      ];

      const mockConnections: KnowledgeConnection[] = [
        { from: '1', to: '2', strength: 0.9, type: 'strong' },
        { from: '1', to: '5', strength: 0.7, type: 'medium' },
        { from: '2', to: '3', strength: 0.8, type: 'strong' },
        { from: '4', to: '5', strength: 0.6, type: 'medium' },
        { from: '2', to: '6', strength: 0.4, type: 'weak' }
      ];

      const mockInsights = [
        'React and TypeScript show the strongest connection in your knowledge base',
        'Consider exploring the gap between Machine Learning and your frontend skills',
        'Your productivity knowledge could enhance all technical areas',
        'UI/UX Design connects well with React - a strength to leverage'
      ];

      setNodes(mockNodes);
      setConnections(mockConnections);
      setInsights(mockInsights);
      
      toast({
        title: "Knowledge Graph Generated!",
        description: "AI has mapped the connections in your knowledge base.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Frontend': 'bg-blue-500',
      'Backend': 'bg-green-500',
      'Programming': 'bg-purple-500',
      'Design': 'bg-pink-500',
      'Skills': 'bg-orange-500',
      'AI': 'bg-red-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'strong': return 'stroke-green-500';
      case 'medium': return 'stroke-yellow-500';
      case 'weak': return 'stroke-red-500';
      default: return 'stroke-gray-400';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            AI Knowledge Graph
            <Badge variant="secondary">Interactive</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={generateKnowledgeGraph}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Mapping...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Regenerate Graph
                </>
              )}
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3 w-3" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Maximize2 className="h-3 w-3" />
              Full Screen
            </Button>
          </div>

          {/* Graph Visualization */}
          <div className="relative bg-muted/30 rounded-lg" style={{ height: '300px' }}>
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Connections */}
              {connections.map((connection, index) => {
                const fromNode = nodes.find(n => n.id === connection.from);
                const toNode = nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <line
                    key={index}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    className={`${getConnectionColor(connection.type)} stroke-2 opacity-60`}
                  />
                );
              })}
              
              {/* Nodes */}
              {nodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={Math.max(8, node.connections)}
                    className={`${getCategoryColor(node.category)} cursor-pointer hover:opacity-80 transition-opacity`}
                    onClick={() => setSelectedNode(node)}
                  />
                  <text
                    x={`${node.x}%`}
                    y={`${node.y + 15}%`}
                    textAnchor="middle"
                    className="text-xs font-medium fill-current"
                  >
                    {node.title}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedNode.title}</h4>
                    <Badge className={getCategoryColor(selectedNode.category)}>
                      {selectedNode.category}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Connections:</span>
                      <div className="font-medium">{selectedNode.connections}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strength:</span>
                      <div className="font-medium">{selectedNode.strength}%</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full gap-1">
                    <Search className="h-3 w-3" />
                    Explore Related Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              Knowledge Insights
            </h4>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <h4 className="font-medium mb-3 text-sm">Graph Legend</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-medium mb-2">Node Size</h5>
                <div className="space-y-1">
                  <div>• Larger = More connections</div>
                  <div>• Color = Knowledge category</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Connection Strength</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-green-500"></div>
                    <span>Strong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-yellow-500"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-red-500"></div>
                    <span>Weak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
