
/**
 * Automated site health monitoring for quality assurance
 */

import { runSiteAudit, logSiteAudit } from './site-audit';
import { runButtonAuditReport } from './button-audit';
import { logContrastIssues } from './contrast-checker';
import { logProductionChecks } from './production-checks';
import { runFinalQAAudit } from './final-qa-audit';
import { runAccessibilityValidation } from './accessibility-validator';

export const runFullSiteHealthCheck = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🏥 Complete Site Health Check');
    
    // Run all audits
    logSiteAudit();
    runButtonAuditReport();
    logContrastIssues();
    logProductionChecks();
    runAccessibilityValidation();
    const qaReport = runFinalQAAudit();
    
    console.groupEnd();
    
    // Show summary in a nice format
    const audit = runSiteAudit();
    const combinedScore = Math.round((audit.score + qaReport.score) / 2);
    
    if (combinedScore >= 90) {
      console.log('🟢 Site Health: Excellent (' + combinedScore + '%)');
    } else if (combinedScore >= 70) {
      console.log('🟡 Site Health: Good (' + combinedScore + '%) - Some improvements needed');
    } else {
      console.log('🔴 Site Health: Needs Attention (' + combinedScore + '%) - Please review issues');
    }
    
    // QA-specific recommendations
    if (qaReport.summary.critical > 0) {
      console.warn('⚠️ Critical issues found - address before launch');
    }
    if (qaReport.summary.high > 0) {
      console.warn('🔶 High priority issues should be addressed');
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
