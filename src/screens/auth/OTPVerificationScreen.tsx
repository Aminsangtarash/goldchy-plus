import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  I18nManager,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthService} from '../../services/api';

// Force RTL for Persian
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export function OTPVerificationScreen() {
  const insets = useSafeAreaInsets();
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
    if (!otp.trim()) {
      setError('کد تایید صحیح نمی باشد!');
      return;
    }
    if (otp.length < 4) {
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

  // Convert to Persian numerals
  const toPersianNumber = (num: number | string) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5"
        style={{paddingTop: insets.top + 12}}>
        <TouchableOpacity className="p-2">
          <Icon name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Text className="text-primary-400 text-2xl font-bold">+</Text>
          <Text className="text-white text-2xl font-bold mr-1">گلدچی</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          {/* Title with decorative lines */}
          <View className="flex-row items-center justify-center mt-8 mb-8 px-5">
            <View className="flex-1 h-px bg-primary-400/30" />
            <Text className="text-white text-xl font-semibold mx-4">
              ورود به حساب
            </Text>
            <View className="flex-1 h-px bg-primary-400/30" />
          </View>

          {/* Card Container */}
          <View className="mx-5 bg-background-card rounded-2xl p-6">
            {/* Description */}
            <Text className="text-text-secondary text-base text-center mb-2">
              کدتایید به شماره زیر ارسال شد.
            </Text>
            <Text className="text-text-secondary text-base text-center mb-8">
              {toPersianNumber(phoneNumber)}
            </Text>

            {/* OTP Input */}
            <View className="mb-4">
              <Text className="text-white text-sm mb-2 text-right">
                کد تایید
              </Text>
              <TextInput
                className="bg-background-input border border-border-input rounded-xl px-4 py-4 text-white text-base text-right"
                placeholder="وارد کنید..."
                placeholderTextColor="#5A7A7D"
                keyboardType="number-pad"
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  setError('');
                }}
                maxLength={6}
              />
            </View>

            {/* Resend & Edit Phone */}
            <View className="flex-row items-center justify-between">
              <TouchableOpacity onPress={handleEditPhone}>
                <Text className="text-primary-400 text-sm">
                  اصلاح شماره همراه
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleResendCode}
                disabled={!canResend}>
                <Text className={`text-sm ${canResend ? 'text-primary-400' : 'text-text-muted'}`}>
                  {canResend 
                    ? 'ارسال مجدد کد' 
                    : `ارسال مجدد کد در ${toPersianNumber(countdown)} ثانیه دیگر...`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Error Message */}
          {error ? (
            <View className="mx-5 mb-4 bg-error-bg rounded-xl px-4 py-4 flex-row items-center justify-center">
              <Text className="text-accent-error text-base mr-2">{error}</Text>
              <Icon name="information-circle" size={20} color="#FF6B6B" />
            </View>
          ) : null}

          {/* Submit Button */}
          <View className="mx-5 mb-6">
            <TouchableOpacity
              className={`bg-primary-400 rounded-xl py-4 items-center ${loading ? 'opacity-70' : ''}`}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}>
              <Text className="text-background-dark text-lg font-semibold">
                {loading ? 'در حال بررسی...' : 'تایید'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Tab Bar */}
      <View
        className="flex-row bg-background-card rounded-t-3xl mx-4"
        style={{paddingBottom: insets.bottom + 8, paddingTop: 16}}>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="pricetag-outline" size={24} color="#A0B4B7" />
          <Text className="text-text-secondary text-xs mt-1">قیمت ها</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="calculator-outline" size={24} color="#A0B4B7" />
          <Text className="text-text-secondary text-xs mt-1">محاسبه</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Icon name="document-text-outline" size={24} color="#A0B4B7" />
          <Text className="text-text-secondary text-xs mt-1">استعلام</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
