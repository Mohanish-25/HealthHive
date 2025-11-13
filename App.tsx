import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator'; // centralized navigator (uses AuthStack internally)

function App() {


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    </SafeAreaProvider>
  );
}

export default App;
