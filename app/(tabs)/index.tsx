import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  Avatar,
  Card,
  IconButton,
  PriceCard,
  TransactionItem,
  Badge,
} from '@/components';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View className="flex-1 bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFB800"
          />
        }
      >
        {/* Header */}
        <View
          className="px-5 pb-6"
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Avatar name="John Doe" size="lg" showBadge />
              <View className="ml-3">
                <Text className="text-text-secondary text-sm">Welcome back,</Text>
                <Text className="text-text-primary text-lg font-semibold">
                  John Doe
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <IconButton icon="notifications-outline" badge={3} />
              <View className="w-2" />
              <IconButton icon="scan-outline" />
            </View>
          </View>
        </View>

        {/* Balance Card */}
        <View className="px-5 mb-6">
          <Card variant="gold" padding="lg">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-text-secondary text-sm">Total Balance</Text>
              <Badge text="Verified" variant="success" />
            </View>
            <Text className="text-text-primary text-4xl font-bold mb-1">
              ۱۲,۵۰۰,۰۰۰
            </Text>
            <Text className="text-text-muted text-sm mb-6">تومان</Text>
            <View className="flex-row justify-between">
              <IconButton
                icon="add"
                variant="primary"
                size="lg"
                label="Deposit"
              />
              <IconButton
                icon="arrow-up"
                variant="default"
                size="lg"
                label="Withdraw"
              />
              <IconButton
                icon="swap-horizontal"
                variant="default"
                size="lg"
                label="Transfer"
              />
              <IconButton
                icon="receipt-outline"
                variant="default"
                size="lg"
                label="History"
              />
            </View>
          </Card>
        </View>

        {/* Gold Prices */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-lg font-semibold">
              Gold Prices
            </Text>
            <Text className="text-primary-500 text-sm">See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5"
          >
            <PriceCard
              title="18K Gold"
              price="۲,۸۵۰,۰۰۰"
              currency="تومان/گرم"
              change={25000}
              changePercent={0.89}
              className="w-44 mr-3"
            />
            <PriceCard
              title="24K Gold"
              price="۳,۱۲۰,۰۰۰"
              currency="تومان/گرم"
              change={-15000}
              changePercent={-0.48}
              className="w-44 mr-3"
            />
            <PriceCard
              title="Coin"
              price="۳۸,۵۰۰,۰۰۰"
              currency="تومان"
              change={500000}
              changePercent={1.32}
              className="w-44 mr-3"
            />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="px-5 mb-6">
          <Text className="text-text-primary text-lg font-semibold mb-4">
            Quick Actions
          </Text>
          <View className="flex-row">
            <Card className="flex-1 mr-3 items-center">
              <View className="w-12 h-12 rounded-full bg-primary-500/20 items-center justify-center mb-2">
                <Ionicons name="cart-outline" size={24} color="#FFB800" />
              </View>
              <Text className="text-text-primary text-sm font-medium">
                Buy Gold
              </Text>
            </Card>
            <Card className="flex-1 mr-3 items-center">
              <View className="w-12 h-12 rounded-full bg-accent-success/20 items-center justify-center mb-2">
                <Ionicons name="trending-up" size={24} color="#4CAF50" />
              </View>
              <Text className="text-text-primary text-sm font-medium">
                Sell Gold
              </Text>
            </Card>
            <Card className="flex-1 items-center">
              <View className="w-12 h-12 rounded-full bg-accent-info/20 items-center justify-center mb-2">
                <Ionicons name="gift-outline" size={24} color="#2196F3" />
              </View>
              <Text className="text-text-primary text-sm font-medium">
                Gift Gold
              </Text>
            </Card>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-lg font-semibold">
              Recent Transactions
            </Text>
            <Text className="text-primary-500 text-sm">See all</Text>
          </View>
          <Card padding="none">
            <View className="px-4">
              <TransactionItem
                type="buy"
                title="Gold Purchase"
                subtitle="18K Gold - 5g"
                amount="۱۴,۲۵۰,۰۰۰"
                date="Today, 10:30"
                status="completed"
              />
              <TransactionItem
                type="deposit"
                title="Wallet Top-up"
                subtitle="Bank Transfer"
                amount="۵,۰۰۰,۰۰۰"
                date="Yesterday"
                status="completed"
              />
              <TransactionItem
                type="sell"
                title="Gold Sale"
                subtitle="24K Gold - 2g"
                amount="۶,۲۴۰,۰۰۰"
                date="Dec 25"
                status="completed"
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
