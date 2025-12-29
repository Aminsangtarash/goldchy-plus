/**
 * WithdrawModal Component
 * Modal for withdrawing funds from wallet
 */

import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {fontSize} from '../theme/typography';

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (amount: number, cardNumber: string) => void;
  loading?: boolean;
  maxAmount?: number;
}

export function WithdrawModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
  maxAmount = 0,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = () => {
    const numAmount = parseInt(amount, 10);
    if (numAmount > 0 && cardNumber.length >= 16) {
      onSubmit(numAmount, cardNumber);
    }
  };

  const handleClose = () => {
    setAmount('');
    setCardNumber('');
    onClose();
  };

  const isValid = parseInt(amount, 10) > 0 && 
                  parseInt(amount, 10) <= maxAmount && 
                  cardNumber.replace(/\s/g, '').length >= 16;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Title */}
          <Text variant="h4" color="white" align="center" style={styles.title}>
            برداشت موجودی
          </Text>

          {/* Description */}
          <Text variant="body" color="secondary" align="center" style={styles.description}>
            مبلغی که می خواهید برداشت کنید
          </Text>
          <Text variant="body" color="secondary" align="center" style={styles.description2}>
            و شماره کارت خود را وارد کنید
          </Text>

          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text variant="body" color="secondary">تومان</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={(text) => setAmount(text.replace(/\D/g, ''))}
              placeholder="وارد کنید..."
              placeholderTextColor={colors.text.placeholder}
              keyboardType="number-pad"
              textAlign="right"
            />
          </View>

          {/* Card Number Input */}
          <Text variant="body" color="secondary" style={styles.cardLabel}>
            شماره کارت شما
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.cardInput]}
              value={cardNumber}
              onChangeText={(text) => {
                // Format as card number with spaces
                const cleaned = text.replace(/\D/g, '');
                const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
                setCardNumber(formatted);
              }}
              placeholder="وارد کنید..."
              placeholderTextColor={colors.text.placeholder}
              keyboardType="number-pad"
              textAlign="right"
              maxLength={19} // 16 digits + 3 spaces
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleClose}
              activeOpacity={0.8}>
              <Text variant="button" style={{color: colors.primary[400]}}>
                بازگشت
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isValid || loading}
              activeOpacity={0.8}>
              <Text variant="button" style={{color: colors.background.primary}}>
                {loading ? 'در حال پردازش...' : 'ثبت درخواست'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.transparent.black70,
    justifyContent: 'center',
    paddingHorizontal: spacing.screenPadding,
  },

  modal: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
  },

  title: {
    marginBottom: spacing.md,
  },

  description: {
    marginBottom: spacing.xs,
  },

  description2: {
    marginBottom: spacing['2xl'],
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.input,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },

  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.primary,
    textAlign: 'right',
    padding: 0,
  },

  cardLabel: {
    textAlign: 'right',
    marginBottom: spacing.sm,
  },

  cardInput: {
    textAlign: 'right',
  },

  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },

  backButton: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    marginRight: spacing.sm,
  },

  submitButton: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[400],
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
  },

  submitButtonDisabled: {
    opacity: 0.5,
  },
});
