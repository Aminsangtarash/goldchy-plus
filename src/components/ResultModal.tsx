/**
 * ResultModal Component
 * Shows inquiry results
 */

import React from 'react';
import {View, TouchableOpacity, Modal, Share, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {Button} from './Button';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

// Result types
export type ShahkarResult = {
  type: 'shahkar';
  isMatch: boolean;
  nationalCode: string;
  phoneNumber: string;
};

export type SabteAhvalResult = {
  type: 'sabteahval';
  nameMatch: number;
  lastNameMatch: number;
  fullNameMatch: number;
  fatherNameMatch: number;
};

export type BankResult = {
  type: 'bank';
  subType: 'convert' | 'inquiry' | 'match';
  isMatch?: boolean;
  nationalCode?: string;
  birthDate?: string;
  iban?: string;
  cardNumber?: string;
  convertedIban?: string;
};

export type InquiryResultData = ShahkarResult | SabteAhvalResult | BankResult;

interface ResultModalProps {
  visible: boolean;
  onClose: () => void;
  result: InquiryResultData | null;
}

// Info Row Component
function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text variant="body" color="white">{toPersianNumber(value)}</Text>
      <Text variant="bodySmall" color="secondary">{label}</Text>
    </View>
  );
}

// Info Row with Copy Button
function InfoRowWithCopy({label, value, onCopy}: {label: string; value: string; onCopy: () => void}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
          <Icon name="copy-outline" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
        <Text variant="body" color="white" style={styles.ibanText}>{value}</Text>
      </View>
      <Text variant="bodySmall" color="secondary">{label}</Text>
    </View>
  );
}

// Match Row Component for Sabte Ahval
function MatchRow({label, percentage}: {label: string; percentage: number}) {
  const isGood = percentage >= 70;
  return (
    <View style={styles.infoRow}>
      <View style={[styles.matchBadge, isGood ? styles.matchGood : styles.matchBad]}>
        <Text
          variant="body"
          style={{color: isGood ? colors.primary[400] : colors.status.error, fontWeight: '700'}}>
          {toPersianNumber(percentage)}%
        </Text>
      </View>
      <Text variant="body" color="white">{label}</Text>
    </View>
  );
}

