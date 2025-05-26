
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Star,
  BookOpen,
  FolderOpen,
  Brain,
  Target
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    { label: "Total Knowledge Items", value: "1,247", icon: BookOpen, change: "+23%" },
    { label: "Active Collections", value: "18", icon: FolderOpen, change: "+3" },
    { label: "Time Saved This Month", value: "28.5h", icon: Clock, change: "+12%" },
    { label: "Learning Streak", value: "12 days", icon: Target, change: "New!" }
  ];

  const weeklyActivity = [
    { day: "Mon", saves: 12 },
    { day: "Tue", saves: 8 },
    { day: "Wed", saves: 15 },
    { day: "Thu", saves: 22 },
    { day: "Fri", saves: 18 },
    { day: "Sat", saves: 5 },
    { day: "Sun", saves: 9 }
  ];

  const topCollections = [
    { name: "AI & Future Tech", items: 47, growth: "+12" },
    { name: "Developer's Toolkit", items: 89, growth: "+15" },
    { name: "Design Mastery", items: 33, growth: "+8" },
    { name: "Business Strategy", items: 24, growth: "+6" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Analytics - Accio</title>
        <meta name="description" content="Track your knowledge growth, learning patterns, and productivity insights with detailed analytics." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground text-lg">
                  Track your knowledge growth and learning patterns
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Weekly Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm text-muted-foreground">{day.day}</div>
                        <div className="flex-1 bg-muted rounded-full h-2 relative">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(day.saves / 25) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-sm font-medium">{day.saves}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Collections */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    Top Collections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCollections.map((collection, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-medium">{collection.name}</div>
                          <div className="text-sm text-muted-foreground">{collection.items} items</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {collection.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="py-8 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Knowledge Growth</h3>
                  <p className="text-muted-foreground mb-4">
                    You're on track to save 40+ hours this month through better knowledge organization.
                  </p>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +35% vs last month
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Learning Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Your most productive learning day is Thursday, with an average of 22 saves.
                  </p>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    <Target className="h-3 w-3 mr-1" />
                    Peak performance
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
