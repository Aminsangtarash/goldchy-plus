/**
 * BottomTabBar Component
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';

type TabKey = 'prices' | 'calculator' | 'inquiry';

interface BottomTabBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
}

const tabs: {key: TabKey; label: string; icon: string; activeIcon: string}[] = [
  {key: 'prices', label: 'قیمت ها', icon: 'pricetag-outline', activeIcon: 'pricetag'},
  {key: 'calculator', label: 'محاسبه', icon: 'calculator-outline', activeIcon: 'calculator'},
  {key: 'inquiry', label: 'استعلام', icon: 'document-text-outline', activeIcon: 'document-text'},
];

export function BottomTabBar({activeTab, onTabPress}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + spacing.sm}]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress?.(tab.key)}
            activeOpacity={0.7}>
            <Icon
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? colors.primary[400] : colors.text.secondary}
            />
            <Text
              variant="labelSmall"
              style={[
                styles.tabLabel,
                {color: isActive ? colors.primary[400] : colors.text.secondary},
              ]}>
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
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius['3xl'],
    borderTopRightRadius: borderRadius['3xl'],
    marginHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
  },

  tabLabel: {
    marginTop: spacing.xs,
  },
});
