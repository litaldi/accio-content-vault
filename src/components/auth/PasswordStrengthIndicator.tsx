
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className
}) => {
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 'none', score: 0, checks: {} };
    
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    
    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 4) strength = 'strong';
    else if (score >= 3) strength = 'medium';
    
    return { strength, score, checks };
  };

  const { strength, checks } = getPasswordStrength(password);

  if (!password) return null;

  const requirements = [
    { key: 'length', text: 'At least 8 characters', met: checks.length },
    { key: 'lowercase', text: 'One lowercase letter', met: checks.lowercase },
    { key: 'uppercase', text: 'One uppercase letter', met: checks.uppercase },
    { key: 'numbers', text: 'One number', met: checks.numbers },
    { key: 'symbols', text: 'One special character', met: checks.symbols }
  ];

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        {strength === 'strong' && (
          <>
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600 font-medium">Strong password</span>
          </>
        )}
        {strength === 'medium' && (
          <>
            <AlertCircle className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-yellow-600 font-medium">Good password</span>
          </>
        )}
        {strength === 'weak' && (
          <>
            <AlertCircle className="h-3 w-3 text-red-500" />
            <span className="text-xs text-red-600 font-medium">Weak password</span>
          </>
        )}
      </div>
      
      <div className="w-full bg-muted rounded-full h-1.5">
        <div 
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            strength === 'weak' && "w-1/3 bg-red-500",
            strength === 'medium' && "w-2/3 bg-yellow-500",
            strength === 'strong' && "w-full bg-green-500"
          )}
        />
      </div>

      <ul className="space-y-1">
        {requirements.map((req) => (
          <li key={req.key} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
            )}
            <span className={cn(
              req.met ? "text-green-600" : "text-muted-foreground"
            )}>
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
