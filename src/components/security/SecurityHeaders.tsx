
import { useEffect } from 'react';

export const SecurityHeaders: React.FC = () => {
  useEffect(() => {
    // Set Content Security Policy
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Needed for React dev
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://imumaonttctoziucdofs.supabase.co wss://imumaonttctoziucdofs.supabase.co",
      "media-src 'self'",
      "object-src 'none'",
      "frame-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    document.head.appendChild(cspMeta);

    // Set other security headers via meta tags
    const headers = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
    ];

    headers.forEach(header => {
      const meta = document.createElement('meta');
      meta.httpEquiv = header.name;
      meta.content = header.content;
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup on unmount
      const metaTags = document.querySelectorAll('meta[http-equiv]');
      metaTags.forEach(tag => {
        if (['Content-Security-Policy', 'X-Content-Type-Options', 'X-Frame-Options', 'X-XSS-Protection', 'Referrer-Policy'].includes(tag.getAttribute('http-equiv') || '')) {
          tag.remove();
        }
      });
    };
  }, []);

  return null;
};
