import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';

interface PriceCardProps {
  title: string;
  price: string;
  currency?: string;
  change?: number;
  changePercent?: number;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export function PriceCard({
  title,
  price,
  currency = 'IRR',
  change,
  changePercent,
  icon = 'trending-up',
  className = '',
}: PriceCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card variant="gold" className={className}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-text-secondary text-sm mb-1">{title}</Text>
          <Text className="text-text-primary text-2xl font-bold">{price}</Text>
          <Text className="text-text-muted text-xs">{currency}</Text>
        </View>
        <View className="items-end">
          <View
            className={`
              w-10 h-10 rounded-full items-center justify-center mb-2
              ${isPositive ? 'bg-accent-success/20' : 'bg-accent-error/20'}
            `}
          >
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={20}
              color={isPositive ? '#4CAF50' : '#F44336'}
            />
          </View>
          {change !== undefined && (
            <View className="flex-row items-center">
              <Text
                className={`text-sm font-medium ${
                  isPositive ? 'text-accent-success' : 'text-accent-error'
                }`}
              >
                {isPositive ? '+' : ''}{change}
              </Text>
              {changePercent !== undefined && (
                <Text
                  className={`text-xs ml-1 ${
                    isPositive ? 'text-accent-success' : 'text-accent-error'
                  }`}
                >
                  ({changePercent}%)
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
