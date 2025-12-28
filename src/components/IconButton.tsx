import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'default' | 'primary' | 'outlined';

interface IconButtonProps extends TouchableOpacityProps {
  icon: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label?: string;
  badge?: number;
  className?: string;
}

const sizeConfig: Record<IconButtonSize, {container: string; icon: number}> = {
  sm: {container: 'w-8 h-8', icon: 18},
  md: {container: 'w-10 h-10', icon: 22},
  lg: {container: 'w-14 h-14', icon: 28},
};

const variantConfig: Record<IconButtonVariant, {bg: string; iconColor: string}> =
  {
    default: {bg: 'bg-background-elevated', iconColor: '#FFFFFF'},
    primary: {bg: 'bg-primary-500', iconColor: '#0D0D1A'},
    outlined: {bg: 'bg-transparent border border-white/10', iconColor: '#FFFFFF'},
  };

export function IconButton({
  icon,
  size = 'md',
  variant = 'default',
  label,
  badge,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeStyle = sizeConfig[size];
  const variantStyle = variantConfig[variant];

  return (
    <View className="items-center">
      <TouchableOpacity
        className={`
          ${sizeStyle.container}
          ${variantStyle.bg}
          rounded-full items-center justify-center
          ${className}
        `}
        activeOpacity={0.7}
        {...props}>
        <Icon name={icon} size={sizeStyle.icon} color={variantStyle.iconColor} />
        {badge !== undefined && badge > 0 && (
          <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-error items-center justify-center">
            <Text className="text-white text-xs font-bold">
              {badge > 99 ? '99+' : badge}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {label && (
        <Text className="text-text-secondary text-xs mt-2">{label}</Text>
      )}
    </View>
  );
}
