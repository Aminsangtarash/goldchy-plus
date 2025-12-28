import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  leftIconColor?: string;
  rightText?: string;
  showChevron?: boolean;
  onPress?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  leftIconColor = '#FFB800',
  rightText,
  showChevron = true,
  onPress,
  className = '',
}: ListItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        flex-row items-center py-4
        border-b border-white/10
        ${className}
      `}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}>
      {leftIcon && (
        <View className="w-10 h-10 rounded-full bg-background-elevated items-center justify-center mr-3">
          <Icon name={leftIcon} size={20} color={leftIconColor} />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-text-primary text-base">{title}</Text>
        {subtitle && (
          <Text className="text-text-muted text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>
      {rightText && (
        <Text className="text-text-secondary text-sm mr-2">{rightText}</Text>
      )}
      {showChevron && <Icon name="chevron-forward" size={20} color="#6B6B80" />}
    </TouchableOpacity>
  );
}