export function ResultModal({visible, onClose, result}: ResultModalProps) {
  if (!result) return null;

  const handleCopyIban = (iban: string) => {
    Clipboard.setString(iban);
    // Could add a toast notification here
  };

  const handleShare = async () => {
    let message = '';
    
    if (result.type === 'shahkar') {
      message = result.isMatch
        ? `نتیجه استعلام شاهکار:\nکدملی: ${toPersianNumber(result.nationalCode)}\nشماره همراه: ${toPersianNumber(result.phoneNumber)}\nوضعیت: تطابق دارند`
        : `نتیجه استعلام شاهکار:\nکدملی: ${toPersianNumber(result.nationalCode)}\nشماره همراه: ${toPersianNumber(result.phoneNumber)}\nوضعیت: تطابق ندارند`;
    } else if (result.type === 'sabteahval') {
      message = `نتیجه استعلام ثبت احوال:\nتطابق نام: ${toPersianNumber(result.nameMatch)}%\nتطابق نام خانوادگی: ${toPersianNumber(result.lastNameMatch)}%`;
    } else if (result.type === 'bank' && result.subType === 'match') {
      message = result.isMatch
        ? `نتیجه استعلام بانکی:\nشماره شبا با کدملی تطابق دارد`
        : `نتیجه استعلام بانکی:\nشماره شبا با کدملی تطابق ندارد`;
    } else if (result.type === 'bank' && result.subType === 'inquiry') {
      message = `نتیجه استعلام بانکی:\nشماره کارت: ${result.cardNumber || ''}\nشماره شبا: ${result.convertedIban || ''}`;
    }

    try {
      await Share.share({message});
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  // Check if this is a convert result (free, no share button)
  const isConvertResult = result.type === 'bank' && result.subType === 'convert';

  const renderContent = () => {
    if (result.type === 'shahkar') {
      return (
        <>
          <View style={[styles.statusBanner, result.isMatch ? styles.statusSuccess : styles.statusError]}>
            <Text
              variant="body"
              style={{color: result.isMatch ? colors.primary[400] : colors.status.error}}>
              {result.isMatch
                ? 'کدملی و شماره همراه تطابق دارند!'
                : 'کدملی و شماره همراه تطابق ندارند!'}
            </Text>
            <Icon
              name="information-circle"
              size={20}
              color={result.isMatch ? colors.primary[400] : colors.status.error}
              style={styles.statusIcon}
            />
          </View>
          <View style={styles.infoContainer}>
            <InfoRow label="کدملی" value={result.nationalCode} />
            <InfoRow label="شماره همراه" value={result.phoneNumber} />
          </View>
        </>
      );
    }

    if (result.type === 'sabteahval') {
      return (
        <>
          <Text variant="body" color="secondary" align="center" style={styles.description}>
            تطابق اطلاعات به شرح ذیل است
          </Text>
          <View style={styles.infoContainer}>
            <MatchRow label="تطابق نام" percentage={result.nameMatch} />
            <MatchRow label="تطابق نام خانوادگی" percentage={result.lastNameMatch} />
            <MatchRow label="تطابق نام کامل" percentage={result.fullNameMatch} />
            <MatchRow label="تطابق نام پدر" percentage={result.fatherNameMatch} />
          </View>
        </>
      );
    }

    if (result.type === 'bank') {
      // Convert Card to IBAN - Free, shows card and IBAN with copy
      if (result.subType === 'convert') {
        return (
          <View style={styles.infoContainer}>
            {result.cardNumber && (
              <InfoRow 
                label="شماره کارت" 
                value={result.cardNumber.replace(/(\d{4})/g, '$1 ').trim()} 
              />
            )}
            {result.convertedIban && (
              <InfoRowWithCopy
                label="شماره شبا"
                value={result.convertedIban}
                onCopy={() => handleCopyIban(result.convertedIban!)}
              />
            )}
          </View>
        );
      }

      // IBAN/Card Inquiry - Paid, shows card and IBAN with copy (same layout as convert)
      if (result.subType === 'inquiry') {
        return (
          <View style={styles.infoContainer}>
            {result.cardNumber && (
              <InfoRow 
                label="شماره کارت" 
                value={result.cardNumber} 
              />
            )}
            {result.convertedIban && (
              <InfoRowWithCopy
                label="شماره شبا"
                value={result.convertedIban}
                onCopy={() => handleCopyIban(result.convertedIban!)}
              />
            )}
          </View>
        );
      }

      // Match with National Code
      if (result.subType === 'match') {
        return (
          <>
            <View style={[styles.statusBanner, result.isMatch ? styles.statusSuccess : styles.statusError]}>
              <Text
                variant="body"
                style={{color: result.isMatch ? colors.primary[400] : colors.status.error}}>
                {result.isMatch
                  ? 'شماره شبا با کدملی تطابق دارد'
                  : 'شماره شبا با کدملی تطابق ندارد'}
              </Text>
              <Icon
                name="information-circle"
                size={20}
                color={result.isMatch ? colors.primary[400] : colors.status.error}
                style={styles.statusIcon}
              />
            </View>
            <View style={styles.infoContainer}>
              {result.nationalCode && <InfoRow label="کدملی" value={result.nationalCode} />}
              {result.birthDate && <InfoRow label="تاریخ تولد" value={result.birthDate} />}
              {result.iban && <InfoRow label="شماره شبا" value={result.iban} />}
            </View>
          </>
        );
      }
    }

    return null;
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Title */}
          <View style={styles.header}>
            <Text variant="h4" color="white" align="center">نتیجه استعلام</Text>
          </View>

          {/* Content */}
          {renderContent()}

          {/* Action Buttons */}
          <View style={styles.actions}>
            {isConvertResult ? (
              // Only Back button for convert (free service)
              <Button
                title="بازگشت"
                variant="outline"
                onPress={onClose}
              />
            ) : (
              // Back + Share buttons for paid services
              <>
                <TouchableOpacity
                  style={[styles.actionButton, styles.backButton]}
                  onPress={onClose}
                  activeOpacity={0.8}>
                  <Text variant="button" style={{color: colors.primary[400]}}>بازگشت</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={handleShare}
                  activeOpacity={0.8}>
                  <Text variant="button" style={{color: colors.primary[400]}}>اشتراک</Text>
                  <Icon name="share-social-outline" size={20} color={colors.primary[400]} style={styles.shareIcon} />
                </TouchableOpacity>
              </>
            )}
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
    overflow: 'hidden',
  },

  header: {
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.input,
  },

  description: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },

  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
  },

  statusSuccess: {
    backgroundColor: colors.transparent.primary15,
  },

  statusError: {
    backgroundColor: colors.transparent.error15,
  },

  statusIcon: {
    marginLeft: spacing.sm,
  },

  infoContainer: {
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  copyButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  },

  ibanText: {
    fontSize: 14,
  },

  matchBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },

  matchGood: {
    backgroundColor: colors.transparent.primary20,
  },

  matchBad: {
    backgroundColor: colors.transparent.error20,
  },

  actions: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
  },

  backButton: {
    marginRight: spacing.sm,
  },

  shareButton: {
    marginLeft: spacing.sm,
  },

  shareIcon: {
    marginLeft: spacing.sm,
  },
});
