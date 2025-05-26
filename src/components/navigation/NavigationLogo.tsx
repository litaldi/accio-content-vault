
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const NavigationLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Brain className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold">Accio</span>
    </Link>
  );
};

export default NavigationLogo;
