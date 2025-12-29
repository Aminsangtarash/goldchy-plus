/**
 * AppHeader Component
 * Main app header with logo
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

interface AppHeaderProps {
  onMenuPress?: () => void;
}

export function AppHeader({onMenuPress}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top + spacing.md}]}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Icon name="menu" size={28} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Text variant="h3" style={styles.logoPlus}>+</Text>
        <Text variant="h3" color="white">گلدچی</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
  },

  menuButton: {
    padding: spacing.sm,
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoPlus: {
    color: colors.primary[400],
    marginLeft: spacing.xs,
  },
});
