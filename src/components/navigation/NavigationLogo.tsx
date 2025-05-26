
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const NavigationLogo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
      aria-label="Accio - Go to homepage"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
        <Brain className="h-5 w-5 text-white" />
      </div>
      <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Accio
      </span>
    </Link>
  );
};

export default NavigationLogo;
