/**
 * TabSelector Component
 * Horizontal tab buttons
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';

interface Tab {
  key: string;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function TabSelector({tabs, activeTab, onTabChange}: TabSelectorProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            style={[
              styles.tab,
              isActive ? styles.tabActive : styles.tabInactive,
              index > 0 && {marginLeft: spacing.sm},
            ]}
            activeOpacity={0.8}>
            <Text
              variant="buttonSmall"
              style={{
                color: isActive
                  ? colors.background.primary
                  : colors.primary[400],
              }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing['2xl'],
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabActive: {
    backgroundColor: colors.primary[400],
  },

  tabInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.transparent.primary50,
  },
});
