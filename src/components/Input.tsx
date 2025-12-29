/**
 * Input Component
 */

import React, {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from './Text';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {borderRadius} from '../theme/borderRadius';
import {fontSize} from '../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsSecure(!isSecure);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const containerStyles = [
    styles.container,
    isFocused && styles.containerFocused,
    error && styles.containerError,
  ];

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="label" color="primary" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={containerStyles}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary[400] : colors.text.muted}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.text.placeholder}
          placeholder="وارد کنید..."
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity onPress={handleRightIconPress}>
            <Icon
              name={
                secureTextEntry
                  ? isSecure
                    ? 'eye-off-outline'
                    : 'eye-outline'
                  : rightIcon!
              }
              size={20}
              color={colors.text.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text variant="labelSmall" color="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    textAlign: 'right',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.input,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  containerFocused: {
    borderColor: colors.primary[400],
  },

  containerError: {
    borderColor: colors.status.error,
  },

  leftIcon: {
    marginRight: spacing.md,
  },

  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.primary,
    textAlign: 'right',
    padding: 0,
  },

  error: {
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
