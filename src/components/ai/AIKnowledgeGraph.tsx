
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  RefreshCw,
  Maximize2,
  Filter,
  Eye,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  connections: number;
  strength: 'strong' | 'medium' | 'weak';
  x: number;
  y: number;
}

interface AIKnowledgeGraphProps {
  className?: string;
}

export const AIKnowledgeGraph: React.FC<AIKnowledgeGraphProps> = ({ className }) => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'network' | 'clusters'>('network');
  const { toast } = useToast();

  useEffect(() => {
    generateKnowledgeGraph();
  }, []);

  const generateKnowledgeGraph = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockNodes: KnowledgeNode[] = [
        { id: '1', title: 'React Fundamentals', category: 'Frontend', connections: 8, strength: 'strong', x: 150, y: 100 },
        { id: '2', title: 'JavaScript ES6+', category: 'Programming', connections: 12, strength: 'strong', x: 300, y: 150 },
        { id: '3', title: 'Node.js APIs', category: 'Backend', connections: 6, strength: 'medium', x: 200, y: 250 },
        { id: '4', title: 'Database Design', category: 'Data', connections: 4, strength: 'medium', x: 350, y: 200 },
        { id: '5', title: 'UI/UX Principles', category: 'Design', connections: 5, strength: 'weak', x: 100, y: 200 },
        { id: '6', title: 'TypeScript', category: 'Programming', connections: 9, strength: 'strong', x: 250, y: 50 }
      ];

      setNodes(mockNodes);
      
      toast({
        title: "Knowledge Graph Generated!",
        description: "AI has mapped connections between your knowledge areas.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(nodes.map(node => node.category)))];

  const filteredNodes = selectedCategory === 'all' 
    ? nodes 
    : nodes.filter(node => node.category === selectedCategory);

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Backend': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Programming': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Design': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'Data': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              onClick={generateKnowledgeGraph}
              disabled={isGenerating}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Regenerate
                </>
              )}
            </Button>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 text-sm border rounded"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <Button
              variant={viewMode === 'network' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('network')}
            >
              <Network className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'clusters' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('clusters')}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>

          {/* Knowledge Graph Visualization */}
          <div className="relative border rounded-lg p-4 bg-muted/20 min-h-[400px] overflow-hidden">
            <svg width="100%" height="400" className="absolute inset-0">
              {/* Connection Lines */}
              {filteredNodes.map((node, i) => (
                filteredNodes.slice(i + 1).map((otherNode, j) => (
                  <line
                    key={`${node.id}-${otherNode.id}`}
                    x1={node.x}
                    y1={node.y}
                    x2={otherNode.x}
                    y2={otherNode.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.2"
                    className="text-muted-foreground"
                  />
                ))
              ))}
              
              {/* Knowledge Nodes */}
              {filteredNodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={Math.max(20, node.connections * 2)}
                    className={`${getStrengthColor(node.strength)} opacity-80`}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="text-xs font-medium fill-white"
                  >
                    {node.title.length > 10 ? node.title.substring(0, 10) + '...' : node.title}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Node Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredNodes.map((node) => (
              <Card key={node.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{node.title}</h4>
                  <div className={`w-3 h-3 rounded-full ${getStrengthColor(node.strength)}`} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(node.category)}>
                    {node.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {node.connections} connections
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Insights */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🧠 Knowledge Insights:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Larger nodes indicate more connected knowledge areas</li>
              <li>• Green nodes show strong understanding, red nodes need attention</li>
              <li>• Lines show relationships between different topics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
