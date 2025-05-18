
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tag, SearchStats } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Mock data for analytics
const mockTagStats: SearchStats[] = [
  { tag_id: 't1', tag_name: 'react', search_count: 14 },
  { tag_id: 't2', tag_name: 'javascript', search_count: 12 },
  { tag_id: 't3', tag_name: 'tutorial', search_count: 8 },
  { tag_id: 't4', tag_name: 'job', search_count: 6 },
  { tag_id: 't5', tag_name: 'interview', search_count: 5 },
  { tag_id: 't6', tag_name: 'career', search_count: 4 },
  { tag_id: 't7', tag_name: 'productivity', search_count: 10 },
];

const contentTypeData = [
  { name: 'Articles', value: 18 },
  { name: 'PDFs', value: 7 },
  { name: 'Images', value: 5 },
];

const contentSavedData = [
  { date: 'May 1', count: 2 },
  { date: 'May 5', count: 1 },
  { date: 'May 10', count: 4 },
  { date: 'May 15', count: 2 },
  { date: 'May 18', count: 3 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#22C55E', '#EAB308'];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<string>("tags");
  const navigate = useNavigate();
  const { toast } = useToast();

  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>
        
        <Tabs defaultValue="tags" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="tags">Popular Tags</TabsTrigger>
            <TabsTrigger value="content-type">Content Types</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="tags">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockTagStats} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <XAxis dataKey="tag_name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [`${value} searches`, 'Search count']}
                          labelFormatter={(label) => `Tag: ${label}`}
                        />
                        <Bar dataKey="search_count" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content-type">
              <Card>
                <CardHeader>
                  <CardTitle>Content Type Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contentTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={(entry) => entry.name}
                        >
                          {contentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`${value} items`, props.payload.name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {contentTypeData.map((item, index) => (
                      <div key={item.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle>Content Saved Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={contentSavedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [`${value} items`, 'Items saved']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Bar dataKey="count" fill="#0EA5E9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
