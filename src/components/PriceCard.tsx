/**
 * PriceCard Component
 * Expandable price card with chart
 */

import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {toPersianNumber} from '../utils';

interface PriceCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h?: number;
  changeWeekly?: number;
  iconColor?: string;
  iconBgColor?: string;
}

export function PriceCard({
  symbol,
  name,
  price,
  change24h = 0,
  changeWeekly = 0,
  iconColor = colors.white,
  iconBgColor = colors.primary[400],
}: PriceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    setExpanded(!expanded);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${name} (${symbol})\nآخرین قیمت: ${toPersianNumber(price.toLocaleString())} IRT\nتغییرات ۲۴ ساعته: ${toPersianNumber(change24h.toFixed(2))}%`,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const expandedHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const is24hPositive = change24h >= 0;
  const isWeeklyPositive = changeWeekly >= 0;

  return (
    <View style={styles.container}>
      {/* Header Row - Always Visible */}
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}>
        <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
          <Icon
            name="chevron-down"
            size={24}
            color={colors.text.secondary}
          />
        </Animated.View>

        <View style={styles.priceInfo}>
          <Text variant="bodySmall" color="secondary">آخرین قیمت</Text>
          <Text variant="body" color="white" style={styles.priceText}>
            {toPersianNumber(price.toLocaleString())} IRT
          </Text>
        </View>

        <View style={styles.coinInfo}>
          <View style={styles.nameContainer}>
            <Text variant="body" color="white" style={styles.symbol}>{symbol}</Text>
            <Text variant="bodySmall" color="secondary">{name}</Text>
          </View>
          <View style={[styles.iconContainer, {backgroundColor: iconBgColor}]}>
            <Text style={[styles.iconText, {color: iconColor}]}>
              {symbol.charAt(0)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Expanded Content */}
      <Animated.View style={[styles.expandedContent, {height: expandedHeight}]}>
        <View style={styles.expandedInner}>
          {/* Changes Row */}
          <View style={styles.changesRow}>
            <View style={styles.changeItem}>
              <View style={styles.changeValue}>
                <Icon
                  name={is24hPositive ? 'trending-up' : 'trending-down'}
                  size={16}
                  color={is24hPositive ? colors.status.success : colors.status.error}
                />
                <Text
                  variant="bodySmall"
                  style={{
                    color: is24hPositive ? colors.status.success : colors.status.error,
                    marginLeft: spacing.xs,
                  }}>
                  {is24hPositive ? '' : '-'}{toPersianNumber(Math.abs(change24h).toFixed(2))}%
                </Text>
              </View>
              <Text variant="bodySmall" color="secondary">تغییرات (۲۴H)</Text>
            </View>

            <View style={styles.changeItem}>
              <View style={styles.changeValue}>
                <Icon
                  name={isWeeklyPositive ? 'trending-up' : 'trending-down'}
                  size={16}
                  color={isWeeklyPositive ? colors.status.success : colors.status.error}
                />
                <Text
                  variant="bodySmall"
                  style={{
                    color: isWeeklyPositive ? colors.status.success : colors.status.error,
                    marginLeft: spacing.xs,
                  }}>
                  {isWeeklyPositive ? '' : '-'}{toPersianNumber(Math.abs(changeWeekly).toFixed(2))}%
                </Text>
              </View>
              <Text variant="bodySmall" color="secondary">تغییرات هفتگی</Text>
            </View>
          </View>

          {/* Chart Placeholder */}
          <View style={styles.chartContainer}>
            <View style={styles.chartPlaceholder}>
              {/* Simple SVG-like chart line */}
              <View style={styles.chartLine} />
            </View>
          </View>

          {/* Share Button */}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.8}>
            <Text variant="button" style={{color: colors.primary[400]}}>اشتراک</Text>
            <Icon
              name="share-social-outline"
              size={20}
              color={colors.primary[400]}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing.md,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },

  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameContainer: {
    alignItems: 'flex-end',
    marginRight: spacing.md,
  },

  symbol: {
    fontWeight: '700',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 16,
    fontWeight: '700',
  },

  priceInfo: {
    alignItems: 'flex-start',
  },

  priceText: {
    fontWeight: '600',
  },

  expandedContent: {
    overflow: 'hidden',
  },

  expandedInner: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  changesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },

  changeItem: {
    alignItems: 'flex-end',
  },

  changeValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chartContainer: {
    height: 80,
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },

  chartLine: {
    height: 2,
    backgroundColor: colors.primary[400],
    borderRadius: 1,
    opacity: 0.5,
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
  },

  shareIcon: {
    marginLeft: spacing.sm,
  },
});
