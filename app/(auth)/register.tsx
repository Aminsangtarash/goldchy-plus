import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Divider, Header } from '@/components';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 20,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header
          title="Create Account"
          showBack
          onBackPress={() => router.back()}
        />

        <View className="flex-1 px-6">
          {/* Welcome Text */}
          <View className="mb-8">
            <Text className="text-text-primary text-2xl font-bold mb-2">
              Join Goldchy Plus
            </Text>
            <Text className="text-text-secondary">
              Start your gold investment journey today
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              leftIcon="person-outline"
              value={name}
              onChangeText={setName}
              containerClassName="mb-4"
            />
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
              label="Phone Number"
              placeholder="09123456789"
              leftIcon="call-outline"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              containerClassName="mb-4"
            />
            <Input
              label="Password"
              placeholder="Create a password"
              leftIcon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              containerClassName="mb-4"
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              leftIcon="lock-closed-outline"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Terms */}
          <TouchableOpacity
            className="flex-row items-start mb-6"
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View
              className={`
                w-6 h-6 rounded-md border-2 items-center justify-center mr-3 mt-0.5
                ${acceptTerms ? 'bg-primary-500 border-primary-500' : 'border-text-muted'}
              `}
            >
              {acceptTerms && (
                <Ionicons name="checkmark" size={16} color="#0D0D1A" />
              )}
            </View>
            <Text className="text-text-secondary flex-1">
              I agree to the{' '}
              <Text className="text-primary-500">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary-500">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <Button
            title="Create Account"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={!acceptTerms}
            onPress={handleRegister}
          />

          <Divider text="or sign up with" className="my-6" />

          {/* Social Login */}
          <View className="flex-row justify-center mb-8">
            <TouchableOpacity className="w-14 h-14 bg-background-card rounded-xl items-center justify-center mx-2">
              <Ionicons name="logo-google" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-background-card rounded-xl items-center justify-center mx-2">
              <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-text-secondary">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-primary-500 font-semibold">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
