
import { useState, useEffect } from 'react';

export function useAccessibilitySettings() {
  const [fontSize, setFontSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    // Get stored preferences
    const storedFontSize = localStorage.getItem('accessibility-font-size');
    const storedHighContrast = localStorage.getItem('highContrast') === 'true';
    const storedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    
    if (storedFontSize) setFontSize(parseInt(storedFontSize));
    setIsHighContrast(storedHighContrast);
    setIsReducedMotion(storedReducedMotion);

    // Apply stored settings
    document.documentElement.style.fontSize = `${storedFontSize || 100}%`;
    if (storedHighContrast) document.documentElement.classList.add('high-contrast');
    if (storedReducedMotion) document.documentElement.classList.add('reduce-animations');
  }, []);

  // Apply font size changes
  const changeFontSize = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}%`;
    localStorage.setItem('accessibility-font-size', value.toString());
  };

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', newValue ? 'true' : 'false');
  };

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    document.documentElement.classList.toggle('reduce-animations');
    localStorage.setItem('reducedMotion', newValue ? 'true' : 'false');
  };

  // Reset all accessibility settings
  const resetSettings = () => {
    // Reset font size
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('accessibility-font-size', '100');
    
    // Reset high contrast
    setIsHighContrast(false);
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('highContrast', 'false');
    
    // Reset reduced motion
    setIsReducedMotion(false);
    document.documentElement.classList.remove('reduce-animations');
    localStorage.setItem('reducedMotion', 'false');
  };

  return {
    fontSize,
    isHighContrast,
    isReducedMotion,
    changeFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetSettings
  };
}
