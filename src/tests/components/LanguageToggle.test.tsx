
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, testAccessibility } from '../utils/accessibility';
import { LanguageToggle } from '@/components/ui/language-toggle';
import '@testing-library/jest-dom';

// Mock the i18n functionality
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
      },
    };
  },
}));

// Mock the language context
jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    direction: 'ltr',
    changeLanguage: jest.fn(),
  }),
}));

describe('LanguageToggle Component', () => {
  it('should render correctly', () => {
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByLabelText('common.language.change')).toBeInTheDocument();
  });

  it('should open the dropdown when clicked', async () => {
    renderWithProviders(<LanguageToggle />);
    const button = screen.getByLabelText('common.language.change');
    
    await userEvent.click(button);
    
    expect(screen.getByText('common.language.en')).toBeInTheDocument();
    expect(screen.getByText('common.language.ar')).toBeInTheDocument();
    expect(screen.getByText('common.language.he')).toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    await testAccessibility(<LanguageToggle />);
  });
});
