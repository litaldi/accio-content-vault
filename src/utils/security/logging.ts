// Enhanced logging utility
export const logSecurityEvent = (event: string, details: any = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    details: {
      ...details,
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    }
  };
  
  console.log('[SECURITY]', logEntry);
  
  // Store in session storage for debugging
  try {
    const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
    logs.push(logEntry);
    // Keep only last 100 logs
    sessionStorage.setItem('security_logs', JSON.stringify(logs.slice(-100)));
  } catch (error) {
    // Ignore storage errors
  }
};
