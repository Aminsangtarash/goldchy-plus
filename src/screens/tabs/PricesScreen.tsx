/**
 * PricesScreen
 * Shows prices for Gold, Currency, and Crypto
 */

import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Text,
  AppHeader,
  PageTitle,
  TabSelector,
  PriceCard,
  BottomTabBar,
} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';

type PriceTab = 'gold' | 'currency' | 'crypto';

const PRICE_TABS = [
  {key: 'gold', label: 'قیمت طلا'},
  {key: 'currency', label: 'قیمت ارز ها'},
  {key: 'crypto', label: 'قیمت رمز ارز'},
];

// Mock data for cryptocurrencies
const CRYPTO_DATA = [
  {
    symbol: 'BTC',
    name: 'بیت کوین',
    price: 108207,
    change24h: -0.11,
    changeWeekly: 0.73,
    iconBgColor: '#F7931A',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'USDT',
    name: 'تتر',
    price: 150550,
    change24h: 0.02,
    changeWeekly: 0.05,
    iconBgColor: '#26A17B',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'ETH',
    name: 'اتریوم',
    price: 50250,
    change24h: 1.25,
    changeWeekly: 3.45,
    iconBgColor: '#627EEA',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'ZK',
    name: 'زی کی سینک',
    price: 108207,
    change24h: -2.15,
    changeWeekly: -1.50,
    iconBgColor: '#8B5CF6',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'S',
    name: 'سونیک',
    price: 108207,
    change24h: 0.45,
    changeWeekly: 2.30,
    iconBgColor: '#3B82F6',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'DOGE',
    name: 'دوج کوین',
    price: 108207,
    change24h: 5.20,
    changeWeekly: 12.50,
    iconBgColor: '#C2A633',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'DOGS',
    name: 'داگز',
    price: 108207,
    change24h: -0.80,
    changeWeekly: -3.20,
    iconBgColor: '#1E293B',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'NOT',
    name: 'نات',
    price: 108207,
    change24h: 1.10,
    changeWeekly: 4.50,
    iconBgColor: '#000000',
    iconColor: '#FFFFFF',
  },
];

// Mock data for gold prices
const GOLD_DATA = [
  {
    symbol: 'طلا ۱۸',
    name: 'طلای ۱۸ عیار',
    price: 4850000,
    change24h: 0.35,
    changeWeekly: 1.20,
    iconBgColor: '#FFD700',
    iconColor: '#000000',
  },
  {
    symbol: 'طلا ۲۴',
    name: 'طلای ۲۴ عیار',
    price: 6450000,
    change24h: 0.42,
    changeWeekly: 1.35,
    iconBgColor: '#FFD700',
    iconColor: '#000000',
  },
  {
    symbol: 'سکه',
    name: 'سکه تمام بهار',
    price: 52000000,
    change24h: -0.15,
    changeWeekly: 0.80,
    iconBgColor: '#FFD700',
    iconColor: '#000000',
  },
  {
    symbol: 'نیم',
    name: 'نیم سکه',
    price: 27500000,
    change24h: 0.20,
    changeWeekly: 0.65,
    iconBgColor: '#FFD700',
    iconColor: '#000000',
  },
  {
    symbol: 'ربع',
    name: 'ربع سکه',
    price: 16500000,
    change24h: 0.10,
    changeWeekly: 0.45,
    iconBgColor: '#FFD700',
    iconColor: '#000000',
  },
];

// Mock data for currency prices
const CURRENCY_DATA = [
  {
    symbol: 'USD',
    name: 'دلار آمریکا',
    price: 75500,
    change24h: 0.15,
    changeWeekly: 0.45,
    iconBgColor: '#22C55E',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'EUR',
    name: 'یورو',
    price: 82300,
    change24h: 0.22,
    changeWeekly: 0.60,
    iconBgColor: '#3B82F6',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'GBP',
    name: 'پوند انگلیس',
    price: 95800,
    change24h: -0.08,
    changeWeekly: 0.30,
    iconBgColor: '#EF4444',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'AED',
    name: 'درهم امارات',
    price: 20550,
    change24h: 0.05,
    changeWeekly: 0.20,
    iconBgColor: '#10B981',
    iconColor: '#FFFFFF',
  },
  {
    symbol: 'TRY',
    name: 'لیر ترکیه',
    price: 2150,
    change24h: -0.35,
    changeWeekly: -1.20,
    iconBgColor: '#EF4444',
    iconColor: '#FFFFFF',
  },
];

export function PricesScreen() {
  const [activeTab, setActiveTab] = useState<PriceTab>('crypto');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'gold':
        return GOLD_DATA;
      case 'currency':
        return CURRENCY_DATA;
      case 'crypto':
        return CRYPTO_DATA;
      default:
        return CRYPTO_DATA;
    }
  };

  const data = getCurrentData();

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <PageTitle title="قیمت ها" />

        <TabSelector
          tabs={PRICE_TABS}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as PriceTab)}
        />

        {/* Price Cards */}
        <View style={styles.cardsContainer}>
          {data.map((item, index) => (
            <PriceCard
              key={`${item.symbol}-${index}`}
              symbol={item.symbol}
              name={item.name}
              price={item.price}
              change24h={item.change24h}
              changeWeekly={item.changeWeekly}
              iconBgColor={item.iconBgColor}
              iconColor={item.iconColor}
            />
          ))}
        </View>
      </ScrollView>

      <BottomTabBar activeTab="prices" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: spacing['2xl'],
  },

  cardsContainer: {
    paddingHorizontal: spacing.screenPadding,
  },
});
