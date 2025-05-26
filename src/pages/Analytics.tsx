
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, FileText, Calendar, Tag, Activity } from 'lucide-react';

const Analytics = () => {
  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', saved: 12, accessed: 45 },
    { month: 'Feb', saved: 19, accessed: 52 },
    { month: 'Mar', saved: 15, accessed: 38 },
    { month: 'Apr', saved: 22, accessed: 67 },
    { month: 'May', saved: 28, accessed: 73 },
    { month: 'Jun', saved: 31, accessed: 89 }
  ];

  const categoryData = [
    { name: 'Web Development', value: 35, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#8b5cf6' },
    { name: 'Research', value: 20, color: '#10b981' },
    { name: 'Productivity', value: 20, color: '#f59e0b' }
  ];

  const stats = [
    {
      title: "Total Items",
      value: "127",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "This Month",
      value: "31",
      change: "+23%",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Active Tags",
      value: "18",
      change: "+5%",
      icon: Tag,
      color: "text-purple-600"
    },
    {
      title: "Weekly Access",
      value: "89",
      change: "+18%",
      icon: Activity,
      color: "text-orange-600"
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Analytics - Accio Knowledge Library</title>
        <meta name="description" content="Track your knowledge consumption patterns and discover insights about your learning habits." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Header */}
          <div className="mb-8">
            <UnifiedTypography.H1>Analytics Dashboard</UnifiedTypography.H1>
            <UnifiedTypography.Lead>
              Insights into your knowledge consumption and learning patterns.
            </UnifiedTypography.Lead>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Activity
                </CardTitle>
                <CardDescription>
                  Content saved vs. accessed over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="saved" fill="#3b82f6" name="Saved" />
                    <Bar dataKey="accessed" fill="#10b981" name="Accessed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
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
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Access Pattern</CardTitle>
              <CardDescription>
                How often you access your knowledge library throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { day: 'Mon', access: 12 },
                  { day: 'Tue', access: 19 },
                  { day: 'Wed', access: 15 },
                  { day: 'Thu', access: 22 },
                  { day: 'Fri', access: 28 },
                  { day: 'Sat', access: 8 },
                  { day: 'Sun', access: 5 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="access" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Analytics;
