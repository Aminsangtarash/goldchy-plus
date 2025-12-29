/**
 * SubTabSelector Component
 * Two-row sub-tab layout
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';

interface SubTab {
  key: string;
  label: string;
}

interface SubTabSelectorProps {
  tabs: SubTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function SubTabSelector({tabs, activeTab, onTabChange}: SubTabSelectorProps) {
  const topTabs = tabs.slice(0, 2);
  const bottomTab = tabs[2];

  return (
    <View style={styles.container}>
      {/* First row - 2 tabs */}
      <View style={styles.topRow}>
        {topTabs.map((tab, index) => {
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
                variant="bodySmall"
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

      {/* Second row - highlighted full-width tab */}
      {bottomTab && (
        <TouchableOpacity
          onPress={() => onTabChange(bottomTab.key)}
          style={[
            styles.bottomTab,
            activeTab === bottomTab.key
              ? styles.bottomTabActive
              : styles.bottomTabInactive,
          ]}
          activeOpacity={0.8}>
          <Text
            variant="bodySmall"
            style={{
              color: activeTab === bottomTab.key
                ? colors.background.primary
                : colors.primary[400],
            }}>
            {bottomTab.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  topRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
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

  bottomTab: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomTabActive: {
    backgroundColor: colors.primary[400],
  },

  bottomTabInactive: {
    backgroundColor: colors.transparent.primary20,
  },
});
