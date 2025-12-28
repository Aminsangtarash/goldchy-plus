import React, {useState} from 'react';
import {View, TextInput, Text, TextInputProps, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerClassName = '',
  secureTextEntry,
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

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="text-text-secondary text-sm mb-2 font-medium">
          {label}
        </Text>
      )}
      <View
        className={`
          flex-row items-center
          bg-background-elevated rounded-xl
          px-4 py-3
          border
          ${isFocused ? 'border-primary-500' : 'border-transparent'}
          ${error ? 'border-accent-error' : ''}
        `}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={isFocused ? '#FFB800' : '#6B6B80'}
            style={{marginRight: 12}}
          />
        )}
        <TextInput
          className="flex-1 text-text-primary text-base"
          placeholderTextColor="#6B6B80"
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
              color="#6B6B80"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-accent-error text-sm mt-1">{error}</Text>}
    </View>
  );
}
