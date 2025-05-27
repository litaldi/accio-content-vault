
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

interface FeatureLimits {
  aiActionsPerMonth: number;
  maxCollections: number;
  maxSaves: number;
  canExport: boolean;
  hasApiAccess: boolean;
  hasPrioritySupport: boolean;
  canUseAdvancedAI: boolean;
  maxTeamMembers: number;
}

interface UsageStats {
  aiActionsUsed: number;
  collectionsUsed: number;
  savesUsed: number;
}

const PLAN_LIMITS: Record<string, FeatureLimits> = {
  free: {
    aiActionsPerMonth: 100,
    maxCollections: 3,
    maxSaves: 1000,
    canExport: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    canUseAdvancedAI: false,
    maxTeamMembers: 1,
  },
  pro: {
    aiActionsPerMonth: -1, // unlimited
    maxCollections: -1,
    maxSaves: -1,
    canExport: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    canUseAdvancedAI: true,
    maxTeamMembers: 1,
  },
  team: {
    aiActionsPerMonth: -1,
    maxCollections: -1,
    maxSaves: -1,
    canExport: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    canUseAdvancedAI: true,
    maxTeamMembers: 10,
  },
  enterprise: {
    aiActionsPerMonth: -1,
    maxCollections: -1,
    maxSaves: -1,
    canExport: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    canUseAdvancedAI: true,
    maxTeamMembers: -1,
  },
};

export const useFeatureGating = () => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [usageStats, setUsageStats] = useState<UsageStats>({
    aiActionsUsed: 0,
    collectionsUsed: 0,
    savesUsed: 0,
  });

  useEffect(() => {
    // In a real app, fetch the user's current plan and usage from your backend
    if (user) {
      // Simulate fetching plan info
      setCurrentPlan('free'); // Default to free for demo
      setUsageStats({
        aiActionsUsed: 45,
        collectionsUsed: 2,
        savesUsed: 128,
      });
    }
  }, [user]);

  const limits = PLAN_LIMITS[currentPlan];

  const canUseFeature = (feature: keyof FeatureLimits): boolean => {
    return limits[feature] === true || limits[feature] === -1;
  };

  const hasReachedLimit = (feature: keyof UsageStats): boolean => {
    const limit = limits[feature.replace('Used', 'PerMonth').replace('saves', 'maxSaves').replace('collections', 'maxCollections') as keyof FeatureLimits] as number;
    if (limit === -1) return false; // unlimited
    return usageStats[feature] >= limit;
  };

  const getRemainingUsage = (feature: keyof UsageStats): number | null => {
    const limitKey = feature.replace('Used', 'PerMonth').replace('saves', 'maxSaves').replace('collections', 'maxCollections') as keyof FeatureLimits;
    const limit = limits[limitKey] as number;
    if (limit === -1) return null; // unlimited
    return Math.max(0, limit - usageStats[feature]);
  };

  const getUpgradeMessage = (feature: string): string => {
    switch (currentPlan) {
      case 'free':
        return `Upgrade to Pro to unlock unlimited ${feature} and advanced features.`;
      case 'pro':
        return `Upgrade to Team for collaboration features and team management.`;
      default:
        return `Contact sales to discuss enterprise features.`;
    }
  };

  return {
    currentPlan,
    limits,
    usageStats,
    canUseFeature,
    hasReachedLimit,
    getRemainingUsage,
    getUpgradeMessage,
  };
};
