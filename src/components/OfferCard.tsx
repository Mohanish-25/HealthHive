import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors.ts';

type OfferCardProps = {
  bgColor: string;
  title: string;
  subtitle: string;
  discount?: string;
  image: any;
  buttonTitle?:string;
};

const OfferCard = ({ bgColor, title, subtitle, discount, image,buttonTitle }: OfferCardProps) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {discount && (<Text style={styles.discount}>{discount}</Text>)}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {buttonTitle && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    alignItems: 'flex-start',
  },
  discount: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 20,
  },
  title: {
    color: colors.black3,
    fontSize: 20,
    fontWeight: '600',
    fontFamily:"BalooThambi2-Bold"
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '600',
    fontFamily:"BalooThambi2-Bold",
    color: colors.black3,
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
  image: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
});
