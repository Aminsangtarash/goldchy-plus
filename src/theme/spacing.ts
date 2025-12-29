/**
 * Spacing Design Tokens
 * Consistent spacing throughout the app
 */

export const spacing = {
  // Base spacing scale
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,

  // Component-specific spacing
  screenPadding: 20,
  cardPadding: 24,
  inputPadding: 16,
  buttonPadding: 16,
  
  // Section spacing
  sectionGap: 24,
  itemGap: 12,
} as const;

export type SpacingToken = typeof spacing;
