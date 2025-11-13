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
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { getAuth, signOut } from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from '@react-native-firebase/firestore';

interface Prescription {
  id: string;
  imageUrl: string;
  createdAt?: { toDate: () => Date };
  status?: string;
  pharmacyId?: string;
}

type ReminderNavProp = NativeStackNavigationProp<RootStackParamList>;

const SCREEN_WIDTH = Dimensions.get('window').width;

const ReminderScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ReminderNavProp>();

  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const prescriptionsRef = collection(db, 'users', user.uid, 'prescriptions');
    const q = query(prescriptionsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const data = snapshot.docs.map((doc:any) => ({
          id: doc.id,
          ...doc.data(),
        })) as Prescription[];

        setPrescriptions(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderItem = ({ item }: { item: Prescription }) => {
    const date = item.createdAt
      ? new Date(item.createdAt.toDate()).toLocaleString()
      : 'No date';

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.imageLarge} />
        <View style={styles.details}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.status}>
            Status: <Text style={styles.statusValue}>{item.status || 'Processing'}</Text>
          </Text>
          {item.pharmacyId && (
            <Text style={styles.pharmacy}>{item.pharmacyId}</Text>
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
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
    fontFamily: 'BalooThambi2-SemiBold',
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
    marginLeft: 4,
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'BalooThambi2-Medium',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  imageLarge: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH - 32,
    alignSelf: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#eee',
  },
  details: {
    padding: 14,
  },
  date: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  statusValue: {
    color: colors.primary,
    fontWeight: '700',
  },
  pharmacy: {
    marginTop: 4,
    color: colors.gray,
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.gray,
    fontSize: 16,
  },
  emptyText: {
    marginTop: 10,
    color: colors.gray,
    fontSize: 16,
  },
});
