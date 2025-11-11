import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import colors from '../constants/colors';

type UploadOptionCardProps = {
  label: string;
  gif: any;
  onImageSelected?: (uri: string) => void; // callback to parent
};

const UploadOptionCard = ({ label, gif, onImageSelected }: UploadOptionCardProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri || null);
        onImageSelected?.(uri || '');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
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
