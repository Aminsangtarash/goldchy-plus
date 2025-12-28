import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  PhoneLoginScreen,
  OTPVerificationScreen,
} from '../screens/auth';
import {TabNavigator} from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // You can add auth state check here
  const isAuthenticated = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#0B1A1C'},
        animation: 'slide_from_right',
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : null}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
