import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import colors from '../constants/colors.ts';

type UploadFileInputProps = {
  fileUri?: string | null;
  onChangeFile: (uri: string | null) => void;
  label: string;
};

const UploadFileInput: React.FC<UploadFileInputProps> = ({ fileUri, onChangeFile,label }) => {
  const pickFile = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log('ImagePicker Error:', response.errorMessage);
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) onChangeFile(uri);
      }
    );
  }, [onChangeFile]);

  const handlePress = useCallback(() => {
    if (!fileUri) pickFile();
    else {
      Alert.alert('Delete', 'Are you sure you want to remove this file?', [
        { text: 'Yes', onPress: () => onChangeFile(null) },
        { text: 'No' },
      ]);
    }
  }, [fileUri, onChangeFile, pickFile]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!fileUri && (
          <View style={styles.iconNText}>
          <Image
            source={require('../assets/upload.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        {fileUri && <Image source={{ uri: fileUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UploadFileInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:20,
    borderRadius: 15,
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  gif: {
    width: 60,
    height: 60,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'BalooThambi2-Medium',
    color: colors.black,
  },
  iconNText: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
