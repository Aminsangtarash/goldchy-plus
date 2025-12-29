/**
 * Theme - Design Tokens Export
 */

export * from './colors';
export * from './lightColors';
export * from './spacing';
export * from './typography';
export * from './borderRadius';
export * from './shadows';
export {ThemeProvider, useTheme} from './ThemeContext';

// Unified theme object
import {colors} from './colors';
import {spacing} from './spacing';
import {fontSize, fontWeight, textStyles} from './typography';
import {borderRadius} from './borderRadius';
import {shadows} from './shadows';

export const theme = {
  colors,
  spacing,
  fontSize,
  fontWeight,
  textStyles,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
