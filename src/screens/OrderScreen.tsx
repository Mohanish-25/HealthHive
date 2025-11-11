import React from 'react';
import { View, Text, StyleSheet, ScrollView,FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PharmacyCard from '../components/PharmacyCard';
import UploadOptionCard from '../components/UploadOptionCard';
import colors from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UploadLinkCard from '../components/uploadLink.tsx';

const pharmacies = [
  {
    id: 1,
    name: 'Path lab pharmacy',
    distance: '5km',
    rating: 4.5,
    reviews: 120,
    image: require('../assets/pharmacy1.jpg'),
  },
  {
    id: 2,
    name: '24 pharmacy',
    distance: '5km',
    rating: 4.5,
    reviews: 120,
    image: require('../assets/pharmacy2.png'),
  }, {
    id: 3,
    name: '24 pharmacy',
    distance: '5km',
    rating: 4.5,
    reviews: 120,
    image: require('../assets/pharmacy2.png'),
  }, {
    id: 4,
    name: '24 pharmacy',
    distance: '5km',
    rating: 4.5,
    reviews: 120,
    image: require('../assets/pharmacy2.png'),
  }, {
    id: 5,
    name: '24 pharmacy',
    distance: '5km',
    rating: 4.5,
    reviews: 120,
    image: require('../assets/pharmacy2.png'),
  },
];

const OrderScreen = () => {

  const insets = useSafeAreaInsets();

  const renderPharmacyCard = ({ item }: any) => (
    <PharmacyCard
      image={item.image}
      name={item.name}
      distance={item.distance}
      rating={item.rating}
      reviews={item.reviews}
      onPress={() => console.log('Selected:', item.name)}
    />
  );

  return (
    <ScrollView style={[styles.container,{ paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }]} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.locationRow}>
          <Icon name="map-marker-outline" size={20} color={colors.primary} />
          <Text style={styles.locationText}>Mohali</Text>
        </View>
      </View>


      <Text style={styles.sectionTitle}>Pharmacy Nearby</Text>
      <FlatList
        horizontal
        data={pharmacies}
        renderItem={renderPharmacyCard}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pharmacyList}
      />

      {/* Upload Section */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>Upload Prescription</Text>
        <Text style={styles.uploadSubtext}>
          We will show the pharmacy that fits as per your prescription.
        </Text>

        <View style={styles.uploadOptions}>
          <UploadLinkCard gif={require("../assets/uploadLink.gif")} label="Upload Link" />
          <UploadOptionCard gif={require("../assets/upload.gif")} label="Upload File" />
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  locationText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BalooThambi2-SemiBold',
    marginLeft: 4,
    color: colors.black,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    fontFamily: 'BalooThambi2-SemiBold',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  uploadSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  uploadTitle: {
    fontSize: 32,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },
  uploadSubtext: {
    textAlign: 'center',
    color: colors.black,
    fontWeight:"400",
    fontFamily: 'BalooThambi2-Regular',
    fontSize: 18,
    marginBottom: 20,
  },
  uploadOptions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.black,
    overflow: 'hidden',
  },
  continueButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 25,
    alignItems: 'center',
  },
  continueText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
  },
  pharmacyList: {
    paddingHorizontal: 15,
  },
});
