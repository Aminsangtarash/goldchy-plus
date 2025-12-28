import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button} from '../../components';

type TradeType = 'buy' | 'sell';

const goldTypes = [
  {id: '1', name: '18K Gold', price: 2850000, unit: 'gram'},
  {id: '2', name: '24K Gold', price: 3120000, unit: 'gram'},
  {id: '3', name: 'Emami Coin', price: 38500000, unit: 'piece'},
  {id: '4', name: 'Half Coin', price: 21200000, unit: 'piece'},
];

export function TradeScreen() {
  const insets = useSafeAreaInsets();
  const [tradeType, setTradeType] = useState<TradeType>('buy');
  const [selectedGold, setSelectedGold] = useState(goldTypes[0]);
  const [amount, setAmount] = useState('');
  const [inputType, setInputType] = useState<'weight' | 'price'>('weight');

  const calculateTotal = () => {
    const numAmount = parseFloat(amount) || 0;
    if (inputType === 'weight') {
      return numAmount * selectedGold.price;
    }
    return numAmount;
  };

  const calculateWeight = () => {
    const numAmount = parseFloat(amount) || 0;
    if (inputType === 'price') {
      return numAmount / selectedGold.price;
    }
    return numAmount;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('fa-IR');
  };

  return (
    <View className="flex-1 bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5" style={{paddingTop: insets.top + 16}}>
          <Text className="text-text-primary text-2xl font-bold mb-6">Trade</Text>

          {/* Trade Type Toggle */}
          <View className="flex-row bg-background-card rounded-xl p-1 mb-6">
            <TouchableOpacity
              onPress={() => setTradeType('buy')}
              className={`
                flex-1 py-4 rounded-lg items-center
                ${tradeType === 'buy' ? 'bg-accent-success' : ''}
              `}
              activeOpacity={0.7}>
              <Icon
                name="arrow-down-circle"
                size={24}
                color={tradeType === 'buy' ? '#FFFFFF' : '#6B6B80'}
              />
              <Text
                className={`
                  font-semibold mt-1
                  ${tradeType === 'buy' ? 'text-white' : 'text-text-secondary'}
                `}>
                Buy Gold
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTradeType('sell')}
              className={`
                flex-1 py-4 rounded-lg items-center
                ${tradeType === 'sell' ? 'bg-accent-error' : ''}
              `}
              activeOpacity={0.7}>
              <Icon
                name="arrow-up-circle"
                size={24}
                color={tradeType === 'sell' ? '#FFFFFF' : '#6B6B80'}
              />
              <Text
                className={`
                  font-semibold mt-1
                  ${tradeType === 'sell' ? 'text-white' : 'text-text-secondary'}
                `}>
                Sell Gold
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gold Type Selection */}
        <View className="px-5 mb-6">
          <Text className="text-text-secondary text-sm mb-3">
            Select Gold Type
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {goldTypes.map(gold => (
              <TouchableOpacity
                key={gold.id}
                onPress={() => setSelectedGold(gold)}
                className={`
                  mr-3 px-4 py-3 rounded-xl border
                  ${
                    selectedGold.id === gold.id
                      ? 'bg-primary-500/20 border-primary-500'
                      : 'bg-background-card border-transparent'
                  }
                `}
                activeOpacity={0.7}>
                <Text
                  className={`
                    font-medium
                    ${selectedGold.id === gold.id ? 'text-primary-500' : 'text-text-primary'}
                  `}>
                  {gold.name}
                </Text>
                <Text className="text-text-muted text-xs mt-1">
                  {formatNumber(gold.price)} تومان/
                  {gold.unit === 'gram' ? 'گرم' : 'عدد'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Amount Input */}
        <View className="px-5 mb-6">
          <Card variant="outlined">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-text-secondary text-sm">Amount</Text>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => setInputType('weight')}
                  className={`
                    px-3 py-1 rounded-full mr-2
                    ${inputType === 'weight' ? 'bg-primary-500' : 'bg-background-elevated'}
                  `}>
                  <Text
                    className={
                      inputType === 'weight'
                        ? 'text-secondary-900'
                        : 'text-text-secondary'
                    }>
                    {selectedGold.unit === 'gram' ? 'Gram' : 'Pieces'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setInputType('price')}
                  className={`
                    px-3 py-1 rounded-full
                    ${inputType === 'price' ? 'bg-primary-500' : 'bg-background-elevated'}
                  `}>
                  <Text
                    className={
                      inputType === 'price'
                        ? 'text-secondary-900'
                        : 'text-text-secondary'
                    }>
                    Toman
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              className="text-text-primary text-3xl font-bold text-center py-4"
              placeholder="0"
              placeholderTextColor="#6B6B80"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
            <View className="flex-row justify-center mt-2">
              {['25%', '50%', '75%', 'Max'].map(preset => (
                <TouchableOpacity
                  key={preset}
                  className="bg-background-elevated px-3 py-1 rounded-full mx-1">
                  <Text className="text-text-secondary text-sm">{preset}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>

        {/* Summary */}
        <View className="px-5 mb-6">
          <Card>
            <Text className="text-text-secondary text-sm mb-4">Order Summary</Text>
            <View className="flex-row justify-between mb-3">
              <Text className="text-text-muted">Gold Type</Text>
              <Text className="text-text-primary font-medium">
                {selectedGold.name}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-text-muted">Weight</Text>
              <Text className="text-text-primary font-medium">
                {formatNumber(calculateWeight())}{' '}
                {selectedGold.unit === 'gram' ? 'گرم' : 'عدد'}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-text-muted">Unit Price</Text>
              <Text className="text-text-primary font-medium">
                {formatNumber(selectedGold.price)} تومان
              </Text>
            </View>
            <View className="h-px bg-white/10 my-3" />
            <View className="flex-row justify-between">
              <Text className="text-text-primary font-semibold">Total</Text>
              <Text className="text-primary-500 text-xl font-bold">
                {formatNumber(calculateTotal())} تومان
              </Text>
            </View>
          </Card>
        </View>

        {/* Balance Info */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between bg-background-card rounded-xl p-4">
            <View className="flex-row items-center">
              <Icon name="wallet-outline" size={20} color="#FFB800" />
              <Text className="text-text-secondary ml-2">Available Balance</Text>
            </View>
            <Text className="text-text-primary font-semibold">
              ۱۲,۵۰۰,۰۰۰ تومان
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View className="px-5">
          <Button
            title={tradeType === 'buy' ? 'Buy Now' : 'Sell Now'}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Text className="text-text-muted text-xs text-center mt-3">
            By proceeding, you agree to our terms of service
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
