
import { useEffect, useCallback } from 'react';
import { SecurityMonitor, logSecurityEvent } from '@/utils/security';
import { useSecureAuth } from '@/contexts/SecureAuthContext';

export const useSecurityMonitoring = () => {
  const { user } = useSecureAuth();
  const monitor = SecurityMonitor.getInstance();

  // Monitor for suspicious form activity
  const monitorFormActivity = useCallback(() => {
    let formSubmissionCount = 0;
    let lastSubmission = 0;

    const handleFormSubmit = (event: Event) => {
      const now = Date.now();
      if (now - lastSubmission < 1000) { // Less than 1 second between submissions
        formSubmissionCount++;
        if (formSubmissionCount > 3) {
          monitor.reportSuspiciousActivity('rapid_form_submissions', {
            count: formSubmissionCount,
            formAction: (event.target as HTMLFormElement)?.action || 'unknown'
          });
        }
      } else {
        formSubmissionCount = 0;
      }
      lastSubmission = now;
    };

    document.addEventListener('submit', handleFormSubmit);
    return () => document.removeEventListener('submit', handleFormSubmit);
  }, [monitor]);

  // Monitor for script injection attempts
  const monitorScriptInjection = useCallback(() => {
    const originalAppendChild = Node.prototype.appendChild;
    
    Node.prototype.appendChild = function<T extends Node>(newChild: T): T {
      if (newChild.nodeName === 'SCRIPT') {
        const script = newChild as unknown as HTMLScriptElement;
        const origin = window.location.origin;
        
        if (script.src && !script.src.startsWith(origin) && !script.src.startsWith('https://')) {
          monitor.reportSuspiciousActivity('external_script_injection', {
            scriptSrc: script.src,
            origin: origin
          });
        }
      }
      return originalAppendChild.call(this, newChild);
    };

    return () => {
      Node.prototype.appendChild = originalAppendChild;
    };
  }, [monitor]);

  // Monitor for excessive API calls
  const monitorApiCalls = useCallback(() => {
    let apiCallCount = 0;
    const startTime = Date.now();

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      apiCallCount++;
      
      // Check if too many API calls in short time
      const now = Date.now();
      if (now - startTime < 60000 && apiCallCount > 100) { // 100 calls per minute
        monitor.reportSuspiciousActivity('excessive_api_calls', {
          count: apiCallCount,
          timeWindow: now - startTime,
          url: args[0]
        });
      }
      
      return originalFetch.apply(window, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [monitor]);

  // Monitor for console manipulation
  const monitorConsoleAccess = useCallback(() => {
    let consoleCallCount = 0;
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      consoleCallCount++;
      if (consoleCallCount > 100) {
        monitor.reportSuspiciousActivity('excessive_console_usage', {
          count: consoleCallCount
        });
        consoleCallCount = 0; // Reset to avoid spam
      }
      return originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, [monitor]);

  // Monitor for URL manipulation attempts
  const monitorUrlManipulation = useCallback(() => {
    const originalPushState = history.pushState;
    
    history.pushState = function(state, title, url) {
      if (url && typeof url === 'string') {
        if (url.includes('javascript:') || url.includes('data:') || url.includes('<script')) {
          monitor.reportSuspiciousActivity('malicious_url_manipulation', {
            suspiciousUrl: url,
            blocked: true
          });
          return; // Block the navigation
        }
      }
      return originalPushState.call(this, state, title, url);
    };

    return () => {
      history.pushState = originalPushState;
    };
  }, [monitor]);

  // Initialize monitoring on component mount
  useEffect(() => {
    if (!user) return;

    logSecurityEvent('security_monitoring_initialized', {
      userId: user.id,
      timestamp: new Date().toISOString()
    });

    // Set up all monitoring functions
    const cleanupFunctions = [
      monitorFormActivity(),
      monitorScriptInjection(),
      monitorApiCalls(),
      monitorConsoleAccess(),
      monitorUrlManipulation()
    ];

    // Periodic security checks
    const securityCheckInterval = setInterval(() => {
      // Check localStorage size
      try {
        const localStorageSize = new Blob(Object.values(localStorage)).size;
        if (localStorageSize > 5 * 1024 * 1024) { // 5MB
          monitor.reportSuspiciousActivity('excessive_localstorage_usage', {
            size: localStorageSize
          });
        }
      } catch (error) {
        // localStorage might be disabled
      }

      // Check memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 100 * 1024 * 1024) { // 100MB
          monitor.reportSuspiciousActivity('high_memory_usage', {
            heapSize: memory.usedJSHeapSize
          });
        }
      }
    }, 60000); // Check every minute

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
      clearInterval(securityCheckInterval);
    };
  }, [user, monitor, monitorFormActivity, monitorScriptInjection, monitorApiCalls, monitorConsoleAccess, monitorUrlManipulation]);

  return {
    reportSuspiciousActivity: monitor.reportSuspiciousActivity.bind(monitor),
    logSecurityEvent
  };
};
