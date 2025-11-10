import React from 'react';
import {  View, StyleSheet,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar.tsx';
import ActionCard from '../components/ActionCard.tsx';
import PrescriptionCard from '../components/PrescriptionCard.tsx';
import OfferCard from '../components/OfferCard.tsx';
import colors from '../constants/colors.ts';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <HeaderBar />


      <View style={styles.actionsContainer}>
        <ActionCard image={require("../assets/questions.png")} title="Questions" onPress={()=>{

        }}/>
        <ActionCard image={require("../assets/messages.png")} title="Messages" />
        <ActionCard image={require("../assets/reminders.png")} title="Reminders" />
        <ActionCard image={require("../assets/calender.png")} title="Calendar" />
      </View>


      <PrescriptionCard />


      <OfferCard
        bgColor="#D7F5D4"
        title="Get the Best Medical Service"
        subtitle="Rem illum facere quo corporis quis in saepe iacique ut quos pariatur."
        discount=""
        image={require('../assets/doctor.png')}
      />
      <OfferCard
        bgColor="#E9DBF8"
        title="On Health Products"
        subtitle=""
        discount="UPTO 80% offer"
        image={require('../assets/vitamins.png')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
  },
});
