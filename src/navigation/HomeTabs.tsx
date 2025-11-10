import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.tsx';
import ReminderScreen from '../screens/ReminderScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors.ts';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarLabelStyle: { fontSize: 12 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} /> }}
    />
    <Tab.Screen
      name="Reminder"
      component={ReminderScreen}
      options={{ tabBarIcon: ({ color }) => <Icon name="bell" color={color} size={22} /> }}
    />
  </Tab.Navigator>
);

export default HomeTabs;
