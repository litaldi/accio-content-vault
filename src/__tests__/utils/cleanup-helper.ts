
/**
 * Utility functions for test cleanup and validation
 */

export const validateNoUnusedImports = (fileContent: string): string[] => {
  const issues: string[] = [];
  const lines = fileContent.split('\n');
  
  const imports = lines
    .filter(line => line.trim().startsWith('import'))
    .map(line => {
      const match = line.match(/import\s+(?:{([^}]+)}|\*\s+as\s+(\w+)|(\w+))/);
      return match ? match[1] || match[2] || match[3] : null;
    })
    .filter(Boolean);

  imports.forEach(importItem => {
    if (importItem && !fileContent.includes(importItem.replace(/\s+/g, ''))) {
      issues.push(`Unused import: ${importItem}`);
    }
  });

  return issues;
};

export const validateTestCoverage = (testFiles: string[]): {
  coverage: number;
  missingTests: string[];
  suggestions: string[];
} => {
  const coreComponents = [
    'Dashboard',
    'SaveContent',
    'QuickActionsPanel',
    'ActivityFeed',
    'ProgressTracker',
    'NotificationCenter',
    'InsightsWidget',
    'SmartTips',
  ];

  const testedComponents = testFiles
    .map(file => file.split('/').pop()?.replace('.test.tsx', ''))
    .filter(Boolean);

  const missingTests = coreComponents.filter(
    component => !testedComponents.includes(component)
  );

  const coverage = ((coreComponents.length - missingTests.length) / coreComponents.length) * 100;

  const suggestions = [
    'Add snapshot tests for UI components',
    'Test error boundary scenarios',
    'Add performance tests for large data sets',
    'Test responsive breakpoint behaviors',
    'Add accessibility violation detection',
  ];

  return { coverage, missingTests, suggestions };
};

export const generateTestReport = () => {
  return {
    timestamp: new Date().toISOString(),
    testTypes: ['unit', 'integration', 'accessibility', 'e2e'],
    recommendations: [
      'Implement visual regression testing',
      'Add cross-browser compatibility tests',
      'Include mobile device testing',
      'Test with assistive technologies',
    ],
  };
};
