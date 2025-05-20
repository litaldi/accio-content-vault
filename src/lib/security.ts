
/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitizes text input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string safe for rendering
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/**
 * Sanitizes HTML content with a more permissive approach
 * Use only when you need to allow certain HTML tags
 * @param html HTML content to sanitize
 * @returns Sanitized HTML with safe tags only
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  
  // Create a DOMParser to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove potentially dangerous tags and attributes
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form'];
  const dangerousAttrs = ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeypress'];
  
  dangerousTags.forEach(tag => {
    const elements = doc.getElementsByTagName(tag);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
  });
  
  // Remove dangerous attributes from all elements
  const allElements = doc.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    const elem = allElements[i];
    dangerousAttrs.forEach(attr => {
      if (elem.hasAttribute(attr)) {
        elem.removeAttribute(attr);
      }
    });
    
    // Sanitize URLs in attributes
    ['href', 'src'].forEach(urlAttr => {
      if (elem.hasAttribute(urlAttr)) {
        const url = elem.getAttribute(urlAttr);
        if (url && (url.startsWith('javascript:') || url.startsWith('data:'))) {
          elem.removeAttribute(urlAttr);
        }
      }
    });
  }
  
  return doc.body.innerHTML;
}
