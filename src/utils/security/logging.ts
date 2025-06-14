// Enhanced logging utility
export const logSecurityEvent = (event: string, details: any = {}) => {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    details: typeof details === 'object' ? details : { message: details },
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.info('[SECURITY]', logData);
  }
  
  // In production, this would send to a monitoring service
  // For now, we'll store in sessionStorage for debugging
  try {
    const existingLogs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
    existingLogs.push(logData);
    
    // Keep only the last 100 logs to prevent storage overflow
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    sessionStorage.setItem('security_logs', JSON.stringify(existingLogs));
  } catch (error) {
    // Ignore storage errors
    console.warn('Failed to store security log:', error);
  }
};
