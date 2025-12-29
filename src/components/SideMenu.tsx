/**
 * SideMenu Component
 * Slide-out drawer menu
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  balance: number;
  isLoggedIn: boolean;
  onLogin: () => void;
  onWallet: () => void;
  onMyInquiries: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

export function SideMenu({
  visible,
  onClose,
  isDarkMode,
  onToggleTheme,
  balance,
  isLoggedIn,
  onLogin,
  onWallet,
  onMyInquiries,
  onSettings,
  onAbout,
}: SideMenuProps) {
  const insets = useSafeAreaInsets();

  const menuBg = isDarkMode ? colors.background.primary : '#F5F5F5';
  const cardBg = isDarkMode ? colors.background.secondary : '#FFFFFF';
  const textColor = isDarkMode ? colors.text.primary : '#1A1A1A';
  const secondaryText = isDarkMode ? colors.text.secondary : '#666666';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={[styles.overlay, {backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'}]}>
        <View style={[styles.menu, {backgroundColor: menuBg, paddingTop: insets.top + spacing.md}]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={28} color={textColor} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Text variant="h3" style={{color: colors.primary[400]}}>+</Text>
              <Text variant="h3" style={{color: colors.primary[400]}}>گلدچی</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Top Row: Login & Theme Toggle */}
            <View style={styles.topRow}>
              <TouchableOpacity
                style={[styles.topButton, {backgroundColor: cardBg}]}
                onPress={onToggleTheme}
                activeOpacity={0.7}>
                <Text variant="body" style={{color: textColor}}>
                  {isDarkMode ? 'حالت تاریک' : 'حالت روشن'}
                </Text>
                <Icon
                  name={isDarkMode ? 'moon' : 'sunny'}
                  size={20}
                  color={isDarkMode ? '#FFD700' : '#FFA500'}
                  style={styles.topButtonIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.topButton, {backgroundColor: cardBg}]}
                onPress={onLogin}
                activeOpacity={0.7}>
                <Text variant="body" style={{color: textColor}}>ورود</Text>
                <Icon name="person-outline" size={20} color={secondaryText} style={styles.topButtonIcon} />
              </TouchableOpacity>
            </View>

            {/* Wallet Row */}
            <TouchableOpacity
              style={[styles.menuItem, {backgroundColor: cardBg}]}
              onPress={onWallet}
              activeOpacity={0.7}>
              <Text variant="body" style={{color: textColor}}>
                {toPersianNumber(balance.toLocaleString())} تومان
              </Text>
              <View style={styles.menuItemRight}>
                <Text variant="body" style={{color: textColor}}>کیف پول</Text>
                <Icon name="wallet-outline" size={20} color={secondaryText} style={styles.menuItemIcon} />
              </View>
            </TouchableOpacity>

            {/* My Inquiries */}
            <TouchableOpacity
              style={[styles.menuItem, {backgroundColor: cardBg}]}
              onPress={onMyInquiries}
              activeOpacity={0.7}>
              <View />
              <Text variant="body" style={{color: textColor}} align="center">
                استعلام های من
              </Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              style={[styles.menuItem, {backgroundColor: cardBg}]}
              onPress={onSettings}
              activeOpacity={0.7}>
              <View />
              <Text variant="body" style={{color: textColor}} align="center">
                تنظیمات
              </Text>
            </TouchableOpacity>

            {/* About */}
            <TouchableOpacity
              style={[styles.menuItem, {backgroundColor: cardBg}]}
              onPress={onAbout}
              activeOpacity={0.7}>
              <View />
              <Text variant="body" style={{color: textColor}} align="center">
                درباره ما
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Touch outside to close */}
        <TouchableOpacity style={styles.closeArea} onPress={onClose} activeOpacity={1} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },

  menu: {
    width: '85%',
    height: '100%',
  },

  closeArea: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xl,
  },

  closeButton: {
    padding: spacing.sm,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    paddingHorizontal: spacing.screenPadding,
  },

  topRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },

  topButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xs,
  },

  topButtonIcon: {
    marginLeft: spacing.sm,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },

  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuItemIcon: {
    marginLeft: spacing.sm,
  },
});
