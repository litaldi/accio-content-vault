
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedAnalyticsCharts from '@/components/Analytics/EnhancedAnalyticsCharts';
import { 
  enhancedAnalyticsService, 
  ContentStats, 
  TagInsights, 
  SearchInsights, 
  ActivityInsights 
} from '@/services/enhancedAnalyticsService';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Analytics data state
  const [contentStats, setContentStats] = useState<ContentStats | null>(null);
  const [tagInsights, setTagInsights] = useState<TagInsights | null>(null);
  const [searchInsights, setSearchInsights] = useState<SearchInsights | null>(null);
  const [activityInsights, setActivityInsights] = useState<ActivityInsights | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const loadAnalyticsData = async () => {
    try {
      setIsRefreshing(true);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const [content, tags, search, activity] = await Promise.all([
        Promise.resolve(enhancedAnalyticsService.getContentStats()),
        Promise.resolve(enhancedAnalyticsService.getTagInsights()),
        Promise.resolve(enhancedAnalyticsService.getSearchInsights()),
        Promise.resolve(enhancedAnalyticsService.getActivityInsights())
      ]);

      setContentStats(content);
      setTagInsights(tags);
      setSearchInsights(search);
      setActivityInsights(activity);
      setLastUpdated(new Date());
      
      toast({
        title: "Analytics updated",
        description: "Your latest insights have been loaded successfully."
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error loading analytics",
        description: "Failed to refresh your analytics data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportData = () => {
    try {
      const analyticsData = {
        contentStats,
        tagInsights,
        searchInsights,
        activityInsights,
        exportedAt: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Your analytics data has been downloaded."
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export analytics data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Load data on component mount
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  if (!contentStats || !tagInsights || !searchInsights || !activityInsights) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Enhanced Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights into your content library usage
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadAnalyticsData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview">
              <EnhancedAnalyticsCharts
                contentStats={contentStats}
                tagInsights={tagInsights}
                searchInsights={searchInsights}
                activityInsights={activityInsights}
              />
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tag Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{tagInsights.confirmedTags}</div>
                        <div className="text-sm text-muted-foreground">Confirmed Tags</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">{tagInsights.rejectedTags}</div>
                        <div className="text-sm text-muted-foreground">Rejected Tags</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{tagInsights.confirmationRate.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Average Results per Search</span>
                          <span className="font-medium">{searchInsights.averageResultsPerSearch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Semantic Search Usage</span>
                          <span className="font-medium">{searchInsights.semanticSearchUsage.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Query Diversity</span>
                          <span className="font-medium">{((searchInsights.uniqueQueries / searchInsights.totalSearches) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {contentStats.itemsByTimeframe.map((item) => (
                          <div key={item.period} className="flex justify-between">
                            <span>{item.period}</span>
                            <span className="font-medium">{item.count} items</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tagInsights.confirmationRate > 85 ? (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <h3 className="font-medium text-green-800 dark:text-green-300">Excellent Tag Accuracy!</h3>
                          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                            Your tag confirmation rate of {tagInsights.confirmationRate.toFixed(1)}% indicates excellent AI tagging performance.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Tag Accuracy Improving</h3>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                            Continue providing feedback on tags to improve AI accuracy. Current rate: {tagInsights.confirmationRate.toFixed(1)}%
                          </p>
                        </div>
                      )}

                      {searchInsights.semanticSearchUsage < 30 ? (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h3 className="font-medium text-blue-800 dark:text-blue-300">Try Semantic Search</h3>
                          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                            You're using {searchInsights.semanticSearchUsage.toFixed(1)}% semantic search. Try natural language queries like "articles about career advice" for better results.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h3 className="font-medium text-purple-800 dark:text-purple-300">Great Search Habits!</h3>
                          <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                            You're effectively using semantic search ({searchInsights.semanticSearchUsage.toFixed(1)}% of searches). This helps find content more intuitively.
                          </p>
                        </div>
                      )}

                      {activityInsights.engagementScore > 80 ? (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <h3 className="font-medium text-emerald-800 dark:text-emerald-300">High Engagement</h3>
                          <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                            Your engagement score of {activityInsights.engagementScore}% shows you're actively using your content library. Keep it up!
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                          <h3 className="font-medium text-orange-800 dark:text-orange-300">Room for Growth</h3>
                          <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                            Consider setting up reminders or exploring more content to increase your engagement score ({activityInsights.engagementScore}%).
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
