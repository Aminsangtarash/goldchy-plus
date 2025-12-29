/**
 * Goldchy Plus App
 * Gold Trading Platform - Persian RTL
 */

import React, {useEffect} from 'react';
import {StatusBar, I18nManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootNavigator} from './src/navigation';
import {colors} from './src/theme/colors';

// Force RTL for Persian
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background.primary}
          translucent={false}
        />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
