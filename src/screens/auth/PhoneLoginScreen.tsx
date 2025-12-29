/**
 * PhoneLoginScreen
 */

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import {isValidIranianPhone} from '../../utils';
import {AuthService} from '../../services/api';

export function PhoneLoginScreen() {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      setError('شماره همراه صحیح نمی باشد!');
      return;
    }
    if (!isValidIranianPhone(phoneNumber)) {
      setError('شماره همراه صحیح نمی باشد!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await AuthService.sendOTP(phoneNumber);
      if (response.success) {
        navigation.navigate('OTPVerification', {phoneNumber});
      } else {
        setError(response.message || 'خطا در ارسال کد');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
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
            <Text variant="body" color="secondary" align="center" style={styles.description}>
              برای ورود به حساب کاربری شماره خود را وارد کنید.
            </Text>

            <Input
              label="شماره همراه"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setError('');
              }}
              keyboardType="phone-pad"
              maxLength={11}
            />
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
              title={loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
              loading={loading}
              onPress={handleSendCode}
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

  description: {
    marginBottom: spacing['3xl'],
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
