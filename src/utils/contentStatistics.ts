
// Function to calculate tag accuracy based on user confirmations
export const calculateTagAccuracy = (
  total: number,
  accurate: number
): { percentage: number; status: 'poor' | 'fair' | 'good' | 'excellent' } => {
  if (total === 0) return { percentage: 0, status: 'fair' };
  
  const percentage = (accurate / total) * 100;
  
  if (percentage < 50) return { percentage, status: 'poor' };
  if (percentage < 70) return { percentage, status: 'fair' };
  if (percentage < 90) return { percentage, status: 'good' };
  return { percentage, status: 'excellent' };
};

// Function to track most searched tags
export const getTopSearchedTags = (
  searchHistory: Array<{ query: string; tag?: string; timestamp: string }>
): Array<{ tag: string; count: number }> => {
  const tagCounts: Record<string, number> = {};
  
  // Count occurrences of each tag
  searchHistory.forEach((search) => {
    if (search.tag) {
      tagCounts[search.tag] = (tagCounts[search.tag] || 0) + 1;
    }
  });
  
  // Convert to array and sort by count
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

// Function to track search trends over time
export const getSearchTrends = (
  searchHistory: Array<{ query: string; timestamp: string }>
): Array<{ date: string; count: number }> => {
  const dailyCounts: Record<string, number> = {};
  
  // Group searches by day
  searchHistory.forEach((search) => {
    const date = new Date(search.timestamp).toISOString().split('T')[0];
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  });
  
  // Convert to array and sort by date
  return Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Function to generate content usage insights
export const generateContentInsights = (
  savedContent: number,
  searchCount: number,
  tagAccuracy: number
): string => {
  if (savedContent === 0) {
    return "Start by saving some content to see insights about your usage.";
  }
  
  if (searchCount === 0) {
    return "Try searching your content to see how well our tagging system works for you.";
  }
  
  if (tagAccuracy < 70) {
    return "Our tagging system is still learning from your feedback. Keep confirming tags to improve accuracy.";
  }
  
  return "You're making great use of Accio! Our tagging system is working well for your content.";
};
