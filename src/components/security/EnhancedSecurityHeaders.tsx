
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const EnhancedSecurityHeaders: React.FC = () => {
  const isDevelopment = window.location.hostname === 'localhost';
  
  // Enhanced CSP policy
  const cspPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://imumaonttctoziucdofs.supabase.co wss://imumaonttctoziucdofs.supabase.co https://api.stripe.com",
    "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
    ...(isDevelopment ? [] : ["block-all-mixed-content"])
  ].join('; ');

  return (
    <Helmet>
      {/* Enhanced Content Security Policy */}
      <meta httpEquiv="Content-Security-Policy" content={cspPolicy} />
      
      {/* Prevent MIME type sniffing */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Prevent clickjacking */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      
      {/* XSS Protection */}
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Referrer Policy */}
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Permissions Policy */}
      <meta 
        httpEquiv="Permissions-Policy" 
        content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()" 
      />
      
      {/* HSTS for HTTPS sites */}
      {!isDevelopment && (
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      )}
      
      {/* DNS Prefetch Control */}
      <meta httpEquiv="X-DNS-Prefetch-Control" content="off" />
      
      {/* Expect-CT Header */}
      {!isDevelopment && (
        <meta httpEquiv="Expect-CT" content="max-age=86400, enforce" />
      )}
    </Helmet>
  );
};

export default EnhancedSecurityHeaders;
