import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Input} from '../../components';

type TabType = 'gold' | 'coin' | 'currency';

const tabs: {key: TabType; label: string}[] = [
  {key: 'gold', label: 'Gold'},
  {key: 'coin', label: 'Coin'},
  {key: 'currency', label: 'Currency'},
];

interface MarketItem {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  change: number;
  changePercent: number;
  icon: string;
}

const marketData: Record<TabType, MarketItem[]> = {
  gold: [
    {id: '1', name: 'طلای ۱۸ عیار', nameEn: '18K Gold', price: '۲,۸۵۰,۰۰۰', change: 25000, changePercent: 0.89, icon: '🥇'},
    {id: '2', name: 'طلای ۲۴ عیار', nameEn: '24K Gold', price: '۳,۱۲۰,۰۰۰', change: -15000, changePercent: -0.48, icon: '🥇'},
    {id: '3', name: 'طلای آبشده', nameEn: 'Melted Gold', price: '۲,۹۵۰,۰۰۰', change: 10000, changePercent: 0.34, icon: '✨'},
    {id: '4', name: 'انس جهانی طلا', nameEn: 'Gold Oz', price: '$2,625.50', change: 12, changePercent: 0.46, icon: '🌍'},
  ],
  coin: [
    {id: '1', name: 'سکه امامی', nameEn: 'Emami Coin', price: '۳۸,۵۰۰,۰۰۰', change: 500000, changePercent: 1.32, icon: '🪙'},
    {id: '2', name: 'نیم سکه', nameEn: 'Half Coin', price: '۲۱,۲۰۰,۰۰۰', change: 200000, changePercent: 0.95, icon: '🪙'},
    {id: '3', name: 'ربع سکه', nameEn: 'Quarter Coin', price: '۱۳,۸۰۰,۰۰۰', change: -100000, changePercent: -0.72, icon: '🪙'},
    {id: '4', name: 'سکه گرمی', nameEn: 'Gram Coin', price: '۷,۲۰۰,۰۰۰', change: 50000, changePercent: 0.7, icon: '🪙'},
  ],
  currency: [
    {id: '1', name: 'دلار آمریکا', nameEn: 'USD', price: '۶۲,۵۰۰', change: 500, changePercent: 0.81, icon: '🇺🇸'},
    {id: '2', name: 'یورو', nameEn: 'EUR', price: '۶۸,۲۰۰', change: -300, changePercent: -0.44, icon: '🇪🇺'},
    {id: '3', name: 'پوند انگلیس', nameEn: 'GBP', price: '۷۹,۸۰۰', change: 400, changePercent: 0.5, icon: '🇬🇧'},
    {id: '4', name: 'درهم امارات', nameEn: 'AED', price: '۱۷,۰۰۰', change: 100, changePercent: 0.59, icon: '🇦🇪'},
  ],
};

export function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('gold');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = marketData[activeTab].filter(
    item =>
      item.name.includes(searchQuery) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="px-5" style={{paddingTop: insets.top + 16}}>
        <Text className="text-text-primary text-2xl font-bold mb-4">Market</Text>
        <Input
          placeholder="Search gold, coins, currency..."
          leftIcon="search-outline"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerClassName="mb-4"
        />

        {/* Tabs */}
        <View className="flex-row bg-background-card rounded-xl p-1 mb-4">
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`
                flex-1 py-3 rounded-lg items-center
                ${activeTab === tab.key ? 'bg-primary-500' : ''}
              `}
              activeOpacity={0.7}>
              <Text
                className={`
                  font-medium
                  ${activeTab === tab.key ? 'text-secondary-900' : 'text-text-secondary'}
                `}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Market List */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* Featured Card */}
        <Card variant="gold" className="mb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-text-secondary text-sm mb-1">
                Live Gold Price
              </Text>
              <Text className="text-text-primary text-2xl font-bold">
                $2,625.50
              </Text>
              <View className="flex-row items-center mt-1">
                <Icon name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-accent-success text-sm ml-1">
                  +0.46% today
                </Text>
              </View>
            </View>
            <View className="w-20 h-20 bg-primary-500/20 rounded-full items-center justify-center">
              <Text className="text-4xl">🥇</Text>
            </View>
          </View>
        </Card>

        {/* Market Items */}
        {filteredData.map(item => (
          <TouchableOpacity key={item.id} className="mb-3" activeOpacity={0.7}>
            <Card>
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-background-elevated rounded-full items-center justify-center">
                  <Text className="text-2xl">{item.icon}</Text>
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-text-primary text-base font-medium">
                    {item.name}
                  </Text>
                  <Text className="text-text-muted text-sm">{item.nameEn}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-text-primary text-base font-semibold">
                    {item.price}
                  </Text>
                  <View className="flex-row items-center">
                    <Icon
                      name={item.change >= 0 ? 'caret-up' : 'caret-down'}
                      size={12}
                      color={item.change >= 0 ? '#4CAF50' : '#F44336'}
                    />
                    <Text
                      className={`text-sm ${
                        item.change >= 0
                          ? 'text-accent-success'
                          : 'text-accent-error'
                      }`}>
                      {item.changePercent}%
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
