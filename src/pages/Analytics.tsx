
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Brain,
  BookmarkPlus,
  Eye,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const activityData = [
    { name: 'Mon', saved: 12, viewed: 45 },
    { name: 'Tue', saved: 19, viewed: 52 },
    { name: 'Wed', saved: 15, viewed: 38 },
    { name: 'Thu', saved: 25, viewed: 61 },
    { name: 'Fri', saved: 22, viewed: 49 },
    { name: 'Sat', saved: 8, viewed: 28 },
    { name: 'Sun', saved: 14, viewed: 35 }
  ];

  const categoryData = [
    { name: 'Web Development', value: 324, color: '#3b82f6' },
    { name: 'AI & ML', value: 187, color: '#8b5cf6' },
    { name: 'Design', value: 156, color: '#ec4899' },
    { name: 'Business', value: 98, color: '#10b981' },
    { name: 'DevOps', value: 142, color: '#f59e0b' }
  ];

  const learningTrendData = [
    { month: 'Jan', progress: 20 },
    { month: 'Feb', progress: 35 },
    { month: 'Mar', progress: 45 },
    { month: 'Apr', progress: 60 },
    { month: 'May', progress: 75 },
    { month: 'Jun', progress: 85 }
  ];

  const stats = [
    {
      title: "Total Items Saved",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: BookmarkPlus,
      description: "Items added this week"
    },
    {
      title: "Content Viewed",
      value: "3,842",
      change: "+8%",
      changeType: "positive",
      icon: Eye,
      description: "Page views this week"
    },
    {
      title: "Study Time",
      value: "24.5h",
      change: "+15%",
      changeType: "positive",
      icon: Clock,
      description: "Hours spent learning"
    },
    {
      title: "Knowledge Score",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: Brain,
      description: "Overall comprehension"
    }
  ];

  const insights = [
    {
      title: "Peak Learning Time",
      description: "You're most active between 2-4 PM",
      icon: Clock,
      type: "time"
    },
    {
      title: "Growing Interest",
      description: "AI & Machine Learning content up 45%",
      icon: TrendingUp,
      type: "trend"
    },
    {
      title: "Knowledge Gap",
      description: "Consider exploring more DevOps content",
      icon: Target,
      type: "suggestion"
    }
  ];

  return (
    <UnifiedPageLayout
      title="Analytics - Track Your Learning | Accio"
      description="Monitor your learning progress, content consumption patterns, and knowledge growth with detailed analytics and insights."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your learning journey and discover insights about your knowledge consumption.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <div className="flex rounded-lg border">
              {['7d', '30d', '90d'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={range !== '7d' ? 'border-l-0 rounded-l-none' : 'rounded-r-none'}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{stat.description}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Daily Activity
                </CardTitle>
                <CardDescription>
                  Content saved and viewed over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="saved" fill="#3b82f6" name="Saved" />
                    <Bar dataKey="viewed" fill="#8b5cf6" name="Viewed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Content by Category</CardTitle>
                <CardDescription>
                  Distribution of your saved content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Progress & Insights */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Learning Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>
                Your knowledge growth over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={learningTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <insight.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">This Week's Goal</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Save 50 new items and spend 10 hours learning
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items saved</span>
                    <span>48/50</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Analytics;
