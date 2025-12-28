import React from 'react';
import { View, Image, Text, ImageSourcePropType } from 'react-native';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: AvatarSize;
  showBadge?: boolean;
  badgeColor?: string;
  className?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs', badge: 'w-2 h-2' },
  md: { container: 'w-10 h-10', text: 'text-sm', badge: 'w-2.5 h-2.5' },
  lg: { container: 'w-12 h-12', text: 'text-base', badge: 'w-3 h-3' },
  xl: { container: 'w-16 h-16', text: 'text-lg', badge: 'w-4 h-4' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  source,
  name,
  size = 'md',
  showBadge = false,
  badgeColor = '#4CAF50',
  className = '',
}: AvatarProps) {
  const sizeStyle = sizeClasses[size];

  const renderContent = () => {
    if (source) {
      const imageSource = typeof source === 'string' ? { uri: source } : source;
      return (
        <Image
          source={imageSource}
          className={`${sizeStyle.container} rounded-full`}
          resizeMode="cover"
        />
      );
    }

    if (name) {
      return (
        <View
          className={`
            ${sizeStyle.container}
            rounded-full
            bg-primary-500
            items-center justify-center
          `}
        >
          <Text className={`${sizeStyle.text} font-bold text-secondary-900`}>
            {getInitials(name)}
          </Text>
        </View>
      );
    }

    return (
      <View
        className={`
          ${sizeStyle.container}
          rounded-full
          bg-secondary-600
          items-center justify-center
        `}
      >
        <Text className={`${sizeStyle.text} text-text-muted`}>?</Text>
      </View>
    );
  };

  return (
    <View className={`relative ${className}`}>
      {renderContent()}
      {showBadge && (
        <View
          className={`
            absolute bottom-0 right-0
            ${sizeStyle.badge}
            rounded-full
            border-2 border-background-dark
          `}
          style={{ backgroundColor: badgeColor }}
        />
      )}
    </View>
  );
}
