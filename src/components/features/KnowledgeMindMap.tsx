
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  Plus, 
  Maximize2, 
  Download,
  Share2,
  Eye,
  Layers
} from 'lucide-react';

export const KnowledgeMindMap = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cluster' | 'timeline' | 'hierarchy'>('cluster');

  const mindMapData = {
    nodes: [
      { id: 'ai', label: 'Artificial Intelligence', category: 'technology', connections: 8, size: 'large' },
      { id: 'ml', label: 'Machine Learning', category: 'technology', connections: 6, size: 'medium' },
      { id: 'data', label: 'Data Science', category: 'technology', connections: 5, size: 'medium' },
      { id: 'productivity', label: 'Productivity', category: 'business', connections: 4, size: 'small' },
      { id: 'learning', label: 'Learning', category: 'education', connections: 7, size: 'medium' },
      { id: 'research', label: 'Research', category: 'education', connections: 3, size: 'small' }
    ],
    connections: [
      { from: 'ai', to: 'ml', strength: 'strong' },
      { from: 'ai', to: 'data', strength: 'medium' },
      { from: 'ml', to: 'data', strength: 'strong' },
      { from: 'productivity', to: 'learning', strength: 'medium' },
      { from: 'learning', to: 'research', strength: 'strong' }
    ]
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-500',
      business: 'bg-green-500',
      education: 'bg-purple-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getNodeSize = (size: string) => {
    const sizes = {
      small: 'w-16 h-16',
      medium: 'w-20 h-20',
      large: 'w-24 h-24'
    };
    return sizes[size as keyof typeof sizes];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Knowledge Mind Map
              <Badge variant="secondary">Interactive</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View Mode:</span>
            {(['cluster', 'timeline', 'hierarchy'] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode(mode)}
                className="capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>

          {/* Mind Map Visualization */}
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 min-h-[400px]">
            <CardContent className="p-8">
              <div className="relative h-80 overflow-hidden">
                {/* Connections (SVG lines) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {mindMapData.connections.map((connection, index) => {
                    const fromNode = mindMapData.nodes.find(n => n.id === connection.from);
                    const toNode = mindMapData.nodes.find(n => n.id === connection.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <line
                        key={index}
                        x1="20%"
                        y1="30%"
                        x2="60%"
                        y2="70%"
                        stroke={connection.strength === 'strong' ? '#3b82f6' : '#94a3b8'}
                        strokeWidth={connection.strength === 'strong' ? 3 : 2}
                        strokeDasharray={connection.strength === 'medium' ? '5,5' : '0'}
                        className="opacity-70"
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                <div className="relative h-full">
                  {mindMapData.nodes.map((node, index) => (
                    <div
                      key={node.id}
                      className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                        selectedNode === node.id ? 'ring-4 ring-primary' : ''
                      }`}
                      style={{
                        left: `${20 + (index % 3) * 30}%`,
                        top: `${20 + Math.floor(index / 3) * 40}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    >
                      <div
                        className={`${getNodeSize(node.size)} ${getCategoryColor(node.category)} rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg`}
                      >
                        <div className="text-center">
                          <div className="text-xs font-bold">{node.connections}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-xs font-medium whitespace-nowrap">{node.label}</div>
                        <Badge variant="outline" className="text-xs mt-1 capitalize">
                          {node.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node Details */}
          {selectedNode && (
            <Card>
              <CardContent className="p-4">
                {(() => {
                  const node = mindMapData.nodes.find(n => n.id === selectedNode);
                  if (!node) return null;
                  
                  return (
                    <div>
                      <h4 className="font-medium mb-2">{node.label}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Category: {node.category}</span>
                        <span>Connections: {node.connections}</span>
                        <Badge variant="secondary">{node.size} node</Badge>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Content
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Connection
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Legend
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Categories</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Business</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs">Education</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Node Sizes</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                      <span className="text-xs">Large (8+ connections)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                      <span className="text-xs">Medium (4-7 connections)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <span className="text-xs">Small (1-3 connections)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Connections</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-blue-600"></div>
                      <span className="text-xs">Strong</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gray-400 border-dashed border-t"></div>
                      <span className="text-xs">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
