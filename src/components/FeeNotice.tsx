/**
 * FeeNotice Component
 * Displays inquiry fee information
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

interface FeeNoticeProps {
  serviceName: string;
  fee: number;
}

export function FeeNotice({serviceName, fee}: FeeNoticeProps) {
  return (
    <View style={styles.container}>
      <Text variant="bodySmall" color="secondary" align="center">
        هزینه انجام هر استعلام از {serviceName}
      </Text>
      <Text variant="bodySmall" color="secondary" align="center">
        {toPersianNumber(fee.toLocaleString())} تومان می باشد!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['2xl'],
  },
});
