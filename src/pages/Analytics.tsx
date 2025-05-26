
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  BookmarkPlus, 
  Search, 
  Brain,
  Clock,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    { 
      label: "Total Content Saved", 
      value: "1,247", 
      change: "+12%", 
      trend: "up",
      icon: BookmarkPlus,
      color: "text-blue-600"
    },
    { 
      label: "Weekly Active Days", 
      value: "6/7", 
      change: "+1 day", 
      trend: "up",
      icon: Activity,
      color: "text-green-600"
    },
    { 
      label: "Search Queries", 
      value: "342", 
      change: "-8%", 
      trend: "down",
      icon: Search,
      color: "text-purple-600"
    },
    { 
      label: "AI Insights Generated", 
      value: "156", 
      change: "+24%", 
      trend: "up",
      icon: Brain,
      color: "text-orange-600"
    }
  ];

  const learningProgress = [
    { skill: "Web Development", progress: 85, items: 324, trend: "+15%" },
    { skill: "AI & ML", progress: 72, items: 187, trend: "+28%" },
    { skill: "Design", progress: 68, items: 156, trend: "+12%" },
    { skill: "Business", progress: 54, items: 98, trend: "+8%" },
    { skill: "DevOps", progress: 41, items: 142, trend: "+35%" }
  ];

  const weeklyActivity = [
    { day: "Mon", saves: 8, searches: 12 },
    { day: "Tue", saves: 12, searches: 18 },
    { day: "Wed", saves: 6, searches: 9 },
    { day: "Thu", saves: 15, searches: 22 },
    { day: "Fri", saves: 10, searches: 14 },
    { day: "Sat", saves: 4, searches: 7 },
    { day: "Sun", saves: 7, searches: 11 }
  ];

  const topCategories = [
    { name: "React Development", percentage: 28, items: 89 },
    { name: "Machine Learning", percentage: 22, items: 71 },
    { name: "UI Design", percentage: 18, items: 57 },
    { name: "Business Strategy", percentage: 16, items: 51 },
    { name: "Other", percentage: 16, items: 52 }
  ];

  return (
    <UnifiedPageLayout
      title="Analytics - Track Your Learning Progress | Accio"
      description="Monitor your knowledge growth with detailed analytics, learning patterns, and progress insights."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your learning progress and discover insights about your knowledge journey.
            </p>
          </div>
          <Button variant="outline" className="mt-4 lg:mt-0 gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'secondary'} 
                    className={stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  >
                    {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>
                  Your knowledge growth across different topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningProgress.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.skill}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.items} items</span>
                          <Badge variant="outline" className="text-xs">
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-500" 
                            style={{width: `${item.progress}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Activity
                </CardTitle>
                <CardDescription>
                  Your content saving and search patterns this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-10 text-sm font-medium">{day.day}</span>
                      <div className="flex-1 flex gap-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Saves</span>
                            <span className="text-xs font-medium">{day.saves}</span>
                          </div>
                          <div className="bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${(day.saves / 20) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Searches</span>
                            <span className="text-xs font-medium">{day.searches}</span>
                          </div>
                          <div className="bg-muted rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{width: `${(day.searches / 25) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Top Categories
                </CardTitle>
                <CardDescription>
                  Most saved content by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{width: `${category.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{category.items}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Knowledge Explorer</p>
                      <p className="text-xs text-muted-foreground">Saved 1000+ items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Consistent Learner</p>
                      <p className="text-xs text-muted-foreground">Active for 7 days straight</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">AI Enthusiast</p>
                      <p className="text-xs text-muted-foreground">Generated 100+ insights</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Analytics;
