/**
 * Text Component
 * Typography-aware text component
 */

import React from 'react';
import {Text as RNText, TextProps as RNTextProps, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';

type TextVariant = keyof typeof textStyles;
type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'white';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

const colorMap: Record<TextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  error: colors.status.error,
  success: colors.status.success,
  white: colors.white,
};

export function Text({
  variant = 'body',
  color = 'primary',
  align = 'auto',
  style,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        textStyles[variant],
        {color: colorMap[color]},
        {textAlign: align},
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
  },
});
