
import * as React from "react"
import { useTranslation } from 'react-i18next';
import { Globe } from "lucide-react"
import { useLanguage, Language } from "@/contexts/LanguageContext"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only showing after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent flash of incorrect content
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label={t('common.language.change')}
          title={t('common.language.current', { language: t(`common.language.${language}`) })}
          data-testid="language-toggle"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
          <span className="sr-only">{t('common.language.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center justify-between"
            aria-selected={language === lang.code}
            data-testid={`language-option-${lang.code}`}
          >
            <span>{t(`common.language.${lang.code}`)}</span>
            {language === lang.code && (
              <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
