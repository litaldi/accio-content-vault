
import { logSecurityEvent } from '@/utils/security';

class SecurityMonitor {
  private static instance: SecurityMonitor;
  private suspiciousActivityCount = 0;
  private lastActivityReset = Date.now();
  private readonly ACTIVITY_WINDOW = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_SUSPICIOUS_ACTIVITIES = 10;

  public static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  public initialize() {
    this.setupEventListeners();
    this.setupPeriodicChecks();
  }

  private setupEventListeners() {
    // Monitor for rapid form submissions
    let formSubmissionCount = 0;
    let lastFormSubmission = 0;

    document.addEventListener('submit', (event) => {
      const now = Date.now();
      if (now - lastFormSubmission < 1000) { // Less than 1 second between submissions
        formSubmissionCount++;
        if (formSubmissionCount > 3) {
          this.reportSuspiciousActivity('Rapid form submissions detected', {
            formAction: (event.target as HTMLFormElement)?.action,
            submissionCount: formSubmissionCount
          });
        }
      } else {
        formSubmissionCount = 0;
      }
      lastFormSubmission = now;
    });

    // Monitor for suspicious script injections
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function<T extends Node>(newChild: T): T {
      if (newChild.nodeName === 'SCRIPT') {
        const script = newChild as unknown as HTMLScriptElement;
        if (!script.src.includes(window.location.origin) && script.src.startsWith('http')) {
          SecurityMonitor.getInstance().reportSuspiciousActivity('External script injection attempt', {
            scriptSrc: script.src,
            scriptContent: script.textContent?.substring(0, 100)
          });
        }
      }
      return originalAppendChild.call(this, newChild);
    };

    // Monitor for console access (potential debugging attempts)
    let consoleAccessCount = 0;
    const originalLog = console.log;
    console.log = (...args) => {
      consoleAccessCount++;
      if (consoleAccessCount > 50) { // High console usage
        SecurityMonitor.getInstance().reportSuspiciousActivity('Excessive console usage detected', {
          accessCount: consoleAccessCount
        });
        consoleAccessCount = 0; // Reset to avoid spam
      }
      return originalLog.apply(console, args);
    };

    // Monitor for suspicious URL changes
    const originalPushState = history.pushState;
    history.pushState = function(state, title, url) {
      if (url && typeof url === 'string') {
        if (url.includes('javascript:') || url.includes('data:') || url.includes('<script')) {
          SecurityMonitor.getInstance().reportSuspiciousActivity('Suspicious URL manipulation', {
            suspiciousUrl: url
          });
          return; // Block the navigation
        }
      }
      return originalPushState.call(this, state, title, url);
    };
  }

  private setupPeriodicChecks() {
    // Check for suspicious patterns every minute
    setInterval(() => {
      this.checkForAnomalies();
      this.resetCountersIfNeeded();
    }, 60000);
  }

  private checkForAnomalies() {
    // Check for unusual localStorage usage
    try {
      const localStorageSize = new Blob(Object.values(localStorage)).size;
      if (localStorageSize > 5 * 1024 * 1024) { // 5MB
        this.reportSuspiciousActivity('Excessive localStorage usage', {
          size: localStorageSize
        });
      }
    } catch (error) {
      // localStorage might be disabled
    }

    // Check for memory usage anomalies
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize > 100 * 1024 * 1024) { // 100MB
        this.reportSuspiciousActivity('High memory usage detected', {
          heapSize: memory.usedJSHeapSize
        });
      }
    }
  }

  private resetCountersIfNeeded() {
    const now = Date.now();
    if (now - this.lastActivityReset > this.ACTIVITY_WINDOW) {
      this.suspiciousActivityCount = 0;
      this.lastActivityReset = now;
    }
  }

  public reportSuspiciousActivity(description: string, details: any = {}) {
    this.suspiciousActivityCount++;
    
    logSecurityEvent(`Suspicious activity: ${description}`, {
      ...details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      activityCount: this.suspiciousActivityCount
    });

    // If too many suspicious activities, take action
    if (this.suspiciousActivityCount > this.MAX_SUSPICIOUS_ACTIVITIES) {
      this.handleHighRiskActivity();
    }
  }

  private handleHighRiskActivity() {
    logSecurityEvent('High risk activity threshold exceeded', {
      activityCount: this.suspiciousActivityCount,
      timestamp: new Date().toISOString()
    });

    // In a real application, you might:
    // - Force logout
    // - Temporarily disable certain features
    // - Show security warning to user
    // - Report to security monitoring service
    
    console.warn('Security: High risk activity detected. Please ensure you are using the application securely.');
  }
}

export const securityMonitor = SecurityMonitor.getInstance();
