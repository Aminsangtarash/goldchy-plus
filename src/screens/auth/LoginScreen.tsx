import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Input, Divider} from '../../components';

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 20,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6">
          {/* Logo */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary-500 rounded-3xl items-center justify-center mb-4">
              <Text className="text-4xl">🥇</Text>
            </View>
            <Text className="text-text-primary text-3xl font-bold">
              Goldchy Plus
            </Text>
            <Text className="text-text-secondary text-base mt-2">
              Your Digital Gold Wallet
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              containerClassName="mb-4"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              leftIcon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity className="self-end mt-3">
              <Text className="text-primary-500 text-sm">Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Button
            title="Login"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            onPress={handleLogin}
          />

          <Divider text="or continue with" className="my-6" />

          {/* Social Login */}
          <View className="flex-row justify-center mb-8">
            <TouchableOpacity className="w-14 h-14 bg-background-card rounded-xl items-center justify-center mx-2">
              <Icon name="logo-google" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-background-card rounded-xl items-center justify-center mx-2">
              <Icon name="logo-apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center">
            <Text className="text-text-secondary">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-primary-500 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
