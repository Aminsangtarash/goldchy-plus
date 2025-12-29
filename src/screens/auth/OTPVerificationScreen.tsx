/**
 * OTPVerificationScreen
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  Button,
  Input,
  AppHeader,
  PageTitle,
  BottomTabBar,
} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {borderRadius} from '../../theme/borderRadius';
import {toPersianNumber} from '../../utils';
import {AuthService} from '../../services/api';

export function OTPVerificationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const phoneNumber = route.params?.phoneNumber || '09100941058';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (!otp.trim() || otp.length < 4) {
      setError('کد تایید صحیح نمی باشد!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await AuthService.verifyOTP(phoneNumber, otp);
      if (response.success) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainTabs'}],
        });
      } else {
        setError(response.message || 'کد تایید صحیح نمی باشد!');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      const response = await AuthService.sendOTP(phoneNumber);
      if (response.success) {
        setCanResend(false);
        setCountdown(60);
        setError('');
      }
    } catch (err) {
      setError('خطا در ارسال مجدد کد');
    }
  };

  const handleEditPhone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          <PageTitle title="ورود به حساب" />

          {/* Card */}
          <View style={styles.card}>
            <Text variant="body" color="secondary" align="center">
              کدتایید به شماره زیر ارسال شد.
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.phoneNumber}>
              {toPersianNumber(phoneNumber)}
            </Text>

            <Input
              label="کد تایید"
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                setError('');
              }}
              keyboardType="number-pad"
              maxLength={6}
            />

            {/* Resend & Edit */}
            <View style={styles.linksRow}>
              <TouchableOpacity onPress={handleEditPhone}>
                <Text variant="bodySmall" style={styles.linkText}>
                  اصلاح شماره همراه
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
                <Text
                  variant="bodySmall"
                  style={[
                    styles.resendText,
                    !canResend && styles.resendTextDisabled,
                  ]}>
                  {canResend
                    ? 'ارسال مجدد کد'
                    : `ارسال مجدد کد در ${toPersianNumber(countdown)} ثانیه دیگر...`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spacer} />

          {/* Error */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text variant="body" color="error">{error}</Text>
              <Icon name="information-circle" size={20} color={colors.status.error} style={styles.errorIcon} />
            </View>
          ) : null}

          {/* Button */}
          <View style={styles.buttonContainer}>
            <Button
              title={loading ? 'در حال بررسی...' : 'تایید'}
              loading={loading}
              onPress={handleVerify}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  card: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
  },

  phoneNumber: {
    marginBottom: spacing['3xl'],
  },

  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  linkText: {
    color: colors.primary[400],
  },

  resendText: {
    color: colors.text.muted,
  },

  resendTextDisabled: {
    color: colors.text.muted,
  },

  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.lg,
    backgroundColor: colors.transparent.error15,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
  },

  errorIcon: {
    marginLeft: spacing.sm,
  },

  buttonContainer: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing['2xl'],
  },
});
