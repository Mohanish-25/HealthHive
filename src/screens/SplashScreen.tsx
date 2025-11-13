import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import colors from '../constants/colors';
import { RootStackParamList } from '../navigation/types';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), user => {
      setTimeout(() => {
        navigation.replace(user ? 'HomeTabs' : 'Login');
      }, 2300);
    });
    return unsubscribe;
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
      <StatusBar hidden />

      <Animatable.View
        animation={{
          0: { opacity: 0.9, transform: [{ scale: 0 }] },
          0.3: { opacity: 1, transform: [{ scale: 1 }] },
          1: { opacity: 1, transform: [{ scale: 15 }] },
        }}
        easing="ease-in-out"
        duration={2000}
        style={styles.expandingCircle}
      />

      <Animatable.Text
        animation="fadeIn"
        delay={400}
        duration={1000}
        style={styles.appName}
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
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  expandingCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    fontFamily: 'BalooThambi2-Bold',
    color: colors.white,
    zIndex: 2,
    letterSpacing: 1,
  },
});
