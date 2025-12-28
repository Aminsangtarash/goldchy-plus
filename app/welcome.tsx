import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, FlatList, ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@/components';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    emoji: '🥇',
    title: 'Buy & Sell Gold',
    subtitle: 'Trade gold easily with real-time prices and secure transactions',
  },
  {
    id: '2',
    emoji: '📊',
    title: 'Track Your Portfolio',
    subtitle: 'Monitor your gold investments with detailed analytics and insights',
  },
  {
    id: '3',
    emoji: '🔒',
    title: 'Safe & Secure',
    subtitle: 'Your assets are protected with bank-level security and encryption',
  },
];

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/login');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View className="items-center justify-center" style={{ width }}>
      <View className="w-32 h-32 bg-primary-500/20 rounded-full items-center justify-center mb-8">
        <Text className="text-6xl">{item.emoji}</Text>
      </View>
      <Text className="text-text-primary text-2xl font-bold text-center mb-4 px-6">
        {item.title}
      </Text>
      <Text className="text-text-secondary text-base text-center px-10">
        {item.subtitle}
      </Text>
    </View>
  );

  return (
    <View
      className="flex-1 bg-background-dark"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Skip Button */}
      <View className="flex-row justify-end px-6 py-4">
        <Button
          title="Skip"
          variant="ghost"
          size="sm"
          onPress={handleSkip}
        />
      </View>

      {/* Slides */}
      <View className="flex-1 justify-center">
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      {/* Pagination & Button */}
      <View className="px-6 pb-8">
        {/* Dots */}
        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`
                h-2 rounded-full mx-1
                ${
                  index === currentIndex
                    ? 'w-8 bg-primary-500'
                    : 'w-2 bg-secondary-600'
                }
              `}
            />
          ))}
        </View>

        {/* Button */}
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleNext}
        />
      </View>
    </View>
  );
}
