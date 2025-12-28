export const Colors = {
  // Primary - Gold
  primary: {
    50: '#FFF9E6',
    100: '#FFF0BF',
    200: '#FFE699',
    300: '#FFD966',
    400: '#FFCC33',
    500: '#FFB800',
    600: '#CC9300',
    700: '#996E00',
    800: '#664A00',
    900: '#332500',
  },
  // Secondary - Dark
  secondary: {
    50: '#E8E8ED',
    100: '#C4C4D1',
    200: '#9D9DB5',
    300: '#767699',
    400: '#58587D',
    500: '#3A3A61',
    600: '#2D2D4A',
    700: '#1F1F33',
    800: '#16162B',
    900: '#0D0D1A',
  },
  // Background
  background: {
    dark: '#0D0D1A',
    card: '#1A1A2E',
    elevated: '#252542',
  },
  // Accent
  accent: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0C0',
    muted: '#6B6B80',
    gold: '#FFB800',
  },
  // Borders
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    gold: 'rgba(255, 184, 0, 0.3)',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const FontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type ThemeColors = typeof Colors;
