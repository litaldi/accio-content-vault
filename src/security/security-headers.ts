
/**
 * Security Headers Configuration
 * 
 * This file defines recommended security headers for the application.
 * These headers should be applied at the server/hosting level.
 */

export const securityHeaders = {
  // Prevent browsers from incorrectly detecting non-scripts as scripts
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // XSS Protection 
  'X-XSS-Protection': '1; mode=block',
  
  // Permissions Policy to control browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // HTTP Strict Transport Security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Content Security Policy - a starter policy that should be customized
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " + // Can be tightened further
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://*.supabase.co; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests; " +
    "block-all-mixed-content"
};

/**
 * Implementation Notes:
 * 
 * For Vite/React SPA deployments, these headers need to be configured at the hosting level:
 * 
 * - For Netlify: Use _headers file or netlify.toml
 * - For Vercel: Use vercel.json
 * - For AWS/CloudFront: Configure in distribution settings
 * - For Nginx: Add to server or location configuration blocks
 */

export const getHeadersConfigExamples = () => {
  console.info(`
Security Headers Implementation Examples:

For Netlify (_headers file):
/*
  ${Object.entries(securityHeaders)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n  ')}

For Vercel (vercel.json):
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        ${Object.entries(securityHeaders)
          .map(([key, value]) => `{ "key": "${key}", "value": "${value}" }`)
          .join(',\n        ')}
      ]
    }
  ]
}

For containerized deployments, ensure your web server configuration applies these headers.
  `);
};
