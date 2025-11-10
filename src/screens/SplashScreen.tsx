import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SplashScreenNavigationProp>();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login or Preloader
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <Animatable.Image
        animation="fadeInDown"
        duration={1500}
        source={require('../assets/applogo.png')} // replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Animatable.Text
        animation="fadeInUp"
        delay={500}
        duration={1200}
        style={styles.title}
      >
        HealthHive
      </Animatable.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    letterSpacing: 1,
  },
});
