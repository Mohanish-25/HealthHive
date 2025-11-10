import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

type PharmacyCardProps = {
  image: any;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  onPress?: () => void;
};

const PharmacyCard = ({ image, name, distance, rating, reviews, onPress }: PharmacyCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.distance}>{distance} Away</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" color="#F5A623" size={16} />
          <Text style={styles.ratingText}>
            {rating} ({reviews} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight : 15,
    borderWidth: 0.5,
    borderColor: colors.black,
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    fontFamily:'BalooThambi2-Medium',
  },
  distance: {
    fontSize: 13,
    color: colors.gray2,
    marginVertical: 2,
    fontWeight: '500',
    fontFamily:'BalooThambi2-Medium',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray2,
    marginLeft: 4,
    fontWeight: '500',
    fontFamily:'BalooThambi2-Medium',
  },
});
