
import React from 'react';

interface DashboardStatsProps {
  tagStats: {
    confirmed: number;
    rejected: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ tagStats }) => {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full">
        {tagStats.confirmed} tags confirmed
      </div>
      <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full">
        {tagStats.rejected} tags rejected
      </div>
    </div>
  );
};

export default DashboardStats;
