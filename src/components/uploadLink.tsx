import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
type UploadLinkCardProps = { label: string; gif: any; onPress?: () => void };
const UploadLinkCard = ({ label, gif, onPress }: UploadLinkCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={gif} style={styles.gif} resizeMode="contain" />{' '}
      <Text style={styles.label}>{label}</Text>{' '}
    </TouchableOpacity>
  );
};
export default UploadLinkCard;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  gif: { width: 60, height: 60, marginBottom: 8 },
  label: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
    color: colors.black,
  },
});
