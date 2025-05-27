
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Brain, 
  Sparkles, 
  Network,
  Eye,
  Zap,
  Filter,
  Maximize2
} from 'lucide-react';

interface KnowledgeNode {
  id: string;
  title: string;
  type: 'concept' | 'topic' | 'skill' | 'project';
  connections: string[];
  strength: number;
  x: number;
  y: number;
}

export const AIKnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'network' | 'hierarchy'>('network');

  const mockNodes: KnowledgeNode[] = [
    { id: '1', title: 'React', type: 'skill', connections: ['2', '3', '4'], strength: 95, x: 300, y: 200 },
    { id: '2', title: 'TypeScript', type: 'skill', connections: ['1', '5'], strength: 80, x: 450, y: 150 },
    { id: '3', title: 'Component Architecture', type: 'concept', connections: ['1', '6'], strength: 75, x: 200, y: 300 },
    { id: '4', title: 'Web Development', type: 'topic', connections: ['1', '2', '7'], strength: 90, x: 400, y: 350 },
    { id: '5', title: 'Type Safety', type: 'concept', connections: ['2'], strength: 70, x: 550, y: 100 },
    { id: '6', title: 'Design Patterns', type: 'concept', connections: ['3'], strength: 65, x: 100, y: 250 },
    { id: '7', title: 'Frontend Development', type: 'topic', connections: ['4'], strength: 85, x: 500, y: 400 }
  ];

  const getNodeColor = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'skill': return 'bg-blue-500';
      case 'concept': return 'bg-green-500';
      case 'topic': return 'bg-purple-500';
      case 'project': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-600';
    if (strength >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            AI Knowledge Graph
            <Badge variant="secondary">Interactive</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'network' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('network')}
              >
                <Network className="h-4 w-4 mr-2" />
                Network View
              </Button>
              <Button
                variant={viewMode === 'hierarchy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('hierarchy')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Hierarchy View
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm">Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm">Projects</span>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg h-96 overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Connections */}
              {mockNodes.map((node) =>
                node.connections.map((connectionId) => {
                  const connectedNode = mockNodes.find(n => n.id === connectionId);
                  if (!connectedNode) return null;
                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={connectedNode.x}
                      y2={connectedNode.y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted-foreground opacity-30"
                    />
                  );
                })
              )}
              
              {/* Nodes */}
              {mockNodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={selectedNode === node.id ? "25" : "20"}
                    className={`${getNodeColor(node.type)} cursor-pointer transition-all opacity-80 hover:opacity-100`}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  />
                  <text
                    x={node.x}
                    y={node.y + 35}
                    textAnchor="middle"
                    className="text-xs font-medium fill-current"
                  >
                    {node.title}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 48}
                    textAnchor="middle"
                    className={`text-xs ${getStrengthColor(node.strength)}`}
                  >
                    {node.strength}%
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Node Details */}
          {selectedNode && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                {(() => {
                  const node = mockNodes.find(n => n.id === selectedNode);
                  if (!node) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getNodeColor(node.type)}`}></div>
                        <h3 className="font-semibold">{node.title}</h3>
                        <Badge variant="outline">{node.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Mastery Level:</span>
                          <span className={`ml-2 ${getStrengthColor(node.strength)}`}>
                            {node.strength}%
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Connections:</span>
                          <span className="ml-2">{node.connections.length}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Zap className="h-3 w-3 mr-1" />
                          Improve
                        </Button>
                        <Button size="sm" variant="outline">
                          <Brain className="h-3 w-3 mr-1" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Insights</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Your React knowledge is strong - consider exploring advanced patterns</li>
                <li>• TypeScript skills could benefit from more practice with generics</li>
                <li>• Strong foundation in Web Development - ready for full-stack concepts</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
