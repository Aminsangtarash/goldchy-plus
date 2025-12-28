import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthService} from '../../services/api';

// Force RTL for Persian
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export function PhoneLoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return /^09\d{9}$/.test(cleanPhone);
  };

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      setError('شماره همراه صحیح نمی باشد!');
      return;
    }
    if (!validatePhone(phoneNumber)) {
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
            <Text className="text-text-secondary text-base text-center mb-8">
              برای ورود به حساب کاربری شماره خود را وارد کنید.
            </Text>

            {/* Phone Input */}
            <View className="mb-4">
              <Text className="text-white text-sm mb-2 text-right">
                شماره همراه
              </Text>
              <TextInput
                className="bg-background-input border border-border-input rounded-xl px-4 py-4 text-white text-base text-right"
                placeholder="وارد کنید..."
                placeholderTextColor="#5A7A7D"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setError('');
                }}
                maxLength={11}
              />
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
              onPress={handleSendCode}
              disabled={loading}
              activeOpacity={0.8}>
              <Text className="text-background-dark text-lg font-semibold">
                {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
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
