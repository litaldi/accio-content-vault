
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Items Saved" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{stat.number}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
