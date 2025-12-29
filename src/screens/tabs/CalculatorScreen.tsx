/**
 * CalculatorScreen - Placeholder
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, AppHeader, BottomTabBar} from '../../components';
import {colors} from '../../theme/colors';

export function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Text variant="h3" color="white" align="center">محاسبه گر قیمت طلا</Text>
        <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
          به زودی...
        </Text>
      </View>
      <BottomTabBar activeTab="calculator" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
});
