import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuthActions } from '../utils/hooks/useAuthActions.ts';
import { RootStackParamList } from '../navigation/types.ts';
import AppTextInput from '../components/AppTextInput.tsx';
import colors from '../constants/colors.ts';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

const RegisterScreen  = () => {
  const insets = useSafeAreaInsets();
  const { loading, handleSignup } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigation = useNavigation<RegisterScreenNavigationProp>();


  return (
    <View style={[styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },]}>
      <Text style={styles.registerTitle}>REGISTER</Text>
      <View style={styles.content}>

        <Text style={styles.healthcareTitle}>HealthHive</Text>

        <AppTextInput
          icon={'email-outline'}
          label="Email"
          placeholder={'Enter your email'}
          value={email}
          onChangeText={(text:string)=>setEmail(text)}
          keyboardType={'email-address'}
        />

        <AppTextInput
          icon={'lock-outline'}
          label="Password"
          placeholder={'Enter your password"'}
          value={password}
          onChangeText={(text:string)=>setPassword(text)}
          secureTextEntry={true}
        />


        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already Have an Account : </Text>
          <TouchableOpacity onPress={() => {navigation.replace('Login')}}>
            <Text style={styles.loginLink}>Click here to login</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={[styles.registerButton, loading && { opacity: 0.7 }]}
          onPress={()=>handleSignup(email, password)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.registerButtonText}>REGISTER</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop:20,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'BalooThambi2-Medium',
  },
  healthcareTitle: {
    fontSize: 50,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 40,
    fontFamily: 'BalooThambi2-Medium',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 16,
    fontFamily:"BalooThambi2-Medium",
    fontWeight:"500"
  },
  loginLink: {
    color: colors.link,
    fontSize: 16,
    fontFamily:"BalooThambi2-Medium",
    fontWeight:"500"
  },
  registerButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    height: 68,
    justifyContent: 'center',
    marginTop: 40,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;