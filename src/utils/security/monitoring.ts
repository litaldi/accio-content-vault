
import { logSecurityEvent } from './logging';

export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private suspiciousActivityCount = 0;
  private readonly maxSuspiciousActivity = 10;

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  reportSuspiciousActivity(type: string, details: any = {}) {
    this.suspiciousActivityCount++;
    
    logSecurityEvent('suspicious_activity', {
      type,
      details,
      count: this.suspiciousActivityCount,
      timestamp: new Date().toISOString()
    });

    // If too many suspicious activities, could implement additional measures
    if (this.suspiciousActivityCount >= this.maxSuspiciousActivity) {
      logSecurityEvent('high_suspicious_activity', {
        count: this.suspiciousActivityCount,
        type: 'threshold_exceeded'
      });
    }
  }

  monitorPerformance() {
    // Monitor for performance issues that might indicate attacks
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 5000) { // 5 seconds
          this.reportSuspiciousActivity('performance_degradation', {
            name: entry.name,
            duration: entry.duration,
            type: entry.entryType
          });
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }

  startMonitoring() {
    this.monitorPerformance();
    
    // Monitor for rapid API calls (potential DoS)
    let apiCallCount = 0;
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      apiCallCount++;
      
      // Reset counter every minute
      setTimeout(() => { apiCallCount--; }, 60000);
      
      if (apiCallCount > 100) { // More than 100 calls per minute
        this.reportSuspiciousActivity('rapid_api_calls', {
          count: apiCallCount,
          url: args[0]?.toString()
        });
      }
      
      return originalFetch.apply(window, args);
    };
  }
}
