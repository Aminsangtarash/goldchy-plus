/**
 * DepositModal Component
 * Modal for adding funds to wallet
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
import {Button} from './Button';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {fontSize} from '../theme/typography';
import {toPersianNumber} from '../utils';

interface DepositModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  loading?: boolean;
}

const PRESET_AMOUNTS = [10000, 100000, 500000, 1000000];

export function DepositModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetSelect = (preset: number) => {
    setSelectedPreset(preset);
    setAmount(preset.toString());
  };

  const handleSubmit = () => {
    const numAmount = parseInt(amount, 10);
    if (numAmount > 0) {
      onSubmit(numAmount);
    }
  };

  const handleClose = () => {
    setAmount('');
    setSelectedPreset(null);
    onClose();
  };

  const isValid = parseInt(amount, 10) > 0;

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
            افزایش موجودی
          </Text>

          {/* Description */}
          <Text variant="body" color="secondary" align="center" style={styles.description}>
            مبلغی که می خواهید واریز کنید را وارد کنید
          </Text>

          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text variant="body" color="secondary">تومان</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={(text) => {
                setAmount(text.replace(/\D/g, ''));
                setSelectedPreset(null);
              }}
              placeholder="وارد کنید..."
              placeholderTextColor={colors.text.placeholder}
              keyboardType="number-pad"
              textAlign="right"
            />
          </View>

          {/* Preset Amounts */}
          <View style={styles.presetsContainer}>
            <View style={styles.presetsRow}>
              {PRESET_AMOUNTS.slice(0, 2).map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetButton,
                    selectedPreset === preset && styles.presetButtonSelected,
                  ]}
                  onPress={() => handlePresetSelect(preset)}
                  activeOpacity={0.7}>
                  <Text
                    variant="body"
                    style={{
                      color: selectedPreset === preset
                        ? colors.primary[400]
                        : colors.text.primary,
                    }}>
                    {toPersianNumber(preset.toLocaleString())} تومان
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.presetsRow}>
              {PRESET_AMOUNTS.slice(2, 4).map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetButton,
                    selectedPreset === preset && styles.presetButtonSelected,
                  ]}
                  onPress={() => handlePresetSelect(preset)}
                  activeOpacity={0.7}>
                  <Text
                    variant="body"
                    style={{
                      color: selectedPreset === preset
                        ? colors.primary[400]
                        : colors.text.primary,
                    }}>
                    {toPersianNumber(preset.toLocaleString())} تومان
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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

  presetsContainer: {
    marginBottom: spacing['2xl'],
  },

  presetsRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },

  presetButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
  },

  presetButtonSelected: {
    borderColor: colors.primary[400],
    backgroundColor: colors.transparent.primary15,
  },

  actions: {
    flexDirection: 'row',
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
