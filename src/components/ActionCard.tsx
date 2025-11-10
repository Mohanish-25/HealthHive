import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import colors from '../constants/colors.ts';

type ActionCardProps = {
  image: any;
  title: string;
  onPress?: () => void;
};

const ActionCard = ({ image, title, onPress }: ActionCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Image source={image} resizeMode={"contain"} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '45%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: colors.gray,
    borderWidth: 1,
  },
  text: {
    color: colors.gray,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
    textAlignVertical: 'center',
  },
  image: {
    width: 34,
    height: 34,
  }
});
