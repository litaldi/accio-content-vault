
import * as React from "react"
import { useTranslation } from 'react-i18next';
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only showing after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label={t('common.language.change')}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className="flex items-center justify-between"
          aria-selected={language === 'en'}
        >
          <span>{t('common.language.en')}</span>
          {language === 'en' && (
            <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('ar')}
          className="flex items-center justify-between"
          aria-selected={language === 'ar'}
        >
          <span>{t('common.language.ar')}</span>
          {language === 'ar' && (
            <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('he')}
          className="flex items-center justify-between"
          aria-selected={language === 'he'}
        >
          <span>{t('common.language.he')}</span>
          {language === 'he' && (
            <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
