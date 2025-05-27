
import { useState, useEffect } from 'react';

interface UsageStats {
  savesUsed: number;
  aiActionsUsed: number;
  collectionsUsed: number;
}

interface Limits {
  maxSaves: number;
  aiActionsPerMonth: number;
  maxCollections: number;
}

interface FeatureGating {
  currentPlan: 'free' | 'pro' | 'enterprise';
  usageStats: UsageStats;
  limits: Limits;
  hasReachedLimit: (feature: keyof UsageStats) => boolean;
  getRemainingUsage: (feature: keyof UsageStats) => number | null;
}

export const useFeatureGating = (): FeatureGating => {
  const [currentPlan] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [usageStats] = useState<UsageStats>({
    savesUsed: 42,
    aiActionsUsed: 15,
    collectionsUsed: 3
  });

  const limits: Limits = {
    maxSaves: currentPlan === 'free' ? 100 : currentPlan === 'pro' ? 1000 : -1,
    aiActionsPerMonth: currentPlan === 'free' ? 50 : currentPlan === 'pro' ? 500 : -1,
    maxCollections: currentPlan === 'free' ? 10 : currentPlan === 'pro' ? 100 : -1
  };

  const hasReachedLimit = (feature: keyof UsageStats): boolean => {
    const limit = limits[feature === 'savesUsed' ? 'maxSaves' : 
                         feature === 'aiActionsUsed' ? 'aiActionsPerMonth' : 'maxCollections'];
    if (limit === -1) return false; // Unlimited
    return usageStats[feature] >= limit;
  };

  const getRemainingUsage = (feature: keyof UsageStats): number | null => {
    const limit = limits[feature === 'savesUsed' ? 'maxSaves' : 
                         feature === 'aiActionsUsed' ? 'aiActionsPerMonth' : 'maxCollections'];
    if (limit === -1) return null; // Unlimited
    return Math.max(0, limit - usageStats[feature]);
  };

  return {
    currentPlan,
    usageStats,
    limits,
    hasReachedLimit,
    getRemainingUsage
  };
};
