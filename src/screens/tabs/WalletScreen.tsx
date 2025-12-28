import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button, IconButton, TransactionItem, Badge} from '../../components';

type AssetType = 'gold' | 'cash';

interface GoldAsset {
  id: string;
  name: string;
  amount: string;
  unit: string;
  value: string;
  change: number;
}

const goldAssets: GoldAsset[] = [
  {id: '1', name: '18K Gold', amount: '15.5', unit: 'gram', value: '۴۴,۱۷۵,۰۰۰', change: 2.5},
  {id: '2', name: '24K Gold', amount: '8.2', unit: 'gram', value: '۲۵,۵۸۴,۰۰۰', change: -0.8},
  {id: '3', name: 'Emami Coin', amount: '2', unit: 'pieces', value: '۷۷,۰۰۰,۰۰۰', change: 1.3},
];

const transactions = [
  {type: 'buy' as const, title: 'Gold Purchase', subtitle: '18K Gold - 5g', amount: '۱۴,۲۵۰,۰۰۰', date: 'Today'},
  {type: 'deposit' as const, title: 'Wallet Top-up', subtitle: 'Bank Transfer', amount: '۵,۰۰۰,۰۰۰', date: 'Yesterday'},
  {type: 'sell' as const, title: 'Gold Sale', subtitle: '24K Gold - 2g', amount: '۶,۲۴۰,۰۰۰', date: 'Dec 25'},
  {type: 'withdraw' as const, title: 'Withdrawal', subtitle: 'To Bank Account', amount: '۳,۰۰۰,۰۰۰', date: 'Dec 24'},
];

export function WalletScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<AssetType>('gold');

  const totalGoldValue = '۱۴۶,۷۵۹,۰۰۰';
  const cashBalance = '۱۲,۵۰۰,۰۰۰';

  return (
    <View className="flex-1 bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5" style={{paddingTop: insets.top + 16}}>
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-text-primary text-2xl font-bold">Wallet</Text>
            <IconButton icon="settings-outline" />
          </View>

          {/* Total Balance Card */}
          <Card variant="gold" padding="lg" className="mb-4">
            <View className="items-center">
              <Text className="text-text-secondary text-sm mb-2">
                Total Portfolio Value
              </Text>
              <Text className="text-text-primary text-4xl font-bold mb-1">
                ۱۵۹,۲۵۹,۰۰۰
              </Text>
              <Text className="text-text-muted text-sm mb-4">تومان</Text>
              <View className="flex-row items-center">
                <Badge text="+2.3% Today" variant="success" />
              </View>
            </View>
          </Card>

          {/* Asset Type Tabs */}
          <View className="flex-row bg-background-card rounded-xl p-1 mb-6">
            <TouchableOpacity
              onPress={() => setActiveTab('gold')}
              className={`
                flex-1 flex-row items-center justify-center py-3 rounded-lg
                ${activeTab === 'gold' ? 'bg-primary-500' : ''}
              `}
              activeOpacity={0.7}>
              <Text className="text-lg mr-2">🥇</Text>
              <Text
                className={`
                  font-medium
                  ${activeTab === 'gold' ? 'text-secondary-900' : 'text-text-secondary'}
                `}>
                Gold Assets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('cash')}
              className={`
                flex-1 flex-row items-center justify-center py-3 rounded-lg
                ${activeTab === 'cash' ? 'bg-primary-500' : ''}
              `}
              activeOpacity={0.7}>
              <Icon
                name="wallet"
                size={20}
                color={activeTab === 'cash' ? '#0D0D1A' : '#6B6B80'}
              />
              <Text
                className={`
                  font-medium ml-2
                  ${activeTab === 'cash' ? 'text-secondary-900' : 'text-text-secondary'}
                `}>
                Cash Balance
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on tab */}
        {activeTab === 'gold' ? (
          <View className="px-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-text-secondary text-sm">
                Total Gold Value:{' '}
                <Text className="text-primary-500 font-semibold">
                  {totalGoldValue} تومان
                </Text>
              </Text>
            </View>

            {/* Gold Assets List */}
            {goldAssets.map(asset => (
              <TouchableOpacity key={asset.id} activeOpacity={0.7}>
                <Card className="mb-3">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-primary-500/20 rounded-full items-center justify-center">
                      <Text className="text-2xl">🥇</Text>
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-text-primary text-base font-medium">
                        {asset.name}
                      </Text>
                      <Text className="text-text-muted text-sm">
                        {asset.amount} {asset.unit}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-text-primary text-base font-semibold">
                        {asset.value}
                      </Text>
                      <View className="flex-row items-center">
                        <Icon
                          name={asset.change >= 0 ? 'caret-up' : 'caret-down'}
                          size={12}
                          color={asset.change >= 0 ? '#4CAF50' : '#F44336'}
                        />
                        <Text
                          className={`text-sm ${
                            asset.change >= 0
                              ? 'text-accent-success'
                              : 'text-accent-error'
                          }`}>
                          {asset.change}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            {/* Quick Actions */}
            <View className="flex-row mt-4 mb-6">
              <View className="flex-1 mr-2">
                <Button title="Buy Gold" variant="primary" fullWidth />
              </View>
              <View className="flex-1 ml-2">
                <Button title="Sell Gold" variant="outline" fullWidth />
              </View>
            </View>
          </View>
        ) : (
          <View className="px-5">
            {/* Cash Balance */}
            <Card className="mb-6">
              <View className="items-center py-4">
                <Icon name="wallet" size={48} color="#FFB800" />
                <Text className="text-text-secondary text-sm mt-4 mb-2">
                  Available Balance
                </Text>
                <Text className="text-text-primary text-3xl font-bold">
                  {cashBalance}
                </Text>
                <Text className="text-text-muted text-sm">تومان</Text>
              </View>
            </Card>

            {/* Cash Actions */}
            <View className="flex-row mb-6">
              <View className="flex-1 mr-2">
                <Card className="items-center">
                  <IconButton icon="add" variant="primary" size="lg" />
                  <Text className="text-text-primary text-sm mt-2">Deposit</Text>
                </Card>
              </View>
              <View className="flex-1 mx-2">
                <Card className="items-center">
                  <IconButton icon="arrow-up" size="lg" />
                  <Text className="text-text-primary text-sm mt-2">Withdraw</Text>
                </Card>
              </View>
              <View className="flex-1 ml-2">
                <Card className="items-center">
                  <IconButton icon="swap-horizontal" size="lg" />
                  <Text className="text-text-primary text-sm mt-2">Transfer</Text>
                </Card>
              </View>
            </View>
          </View>
        )}

        {/* Recent Transactions */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-lg font-semibold">
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text className="text-primary-500 text-sm">See all</Text>
            </TouchableOpacity>
          </View>
          <Card padding="none">
            <View className="px-4">
              {transactions.map((tx, index) => (
                <TransactionItem
                  key={index}
                  type={tx.type}
                  title={tx.title}
                  subtitle={tx.subtitle}
                  amount={tx.amount}
                  date={tx.date}
                />
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
