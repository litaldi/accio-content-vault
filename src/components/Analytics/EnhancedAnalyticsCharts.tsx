
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Target, Search, Tag, Activity } from 'lucide-react';
import { ContentStats, TagInsights, SearchInsights, ActivityInsights } from '@/services/enhancedAnalyticsService';

const CHART_COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#22C55E', '#EAB308', '#EF4444'];

interface EnhancedAnalyticsChartsProps {
  contentStats: ContentStats;
  tagInsights: TagInsights;
  searchInsights: SearchInsights;
  activityInsights: ActivityInsights;
}

const EnhancedAnalyticsCharts: React.FC<EnhancedAnalyticsChartsProps> = ({
  contentStats,
  tagInsights,
  searchInsights,
  activityInsights
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const contentTypeData = Object.entries(contentStats.itemsByType).map(([type, count]) => ({
    name: type,
    value: count
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{contentStats.totalItems}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(contentStats.growthTrend)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tag Accuracy</p>
                <p className="text-2xl font-bold">{tagInsights.confirmationRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Searches</p>
                <p className="text-2xl font-bold">{searchInsights.totalSearches}</p>
              </div>
              <Search className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement Score</p>
                <p className="text-2xl font-bold">{activityInsights.engagementScore}%</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Content Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tag Accuracy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tag Accuracy Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tagInsights.tagAccuracyTrend}>
                  <XAxis dataKey="period" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Search Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Search Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={searchInsights.searchTrends}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Searches']} />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#0EA5E9" 
                    fill="#0EA5E9" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityInsights.dailyActivity}>
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) => [value, name === 'saves' ? 'Saves' : name === 'searches' ? 'Searches' : 'Tag Confirmations']}
                  />
                  <Bar dataKey="saves" fill="#22C55E" name="saves" />
                  <Bar dataKey="searches" fill="#8B5CF6" name="searches" />
                  <Bar dataKey="tagConfirmations" fill="#F97316" name="tagConfirmations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tagInsights.topConfirmedTags.slice(0, 5).map((tag, index) => (
              <div key={tag.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{tag.name}</p>
                    <p className="text-sm text-muted-foreground">{tag.count} uses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{tag.rate}%</p>
                  <p className="text-sm text-muted-foreground">confirmed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Search Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchInsights.topSearchTerms.map((term, index) => (
                <div key={term.query} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{term.query}</p>
                    <p className="text-sm text-muted-foreground">{term.count} searches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{term.avgResults} avg results</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Semantic Search Usage</span>
                <span className="font-medium">{searchInsights.semanticSearchUsage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Results per Search</span>
                <span className="font-medium">{searchInsights.averageResultsPerSearch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unique Queries</span>
                <span className="font-medium">{searchInsights.uniqueQueries}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsCharts;
