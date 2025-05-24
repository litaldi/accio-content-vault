
/**
 * Color contrast utility functions for accessibility compliance
 */

// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Calculate relative luminance for a color
export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  
  // Convert RGB to sRGB
  const sRGB = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255,
  };
  
  // Apply formula for each channel
  const channels = Object.values(sRGB).map((val) => {
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  // Calculate luminance using the formula L = 0.2126*R + 0.7152*G + 0.0722*B
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

// Calculate contrast ratio between two colors
export function getContrastRatio(foreground: string, background: string): number {
  const foregroundLum = getLuminance(foreground);
  const backgroundLum = getLuminance(background);
  
  const lighter = Math.max(foregroundLum, backgroundLum);
  const darker = Math.min(foregroundLum, backgroundLum);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if a color combination meets WCAG AA standards
export function meetsWCAGAA(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

// Check if a color combination meets WCAG AAA standards
export function meetsWCAGAAA(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

// Suggest accessible alternatives when contrast is insufficient
export function suggestAccessibleColor(
  baseColor: string, 
  contrastColor: string, 
  targetRatio: number = 4.5
): string {
  // Start with the base color
  const rgb = hexToRgb(baseColor);
  let { r, g, b } = rgb;
  
  // Determine if we need to lighten or darken
  const baseLuminance = getLuminance(baseColor);
  const contrastLuminance = getLuminance(contrastColor);
  
  const shouldDarken = baseLuminance > contrastLuminance;
  
  // Adjust the color step by step
  const step = shouldDarken ? -5 : 5;
  let adjustedColor = baseColor;
  let currentRatio = getContrastRatio(adjustedColor, contrastColor);
  
  while (currentRatio < targetRatio) {
    // Adjust RGB values
    r = Math.max(0, Math.min(255, r + step));
    g = Math.max(0, Math.min(255, g + step));
    b = Math.max(0, Math.min(255, b + step));
    
    // Convert back to hex
    adjustedColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    // Check the new ratio
    currentRatio = getContrastRatio(adjustedColor, contrastColor);
    
    // Break if we've reached the limit of adjustments
    if ((shouldDarken && (r === 0 || g === 0 || b === 0)) || 
        (!shouldDarken && (r === 255 || g === 255 || b === 255))) {
      break;
    }
  }
  
  return adjustedColor;
}
