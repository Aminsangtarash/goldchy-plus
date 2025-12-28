export const Colors = {
  // Primary - Teal/Turquoise (from design)
  primary: {
    50: '#E6FAF6',
    100: '#B3F0E6',
    200: '#80E6D6',
    300: '#4DDCC6',
    400: '#3ECFB2', // Main button color
    500: '#2DB89D',
    600: '#25A08A',
    700: '#1D8877',
    800: '#157064',
    900: '#0D5851',
  },
  // Secondary - Dark Navy/Teal (background)
  secondary: {
    50: '#E8ECED',
    100: '#C4CED1',
    200: '#9DAEB5',
    300: '#768E99',
    400: '#58767D',
    500: '#3A5E61',
    600: '#2D4A4D',
    700: '#1F3639',
    800: '#162A2D', // Card background
    900: '#0B1A1C', // Main background
  },
  // Background colors
  background: {
    dark: '#0B1A1C',
    card: '#162A2D',
    elevated: '#1E3538',
    input: '#1A3033',
  },
  // Accent colors
  accent: {
    success: '#3ECFB2',
    warning: '#FFB800',
    error: '#FF6B6B',
    info: '#2196F3',
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0B4B7',
    muted: '#6B8589',
    placeholder: '#5A7A7D',
  },
  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    input: '#2A4A4D',
  },
  // Error background
  errorBg: 'rgba(255, 107, 107, 0.15)',
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
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;
