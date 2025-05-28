
/**
 * Security Headers Configuration for Production Deployment
 * These headers should be configured at the hosting level
 */

export const getSecurityHeadersConfig = () => {
  const headers = {
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // XSS Protection
    'X-XSS-Protection': '1; mode=block',
    
    // Control browser features
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // HTTPS enforcement (for production)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
      "block-all-mixed-content"
    ].join('; ')
  };

  return headers;
};

/**
 * Generate headers configuration for different hosting platforms
 */
export const getHostingConfigs = () => {
  const headers = getSecurityHeadersConfig();
  
  const configs = {
    // Netlify _headers file
    netlify: `/*
${Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`).join('\n')}`,

    // Vercel vercel.json
    vercel: {
      headers: [
        {
          source: "/(.*)",
          headers: Object.entries(headers).map(([key, value]) => ({
            key,
            value
          }))
        }
      ]
    },

    // Apache .htaccess
    apache: `<IfModule mod_headers.c>
${Object.entries(headers).map(([key, value]) => `  Header always set ${key} "${value}"`).join('\n')}
</IfModule>`,

    // Nginx configuration
    nginx: Object.entries(headers).map(([key, value]) => 
      `add_header ${key} "${value}" always;`
    ).join('\n')
  };

  return configs;
};

/**
 * Log security configuration instructions
 */
export const logSecuritySetup = () => {
  if (process.env.NODE_ENV === 'development') {
    const configs = getHostingConfigs();
    
    console.group('🔒 Security Headers Configuration');
    console.log('Configure these headers in your hosting platform:');
    console.log('\nFor Netlify (_headers file):');
    console.log(configs.netlify);
    console.log('\nFor Vercel (vercel.json):');
    console.log(JSON.stringify(configs.vercel, null, 2));
    console.groupEnd();
  }
};
