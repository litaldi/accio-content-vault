
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { preferences, setLanguage, announceToScreenReader } = useAccessibility();

  const handleLanguageChange = (lang: 'en' | 'he' | 'ar') => {
    setLanguage(lang);
    announceToScreenReader(`Language changed to ${lang === 'en' ? 'English' : lang === 'he' ? 'Hebrew' : 'Arabic'}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Change language"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline text-xs uppercase">
            {preferences.language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('he')}>
          עברית
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
