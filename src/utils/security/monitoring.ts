
import { logSecurityEvent } from './logging';

// Enhanced security monitoring
export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private suspiciousActivityCount = 0;
  private lastReset = Date.now();

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  reportSuspiciousActivity(activity: string, details: any = {}) {
    this.suspiciousActivityCount++;
    
    console.warn(`Security Alert: ${activity}`, details);
    
    // Log to security audit if available
    this.logSecurityEvent('suspicious_activity', {
      activity,
      details,
      count: this.suspiciousActivityCount,
      timestamp: new Date().toISOString()
    });

    // Reset counter every hour
    const now = Date.now();
    if (now - this.lastReset > 3600000) {
      this.suspiciousActivityCount = 0;
      this.lastReset = now;
    }

    // Take action if too many suspicious activities
    if (this.suspiciousActivityCount > 10) {
      this.handleHighRiskActivity();
    }
  }

  private handleHighRiskActivity() {
    this.logSecurityEvent('high_risk_activity_detected', {
      count: this.suspiciousActivityCount,
      timestamp: new Date().toISOString()
    });

    // Could implement additional security measures here
    console.error('High risk security activity detected');
  }

  private logSecurityEvent(eventType: string, details: any) {
    // This would integrate with the database audit log
    console.log(`Security Event: ${eventType}`, details);
  }
}
