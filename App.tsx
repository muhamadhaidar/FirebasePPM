// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { HabitProvider } from './src/contexts/HabitContext';
import { COLORS } from './src/constants/colors'; // Akan kita buat

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {/* HabitProvider membungkus semua navigasi untuk state management */}
      <HabitProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </HabitProvider>
    </SafeAreaProvider>
  );
};

export default App;