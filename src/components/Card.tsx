import React from 'react';
import {View, ViewProps} from 'react-native';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'gold';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-background-card',
  elevated: 'bg-background-elevated',
  outlined: 'bg-background-card border border-white/10',
  gold: 'bg-background-card border border-primary-500/30',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <View
      className={`
        rounded-xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}>
      {children}
    </View>
  );
}
