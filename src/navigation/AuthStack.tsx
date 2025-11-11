import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeTabs from './HomeTabs';
import { RootStackParamList } from './types';
import RegisterScreen from '../screens/RegisterScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="HomeTabs" component={HomeTabs} />
    <Stack.Screen name="OrderScreen" component={OrderScreen} />
  </Stack.Navigator>
);

export default AuthStack;
