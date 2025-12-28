import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Card, ListItem, Badge, Button} from '../../components';

const accountMenuItems = [
  {icon: 'person-outline', title: 'Personal Information', subtitle: 'Edit your profile'},
  {icon: 'shield-checkmark-outline', title: 'Security', subtitle: '2FA, Password'},
  {icon: 'card-outline', title: 'Bank Accounts', subtitle: '2 accounts linked'},
  {icon: 'document-text-outline', title: 'Documents', subtitle: 'KYC verification', badge: 'Verified'},
];

const settingsMenuItems = [
  {icon: 'notifications-outline', title: 'Notifications', subtitle: 'Push, Email, SMS'},
  {icon: 'moon-outline', title: 'Appearance', subtitle: 'Dark mode'},
  {icon: 'language-outline', title: 'Language', subtitle: 'English'},
  {icon: 'help-circle-outline', title: 'Help & Support'},
  {icon: 'document-outline', title: 'Terms & Privacy'},
];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', style: 'destructive', onPress: () => console.log('Logout')},
    ]);
  };

  return (
    <View className="flex-1 bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5" style={{paddingTop: insets.top + 16}}>
          <Text className="text-text-primary text-2xl font-bold mb-6">
            Profile
          </Text>

          {/* Profile Card */}
          <Card variant="gold" className="mb-6">
            <View className="flex-row items-center">
              <Avatar name="John Doe" size="xl" />
              <View className="flex-1 ml-4">
                <View className="flex-row items-center">
                  <Text className="text-text-primary text-xl font-semibold mr-2">
                    John Doe
                  </Text>
                  <Badge text="Pro" variant="primary" size="sm" />
                </View>
                <Text className="text-text-secondary text-sm mt-1">
                  john.doe@example.com
                </Text>
                <Text className="text-text-muted text-sm mt-0.5">
                  Member since Dec 2024
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-background-elevated rounded-full items-center justify-center">
                <Icon name="create-outline" size={20} color="#FFB800" />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Stats */}
          <View className="flex-row mb-6">
            <Card className="flex-1 mr-2 items-center">
              <Text className="text-primary-500 text-2xl font-bold">24</Text>
              <Text className="text-text-muted text-sm">Transactions</Text>
            </Card>
            <Card className="flex-1 mx-2 items-center">
              <Text className="text-primary-500 text-2xl font-bold">23.7g</Text>
              <Text className="text-text-muted text-sm">Gold Owned</Text>
            </Card>
            <Card className="flex-1 ml-2 items-center">
              <Text className="text-primary-500 text-2xl font-bold">۱۵۹M</Text>
              <Text className="text-text-muted text-sm">Total Value</Text>
            </Card>
          </View>

          {/* Account Section */}
          <Text className="text-text-primary text-lg font-semibold mb-3">
            Account
          </Text>
          <Card padding="none" className="mb-6">
            <View className="px-4">
              {accountMenuItems.map((item, index) => (
                <ListItem
                  key={index}
                  leftIcon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  rightText={item.badge}
                />
              ))}
            </View>
          </Card>

          {/* Settings Section */}
          <Text className="text-text-primary text-lg font-semibold mb-3">
            Settings
          </Text>
          <Card padding="none" className="mb-6">
            <View className="px-4">
              {settingsMenuItems.map((item, index) => (
                <ListItem
                  key={index}
                  leftIcon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </View>
          </Card>

          {/* Referral Card */}
          <Card variant="gold" className="mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary-500 rounded-full items-center justify-center">
                <Icon name="gift" size={24} color="#0D0D1A" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-text-primary font-semibold">
                  Invite Friends
                </Text>
                <Text className="text-text-secondary text-sm">
                  Get 50,000 تومان for each referral
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#FFB800" />
            </View>
          </Card>

          {/* Logout Button */}
          <Button
            title="Logout"
            variant="outline"
            fullWidth
            onPress={handleLogout}
          />

          {/* Version */}
          <Text className="text-text-muted text-xs text-center mt-6">
            Goldchy Plus v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
