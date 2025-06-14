
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
    </Helmet>
  );
};

export default SecurityHeaders;
