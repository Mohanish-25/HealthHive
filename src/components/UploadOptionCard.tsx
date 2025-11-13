import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import colors from '../constants/colors';

type UploadOptionCardProps = {
  label: string;
  gif: any;
  onImageSelected?: (uri: string) => void;
  resetTrigger?: number; // 👈 new prop
};

const requestAndroidReadPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  try {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Storage Permission',
      message:
        'HealthHive needs permission to access your photos to upload prescriptions.',
      buttonPositive: 'OK',
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
};

const UploadOptionCard = ({
                            label,
                            gif,
                            onImageSelected,
                            resetTrigger,
                          }: UploadOptionCardProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 👇 Watch for resetTrigger changes — resets preview back to gif
  useEffect(() => {
    setSelectedImage(null);
  }, [resetTrigger]);

  const handlePickImage = async () => {
    const hasPermission = await requestAndroidReadPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access photos without permission.');
      return;
    }

    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open gallery.');
        return;
      }

      const uri = result.assets?.[0]?.uri;
      if (!uri) {
        Alert.alert('Error', 'No image selected.');
        return;
      }

      setSelectedImage(uri);
      onImageSelected?.(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePickImage}>
      <Image
        source={selectedImage ? { uri: selectedImage } : gif}
        style={styles.gif}
        resizeMode="contain"
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default UploadOptionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  gif: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
    color: colors.black,
  },
});
