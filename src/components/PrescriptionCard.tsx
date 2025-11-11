import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors.ts';

type PrescriptionCardProps = {
  onPress: () => void;
}

const PrescriptionCard = ({onPress}:PrescriptionCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UPLOAD PRESCRIPTION</Text>
      <Text style={styles.desc}>
        Upload a Prescription and Tell Us What you Need. We do the Rest.!
      </Text>
      <View style={styles.offerButtonContainer}>
        <View style={styles.textContainer}>
      <Text style={styles.offer} numberOfLines={2}>Flat 25% OFF ON MEDICINES</Text>
        </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>ORDER NOW</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrescriptionCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 50,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily:"BalooThambi2-Bold",
    color:colors.black3,
  },
  desc: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily:"BalooThambi2-SemiBold",
    marginBottom: 10,
    color:colors.black3
  },
  offerButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offer: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily:"BalooThambi2-Bold",
    color: colors.black2,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontFamily:"BalooThambi2-Bold",
    fontSize: 18,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30%',
    height: 40,
  }
});
