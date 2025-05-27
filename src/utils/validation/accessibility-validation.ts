
/**
 * Accessibility Validation Utilities
 */

/**
 * Accessibility validation
 */
export const validateAccessibility = (): {
  hasSkipLinks: boolean;
  hasProperHeadingStructure: boolean;
  hasAltTextIssues: boolean;
  accessibilityWarnings: string[];
} => {
  const warnings: string[] = [];
  
  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href="#main-content"], a[href^="#main"]');
  
  // Check heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const h1Count = document.querySelectorAll('h1').length;
  
  if (h1Count === 0) {
    warnings.push('No H1 heading found');
  } else if (h1Count > 1) {
    warnings.push('Multiple H1 headings found');
  }
  
  // Check for images without alt text
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} images without alt text`);
  }
  
  // Check for proper form labels
  const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
  const unlabeledInputs = Array.from(inputsWithoutLabels).filter(input => {
    const id = input.getAttribute('id');
    return !id || !document.querySelector(`label[for="${id}"]`);
  });
  
  if (unlabeledInputs.length > 0) {
    warnings.push(`${unlabeledInputs.length} form inputs without proper labels`);
  }
  
  return {
    hasSkipLinks: skipLinks.length > 0,
    hasProperHeadingStructure: h1Count === 1,
    hasAltTextIssues: imagesWithoutAlt.length > 0,
    accessibilityWarnings: warnings
  };
};
