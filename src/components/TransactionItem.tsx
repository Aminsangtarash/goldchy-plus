/**
 * TransactionItem Component
 * Single transaction row in history
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {toPersianNumber} from '../utils';

interface TransactionItemProps {
  amount: number;
  date: string;
  time: string;
  type: 'deposit' | 'withdraw';
}

export function TransactionItem({
  amount,
  date,
  time,
  type,
}: TransactionItemProps) {
  const isDeposit = type === 'deposit';
  const sign = isDeposit ? '+' : '-';
  const textColor = isDeposit ? colors.status.success : colors.status.error;

  return (
    <View style={styles.container}>
      <Text
        variant="body"
        style={[styles.amount, {color: textColor}]}>
        {sign} {toPersianNumber(amount.toLocaleString())}
      </Text>
      <View style={styles.dateContainer}>
        <Text variant="bodySmall" color="secondary">{time}</Text>
        <Text variant="bodySmall" color="secondary" style={styles.date}>
          {date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  amount: {
    fontWeight: '600',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    marginLeft: spacing.md,
  },
});
