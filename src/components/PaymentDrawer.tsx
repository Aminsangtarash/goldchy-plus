/**
 * PaymentDrawer Component
 * Bottom sheet for payment confirmation
 */

import React, {useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {Button} from './Button';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

interface PaymentDrawerProps {
  visible: boolean;
  onClose: () => void;
  onPayment: () => void;
  balance: number;
  fee: number;
  feeDescription: string;
  loading?: boolean;
  onAddFunds?: () => void;
}

export function PaymentDrawer({
  visible,
  onClose,
  onPayment,
  balance,
  fee,
  feeDescription,
  loading = false,
  onAddFunds,
}: PaymentDrawerProps) {
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const insufficientBalance = balance < fee;

  useEffect(() => {
    if (visible) {
      Animated.spring(drawerAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, drawerAnimation]);

  const translateY = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.spacer} />
        <Animated.View style={[styles.drawer, {transform: [{translateY}]}]}>
          <TouchableOpacity activeOpacity={1}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Fee Notice */}
            <View style={styles.feeNotice}>
              <Text variant="bodySmall" color="secondary" align="center">
                {feeDescription}
              </Text>
              <Text variant="bodySmall" color="secondary" align="center">
                {toPersianNumber(fee.toLocaleString())} تومان می باشد!
              </Text>
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <TouchableOpacity style={styles.addButton} onPress={onAddFunds}>
                <Icon name="add" size={24} color={colors.primary[400]} />
              </TouchableOpacity>
              <View style={styles.balanceInfo}>
                <Text variant="bodyLarge" color="white" style={styles.balanceAmount}>
                  {toPersianNumber(balance.toLocaleString())} تومان
                </Text>
                <View style={styles.balanceLabel}>
                  <Text variant="bodySmall" color="secondary">موجودی</Text>
                  <Icon
                    name="wallet-outline"
                    size={18}
                    color={colors.text.secondary}
                    style={styles.walletIcon}
                  />
                </View>
              </View>
            </View>

            {/* Insufficient Balance Warning */}
            {insufficientBalance && (
              <View style={styles.warning}>
                <Text variant="bodySmall" color="error">
                  موجودی شما کافی نمی باشد!
                </Text>
                <Icon
                  name="information-circle"
                  size={18}
                  color={colors.status.error}
                  style={styles.warningIcon}
                />
              </View>
            )}

            {/* Pay Button */}
            <Button
              title={loading ? 'در حال پردازش...' : 'پرداخت و استعلام'}
              loading={loading}
              disabled={insufficientBalance}
              onPress={onPayment}
            />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.transparent.black50,
  },

  spacer: {
    flex: 1,
  },

  drawer: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius['3xl'],
    borderTopRightRadius: borderRadius['3xl'],
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },

  handle: {
    width: 48,
    height: 4,
    backgroundColor: colors.text.muted,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing['2xl'],
  },

  feeNotice: {
    marginBottom: spacing['2xl'],
  },

  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },

  addButton: {
    backgroundColor: colors.background.tertiary,
    padding: spacing.lg,
    borderTopRightRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },

  balanceInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  balanceAmount: {
    fontWeight: '600',
  },

  balanceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletIcon: {
    marginLeft: spacing.sm,
  },

  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent.error15,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },

  warningIcon: {
    marginLeft: spacing.sm,
  },
});
