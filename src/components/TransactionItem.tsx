import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TransactionType = 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer';

interface TransactionItemProps {
  type: TransactionType;
  title: string;
  subtitle?: string;
  amount: string;
  date: string;
  status?: 'pending' | 'completed' | 'failed';
  onPress?: () => void;
}

const typeConfig: Record<
  TransactionType,
  {icon: string; color: string; bgColor: string}
> = {
  buy: {
    icon: 'arrow-down-circle',
    color: '#4CAF50',
    bgColor: 'bg-accent-success/20',
  },
  sell: {
    icon: 'arrow-up-circle',
    color: '#F44336',
    bgColor: 'bg-accent-error/20',
  },
  deposit: {
    icon: 'add-circle',
    color: '#4CAF50',
    bgColor: 'bg-accent-success/20',
  },
  withdraw: {
    icon: 'remove-circle',
    color: '#FF9800',
    bgColor: 'bg-accent-warning/20',
  },
  transfer: {
    icon: 'swap-horizontal',
    color: '#2196F3',
    bgColor: 'bg-accent-info/20',
  },
};

const statusColors = {
  pending: 'text-accent-warning',
  completed: 'text-accent-success',
  failed: 'text-accent-error',
};

export function TransactionItem({
  type,
  title,
  subtitle,
  amount,
  date,
  status,
  onPress,
}: TransactionItemProps) {
  const config = typeConfig[type];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-white/10"
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}>
      <View
        className={`w-12 h-12 rounded-full items-center justify-center ${config.bgColor}`}>
        <Icon name={config.icon} size={24} color={config.color} />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-text-primary text-base font-medium">{title}</Text>
        {subtitle && <Text className="text-text-muted text-sm">{subtitle}</Text>}
      </View>
      <View className="items-end">
        <Text
          className={`text-base font-semibold ${
            type === 'buy' || type === 'deposit'
              ? 'text-accent-success'
              : type === 'sell' || type === 'withdraw'
              ? 'text-accent-error'
              : 'text-text-primary'
          }`}>
          {type === 'buy' || type === 'deposit' ? '+' : '-'}
          {amount}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-text-muted text-xs">{date}</Text>
          {status && (
            <Text className={`text-xs ml-2 ${statusColors[status]}`}>
              • {status}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
