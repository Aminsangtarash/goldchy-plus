/**
 * Color Design Tokens
 * Based on Goldchy Plus Figma Design
 */

export const colors = {
  // Primary - Teal/Turquoise
  primary: {
    50: '#E6FAF6',
    100: '#B3F0E6',
    200: '#80E6D6',
    300: '#4DDCC6',
    400: '#3ECFB2', // Main accent color
    500: '#2DB89D',
    600: '#25A08A',
    700: '#1D8877',
    800: '#157064',
    900: '#0D5851',
  },

  // Background colors
  background: {
    primary: '#0B1A1C',    // Main dark background
    secondary: '#162A2D',   // Card background
    tertiary: '#1E3538',    // Elevated surfaces
    input: '#1A3033',       // Input fields
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
    primary: 'rgba(62, 207, 178, 0.3)',
  },

  // Status colors
  status: {
    success: '#3ECFB2',
    error: '#FF6B6B',
    warning: '#FFB800',
    info: '#2196F3',
  },

  // Transparent variants
  transparent: {
    primary15: 'rgba(62, 207, 178, 0.15)',
    primary20: 'rgba(62, 207, 178, 0.2)',
    primary30: 'rgba(62, 207, 178, 0.3)',
    primary50: 'rgba(62, 207, 178, 0.5)',
    error15: 'rgba(255, 107, 107, 0.15)',
    error20: 'rgba(255, 107, 107, 0.2)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black70: 'rgba(0, 0, 0, 0.7)',
    white10: 'rgba(255, 255, 255, 0.1)',
  },

  // Common
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = typeof colors;
