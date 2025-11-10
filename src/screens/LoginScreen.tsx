import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },]}>
      <Text>LoginScreen</Text>
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {}
});
