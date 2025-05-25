
/**
 * Enhanced color contrast checking utility for WCAG 2.1 AA compliance
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

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Calculate relative luminance for a color
export function getLuminance(color: string): number {
  let rgb;
  
  if (color.startsWith('#')) {
    rgb = hexToRgb(color);
  } else if (color.startsWith('hsl')) {
    // Parse HSL string like "hsl(210, 40%, 98%)"
    const matches = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (matches) {
      const [, h, s, l] = matches.map(Number);
      rgb = hslToRgb(h, s, l);
    } else {
      return 0;
    }
  } else if (color.startsWith('rgb')) {
    // Parse RGB string like "rgb(255, 255, 255)"
    const matches = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (matches) {
      const [, r, g, b] = matches.map(Number);
      rgb = { r, g, b };
    } else {
      return 0;
    }
  } else {
    return 0;
  }
  
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

// Get contrast grade (AA, AAA, or Fail)
export function getContrastGrade(foreground: string, background: string, isLargeText: boolean = false): 'AAA' | 'AA' | 'Fail' {
  if (meetsWCAGAAA(foreground, background, isLargeText)) return 'AAA';
  if (meetsWCAGAA(foreground, background, isLargeText)) return 'AA';
  return 'Fail';
}

// Audit current page colors
export function auditPageContrast(): Array<{
  element: HTMLElement;
  foreground: string;
  background: string;
  ratio: number;
  grade: string;
  isLargeText: boolean;
  passes: boolean;
}> {
  const results: Array<{
    element: HTMLElement;
    foreground: string;
    background: string;
    ratio: number;
    grade: string;
    isLargeText: boolean;
    passes: boolean;
  }> = [];

  // Get all text elements
  const textElements = document.querySelectorAll('*');
  
  textElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Skip elements without text content
    if (!htmlElement.textContent?.trim()) return;
    
    const foreground = computedStyle.color;
    const background = computedStyle.backgroundColor;
    
    // Skip transparent backgrounds
    if (background === 'rgba(0, 0, 0, 0)' || background === 'transparent') return;
    
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontWeight = computedStyle.fontWeight;
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
    
    const ratio = getContrastRatio(foreground, background);
    const grade = getContrastGrade(foreground, background, isLargeText);
    const passes = meetsWCAGAA(foreground, background, isLargeText);
    
    results.push({
      element: htmlElement,
      foreground,
      background,
      ratio,
      grade,
      isLargeText,
      passes
    });
  });
  
  return results.filter(result => !result.passes);
}

// Console log contrast issues
export function logContrastIssues(): void {
  const issues = auditPageContrast();
  
  if (issues.length === 0) {
    console.log('✅ No contrast issues found!');
    return;
  }
  
  console.group('🔍 Contrast Issues Found:');
  issues.forEach((issue, index) => {
    console.group(`${index + 1}. Contrast Ratio: ${issue.ratio.toFixed(2)}:1 (${issue.grade})`);
    console.log('Element:', issue.element);
    console.log('Foreground:', issue.foreground);
    console.log('Background:', issue.background);
    console.log('Large Text:', issue.isLargeText);
    console.log('Passes WCAG AA:', issue.passes);
    console.groupEnd();
  });
  console.groupEnd();
}

// Run automatic audit in development
if (process.env.NODE_ENV === 'development') {
  // Run audit after page load
  window.addEventListener('load', () => {
    setTimeout(logContrastIssues, 1000);
  });
}
