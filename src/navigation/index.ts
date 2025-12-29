/**
 * Navigation
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {PhoneLoginScreen, OTPVerificationScreen} from '../screens/auth';
import {PricesScreen, GoldCalculatorScreen, InquiryScreen, WalletScreen, MyInquiriesScreen} from '../screens/tabs';
import {PaymentResultScreen} from '../screens/payment';
import {colors} from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          height: 70,
          paddingTop: 8,
          paddingBottom: 16,
        },
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.text.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Prices"
        component={PricesScreen}
        options={{
          tabBarLabel: 'قیمت ها',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'pricetag' : 'pricetag-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={GoldCalculatorScreen}
        options={{
          tabBarLabel: 'محاسبه',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'calculator' : 'calculator-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inquiry"
        component={InquiryScreen}
        options={{
          tabBarLabel: 'استعلام',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'document-text' : 'document-text-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.background.primary},
        }}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="MyInquiries" component={MyInquiriesScreen} />
        <Stack.Screen name="PaymentResult" component={PaymentResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
