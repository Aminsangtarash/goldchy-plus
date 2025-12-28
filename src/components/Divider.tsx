import React from 'react';
import { View, Text } from 'react-native';

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <View className={`flex-row items-center my-4 ${className}`}>
        <View className="flex-1 h-px bg-border-light" />
        <Text className="text-text-muted text-sm mx-4">{text}</Text>
        <View className="flex-1 h-px bg-border-light" />
      </View>
    );
  }

  return <View className={`h-px bg-border-light my-4 ${className}`} />;
}
