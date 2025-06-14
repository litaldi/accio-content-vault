
import React from 'react';
import { ModernCard, ModernCardHeader, ModernCardContent } from '@/components/ui/modern-card';
import { ModernButton } from '@/components/ui/modern-button';
import { 
  TrendingUp, 
  BookOpen, 
  Search, 
  Plus, 
  BarChart3, 
  Users, 
  Clock,
  ArrowRight,
  Brain
} from 'lucide-react';

export const ModernDashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Knowledge Items', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Searches Today', 
      value: '89', 
      change: '+23%', 
      trend: 'up',
      icon: Search,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'AI Insights', 
      value: '156', 
      change: '+8%', 
      trend: 'up',
      icon: Brain,
      color: 'from-pink-500 to-pink-600'
    },
    { 
      label: 'Team Members', 
      value: '12', 
      change: '+2', 
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
  ];

  const recentActivity = [
    { action: 'Added new article', item: 'AI in Healthcare', time: '2 minutes ago' },
    { action: 'Generated summary', item: 'Market Research Q4', time: '15 minutes ago' },
    { action: 'Shared knowledge base', item: 'Product Documentation', time: '1 hour ago' },
    { action: 'Created tag', item: 'Machine Learning', time: '2 hours ago' },
  ];

  return (
    <div className="section-modern bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900/50 dark:via-gray-900 dark:to-blue-950/30">
      <div className="container-modern">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold heading-gradient mb-2">
              Welcome back!
            </h1>
            <p className="text-modern-muted">
              Here's what's happening with your knowledge base today.
            </p>
          </div>
          <div className="flex gap-3 mt-6 lg:mt-0">
            <ModernButton variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </ModernButton>
            <ModernButton gradient>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </ModernButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ModernCard key={index} glass hover>
              <ModernCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-modern-muted mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <ModernCard glass className="lg:col-span-2">
            <ModernCardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
              <p className="text-sm text-modern-muted">
                Jump into your most common tasks
              </p>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Add Knowledge
                  </h3>
                  <p className="text-sm text-modern-muted">
                    Upload documents, web pages, or notes
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border border-green-100 dark:border-green-800/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Smart Search
                  </h3>
                  <p className="text-sm text-modern-muted">
                    Find anything with AI-powered search
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-100 dark:border-orange-800/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Generate Insights
                  </h3>
                  <p className="text-sm text-modern-muted">
                    AI-powered summaries and analysis
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-800/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    View Analytics
                  </h3>
                  <p className="text-sm text-modern-muted">
                    Track usage and discover patterns
                  </p>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>

          {/* Recent Activity */}
          <ModernCard glass>
            <ModernCardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <Clock className="w-5 h-5 text-modern-muted" />
              </div>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                        {activity.item}
                      </p>
                      <p className="text-xs text-modern-subtle mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <ModernButton variant="ghost" className="w-full">
                  View All Activity
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ModernButton>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
