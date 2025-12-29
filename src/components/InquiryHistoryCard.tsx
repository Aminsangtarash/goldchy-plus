/**
 * InquiryHistoryCard Component
 * Shows a past inquiry result in history
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet, Share, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

export type InquiryHistoryType = 'shahkar' | 'sabteahval' | 'bank_match' | 'bank_inquiry' | 'bank_convert';

interface ShahkarData {
  type: 'shahkar';
  isMatch: boolean;
  nationalCode: string;
  phoneNumber: string;
}

interface SabteAhvalData {
  type: 'sabteahval';
  nameMatch: number;
  lastNameMatch: number;
  fullNameMatch: number;
  fatherNameMatch: number;
}

interface BankMatchData {
  type: 'bank_match';
  isMatch: boolean;
  nationalCode: string;
  birthDate: string;
  iban: string;
}

interface BankInquiryData {
  type: 'bank_inquiry';
  cardNumber: string;
  iban: string;
}

export type InquiryHistoryData = ShahkarData | SabteAhvalData | BankMatchData | BankInquiryData;

interface InquiryHistoryCardProps {
  date: string;
  time: string;
  data: InquiryHistoryData;
}

// Info row with copy button
function InfoRow({label, value, showCopy = true}: {label: string; value: string; showCopy?: boolean}) {
  const handleCopy = () => {
    Clipboard.setString(value.replace(/\s/g, ''));
  };

  return (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        {showCopy && (
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Icon name="copy-outline" size={18} color={colors.text.muted} />
          </TouchableOpacity>
        )}
        <Text variant="body" color="white">{toPersianNumber(value)}</Text>
      </View>
      <Text variant="bodySmall" color="secondary">{label}</Text>
    </View>
  );
}

// Match percentage row
function MatchRow({label, percentage}: {label: string; percentage: number}) {
  const isGood = percentage >= 70;
  return (
    <View style={styles.matchRow}>
      <Text
        variant="body"
        style={{color: isGood ? colors.status.success : colors.status.error, fontWeight: '600'}}>
        {toPersianNumber(percentage)}%
      </Text>
      <Text variant="body" color="secondary">{label}</Text>
    </View>
  );
}

export function InquiryHistoryCard({date, time, data}: InquiryHistoryCardProps) {
  const getTitle = () => {
    switch (data.type) {
      case 'shahkar':
        return 'سامانه شاهکار';
      case 'sabteahval':
        return 'ثبت احوال';
      case 'bank_match':
        return 'تطابق با کدملی';
      case 'bank_inquiry':
        return 'استعلام بانکی';
      default:
        return '';
    }
  };

  const handleShare = async () => {
    let message = `نتیجه ${getTitle()}\n`;
    
    if (data.type === 'shahkar') {
      message += `کدملی: ${data.nationalCode}\n`;
      message += `شماره همراه: ${data.phoneNumber}\n`;
      message += data.isMatch ? 'وضعیت: تطابق دارند' : 'وضعیت: تطابق ندارند';
    } else if (data.type === 'sabteahval') {
      message += `تطابق نام: ${data.nameMatch}%\n`;
      message += `تطابق نام خانوادگی: ${data.lastNameMatch}%\n`;
      message += `تطابق نام کامل: ${data.fullNameMatch}%\n`;
      message += `تطابق نام پدر: ${data.fatherNameMatch}%`;
    } else if (data.type === 'bank_match') {
      message += `کدملی: ${data.nationalCode}\n`;
      message += `شماره شبا: ${data.iban}\n`;
      message += data.isMatch ? 'وضعیت: تطابق دارد' : 'وضعیت: تطابق ندارد';
    }

    try {
      await Share.share({message});
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const renderContent = () => {
    if (data.type === 'shahkar') {
      return (
        <>
          <View style={[styles.statusBanner, data.isMatch ? styles.statusSuccess : styles.statusError]}>
            <Text
              variant="body"
              style={{color: data.isMatch ? colors.primary[400] : colors.status.error}}>
              {data.isMatch ? 'کدملی و شماره همراه تطابق دارند!' : 'کدملی و شماره همراه تطابق ندارند!'}
            </Text>
          </View>
          <InfoRow label="کدملی" value={data.nationalCode} />
          <InfoRow label="شماره همراه" value={data.phoneNumber} />
        </>
      );
    }

    if (data.type === 'sabteahval') {
      return (
        <>
          <Text variant="body" color="secondary" align="center" style={styles.sabteDescription}>
            تطابق اطلاعات به شرح ذیل است
          </Text>
          <MatchRow label="تطابق نام" percentage={data.nameMatch} />
          <MatchRow label="تطابق نام خانوادگی" percentage={data.lastNameMatch} />
          <MatchRow label="تطابق نام کامل" percentage={data.fullNameMatch} />
          <MatchRow label="تطابق نام پدر" percentage={data.fatherNameMatch} />
        </>
      );
    }

    if (data.type === 'bank_match') {
      return (
        <>
          <View style={[styles.statusBanner, data.isMatch ? styles.statusSuccess : styles.statusError]}>
            <Text
              variant="body"
              style={{color: data.isMatch ? colors.primary[400] : colors.status.error}}>
              {data.isMatch ? 'شماره شبا با کدملی تطابق دارد' : 'شماره شبا با کدملی تطابق ندارد'}
            </Text>
          </View>
          <InfoRow label="کدملی" value={data.nationalCode} />
          <InfoRow label="تاریخ تولد" value={data.birthDate} />
          <InfoRow label="شماره شبا" value={data.iban} />
        </>
      );
    }

    if (data.type === 'bank_inquiry') {
      return (
        <>
          <InfoRow label="شماره کارت" value={data.cardNumber} />
          <InfoRow label="شماره شبا" value={data.iban} />
        </>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="bodySmall" color="muted">
          {time}  {date}
        </Text>
        <Text variant="body" color="white" style={styles.title}>
          {getTitle()}
        </Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text variant="bodySmall" style={{color: colors.primary[400]}}>اشتراک</Text>
        <Icon name="share-social-outline" size={16} color={colors.primary[400]} style={styles.shareIcon} />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.screenPadding,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  title: {
    fontWeight: '600',
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },

  shareIcon: {
    marginLeft: spacing.xs,
  },

  content: {
    marginTop: spacing.sm,
  },

  statusBanner: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },

  statusSuccess: {
    backgroundColor: colors.transparent.primary15,
  },

  statusError: {
    backgroundColor: colors.transparent.error15,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },

  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  copyButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  },

  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },

  sabteDescription: {
    marginBottom: spacing.md,
  },
});
