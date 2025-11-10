import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { login, signUp } from '../services/authService.ts';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useAuthActions = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigation.replace('HomeTabs');
    } else {
      Alert.alert('Login Failed', result.error);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const result = await signUp(email.trim(), password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('HomeTabs');
    } else {
      Alert.alert('Signup Failed', result.error);
    }
  };

  return { loading, handleLogin, handleSignup };
};
