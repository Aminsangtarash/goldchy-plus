module.exports = {
  presets: [
    ['@react-native/babel-preset', {jsxImportSource: 'nativewind'}],
    'nativewind/babel',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@services': './src/services',
        },
      },
    ],
  ],
};
