import React from 'react';
import { View, Text, ViewProps } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends ViewProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-500/20', text: 'text-primary-500' },
  success: { bg: 'bg-accent-success/20', text: 'text-accent-success' },
  warning: { bg: 'bg-accent-warning/20', text: 'text-accent-warning' },
  error: { bg: 'bg-accent-error/20', text: 'text-accent-error' },
  info: { bg: 'bg-accent-info/20', text: 'text-accent-info' },
};

const sizeClasses: Record<BadgeSize, { container: string; text: string }> = {
  sm: { container: 'px-2 py-0.5', text: 'text-xs' },
  md: { container: 'px-3 py-1', text: 'text-sm' },
};

export function Badge({
  text,
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}: BadgeProps) {
  const styles = variantClasses[variant];
  const sizeStyles = sizeClasses[size];

  return (
    <View
      className={`
        rounded-full
        ${styles.bg}
        ${sizeStyles.container}
        ${className}
      `}
      {...props}
    >
      <Text className={`${styles.text} ${sizeStyles.text} font-medium`}>
        {text}
      </Text>
    </View>
  );
}
