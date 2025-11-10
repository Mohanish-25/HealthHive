import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput.tsx';
import colors from '../constants/colors.ts';

const LoginScreen  = () => {
  const[password, setPassword] = useState();
  const [email, setEmail] = useState();

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },]}>
      <Text style={styles.loginTitle}>LOGIN</Text>
      <View style={styles.content}>

        <Text style={styles.healthcareTitle}>HealthHive</Text>

        <AppTextInput
          icon={'email-outline'}
          label="Email"
          placeholder={'Enter your email'}
          value={email}
          onChangeText={()=>setEmail(email)}
          keyboardType={'email-address'}
        />

        <AppTextInput
          icon={'lock-outline'}
          label="Password"
          placeholder={'Enter your password"'}
          value={password}
          onChangeText={()=>setPassword(password)}
        />


        <TouchableOpacity
          onPress={() => {}}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password !</Text>
        </TouchableOpacity>


        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't Have an Account : </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.registerLink}>Click here to register</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
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
  loginTitle: {
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'BalooThambi2-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: colors.link,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  registerText: {
    fontSize: 16,
    fontFamily:"BalooThambi2-Medium",
    fontWeight:"500"
  },
  registerLink: {
    color: colors.link,
    fontSize: 16,
    fontFamily:"BalooThambi2-Medium",
    fontWeight:"500"
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    height: 68,
    justifyContent: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;