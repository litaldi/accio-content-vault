
/**
 * Automated site health monitoring for quality assurance
 */

import { runSiteAudit, logSiteAudit } from './site-audit';
import { runButtonAuditReport } from './button-audit';
import { logContrastIssues } from './contrast-checker';
import { logProductionChecks } from './production-checks';

export const runFullSiteHealthCheck = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🏥 Complete Site Health Check');
    
    // Run all audits
    logSiteAudit();
    runButtonAuditReport();
    logContrastIssues();
    logProductionChecks();
    
    console.groupEnd();
    
    // Show summary in a nice format
    const audit = runSiteAudit();
    if (audit.score >= 90) {
      console.log('🟢 Site Health: Excellent (' + audit.score + '%)');
    } else if (audit.score >= 70) {
      console.log('🟡 Site Health: Good (' + audit.score + '%) - Some improvements needed');
    } else {
      console.log('🔴 Site Health: Needs Attention (' + audit.score + '%) - Please review issues');
    }
  }
};

// Auto-run health check in development
if (process.env.NODE_ENV === 'development') {
  // Run after DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(runFullSiteHealthCheck, 2000); // Wait for React to render
    });
  } else {
    setTimeout(runFullSiteHealthCheck, 2000);
  }
}
