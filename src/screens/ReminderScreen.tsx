import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import colors from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface Prescription {
  id: string;
  imageUrl: string;
  createdAt?: { toDate: () => Date };
  status: string;
  pharmacyId?: string;
}

type ReminderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList
>;

const ReminderScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ReminderScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // 🔥 Fetch user prescriptions
  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('prescriptions')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Prescription[];
          setPrescriptions(data);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching prescriptions:', error);
          setLoading(false);
        },
      );

    return unsubscribe;
  }, []);

  // 🔒 Logout function
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace with your Login route name
      });
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderItem = ({ item }: { item: Prescription }) => {
    const date = item.createdAt
      ? new Date(item.createdAt.toDate()).toLocaleString()
      : 'No date';

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.status}>
            Status: <Text style={styles.statusValue}>{item.status}</Text>
          </Text>
          {item.pharmacyId && (
            <Text style={styles.pharmacy}>Pharmacy: {item.pharmacyId}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {/* Header with Logout */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="clock-outline" size={26} color={colors.primary} />
          <Text style={styles.headerTitle}>Reminders</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={22} color={colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading your prescriptions...</Text>
        </View>
      ) : prescriptions.length === 0 ? (
        <View style={styles.center}>
          <Icon name="file-alert-outline" size={50} color={colors.gray} />
          <Text style={styles.emptyText}>No prescriptions uploaded yet.</Text>
        </View>
      ) : (
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 separates title and logout
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'BalooThambi2-SemiBold',
    marginLeft: 8,
    color: colors.black,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'BalooThambi2-Medium',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  statusValue: {
    color: colors.primary,
    fontWeight: '600',
  },
  pharmacy: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.gray,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.gray,
  },
});
