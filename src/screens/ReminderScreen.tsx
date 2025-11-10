import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReminderScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right}]}>
      <Text>ReminderScreen</Text>
    </View>
  );
};
export default ReminderScreen;
const styles = StyleSheet.create({});
