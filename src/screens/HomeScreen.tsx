import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar.tsx';
import ActionCard from '../components/ActionCard.tsx';
import PrescriptionCard from '../components/PrescriptionCard.tsx';
import OfferCard from '../components/OfferCard.tsx';
import colors from '../constants/colors.ts';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container,
        { paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }]}
    >
      <View style={styles.backBox}/>
      <HeaderBar />


      <View style={styles.actionsContainer}>
        <ActionCard image={require("../assets/questions.png")} title="Questions" />
        <ActionCard image={require("../assets/messages.png")} title="Messages" />
        <ActionCard image={require("../assets/reminders.png")} title="Reminders" />
        <ActionCard image={require("../assets/calender.png")} title="Calendar" />
      </View>


      <PrescriptionCard />


      <OfferCard
        bgColor={colors.green}
        title="Get the Best Medical Service"
        subtitle="Connect with certified experts to receive personalized and reliable health recommendations."
        discount=""
        image={require('../assets/doctor.png')}
      />
      <OfferCard
        buttonTitle={"SHOP NOW"}
        bgColor={colors.purple}
        title="On Health Products"
        subtitle=""
        discount="UPTO 80% off"
        image={require('../assets/vitamins.png')}
      />

    </ScrollView>
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
  backBox: {
    position: 'absolute',
    backgroundColor: colors.pink,
    width: '50%',
    height: 180,
    borderRadius:15,
    top: 522,
    left: -50,
    zIndex: 0,
  }
});
