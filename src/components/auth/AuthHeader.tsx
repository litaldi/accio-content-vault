
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center space-y-6">
      <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
          <Brain className="h-7 w-7 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Accio
        </span>
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};
