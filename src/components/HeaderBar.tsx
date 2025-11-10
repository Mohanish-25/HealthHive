import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors.ts';

const HeaderBar = () => {
  return (
    <View style={styles.container}>

      <View style={styles.leftIcons}>
        <TouchableOpacity >
          <Icon name="menu" size={40} color={colors.black} />
        </TouchableOpacity>
        <Image
          source={require('../assets/appicon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="microphone" size={35} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft:20
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: "50%",
    padding:5
  },
});
