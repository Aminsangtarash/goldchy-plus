import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  transparent = false,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`
        flex-row items-center justify-between
        px-4 pb-4
        ${transparent ? '' : 'bg-background-dark'}
      `}
      style={{paddingTop: insets.top + 12}}>
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            className="w-10 h-10 rounded-full bg-background-elevated items-center justify-center mr-3"
            activeOpacity={0.7}>
            <Icon name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {title && (
          <Text className="text-text-primary text-xl font-semibold">
            {title}
          </Text>
        )}
      </View>
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightPress}
          className="w-10 h-10 rounded-full bg-background-elevated items-center justify-center"
          activeOpacity={0.7}>
          <Icon name={rightIcon} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}
