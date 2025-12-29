/**
 * PageTitle Component
 * Title with decorative lines
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

interface PageTitleProps {
  title: string;
}

export function PageTitle({title}: PageTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text variant="h4" color="white" style={styles.title}>
        {title}
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing['3xl'],
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.screenPadding,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.transparent.primary30,
  },

  title: {
    marginHorizontal: spacing.lg,
  },
});
