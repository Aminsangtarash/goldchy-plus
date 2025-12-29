/**
 * PaymentResultScreen
 * Shows payment success or failure with auto-redirect
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from '../../components';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';

interface RouteParams {
  success: boolean;
  redirectTo?: string;
  redirectParams?: object;
}

export function PaymentResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const isSuccess = params?.success ?? true;

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      if (params?.redirectTo) {
        navigation.navigate(params.redirectTo as never, params.redirectParams as never);
      } else {
        navigation.goBack();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, params]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Illustration Circle */}
        <View style={[
          styles.illustrationCircle,
          {backgroundColor: isSuccess ? colors.primary[400] : '#E84C6F'},
        ]}>
          {/* Since we don't have the actual illustrations, using icons */}
          <Icon
            name={isSuccess ? 'thumbs-up' : 'sad'}
            size={80}
            color={colors.white}
          />
        </View>

        {/* Title */}
        <Text
          variant="h2"
          style={[
            styles.title,
            {color: isSuccess ? colors.primary[400] : '#E84C6F'},
          ]}>
          {isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}
        </Text>

        {/* Description */}
        <Text variant="body" color="secondary" align="center" style={styles.description}>
          به صورت خودکار به صفحه بعد
        </Text>
        <Text variant="body" color="secondary" align="center">
          منتقل خواهید شد
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },

  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },

  title: {
    marginBottom: spacing.xl,
    fontWeight: '700',
  },

  description: {
    lineHeight: 28,
  },
});
