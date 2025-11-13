import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { CLOUD_NAME, UPLOAD_PRESET_NAME } from '@env'

// Cloudinary config
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = `${UPLOAD_PRESET_NAME}`;

export const uploadPrescriptionToCloudinary = async (uri: string, pharmacyId?: string) => {
  try {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Not Logged In', 'Please log in first.');
      return;
    }

    // Prepare file
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'prescription.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', `healthhive/${user.uid}/prescriptions`);

    // Upload to Cloudinary
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.secure_url) {
      console.error('Upload failed:', data);
      Alert.alert('Error', 'Upload failed. Try again.');
      return;
    }

    // Save metadata in Firestore
    const docRef = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('prescriptions')
      .add({
        imageUrl: data.secure_url,
        createdAt: firestore.FieldValue.serverTimestamp(),
        pharmacyId: pharmacyId || null,
        status: 'pending',
      });

    return { success: true, id: docRef.id, url: data.secure_url };
  } catch (error: any) {
    console.error('Upload Error:', error);
    Alert.alert('Upload Failed', error.message);
    return { success: false, error: error.message };
  }
};
