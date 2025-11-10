import auth from '@react-native-firebase/auth';

export const signUp = async (email: string, password: string) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const login = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const getCurrentUser = () => auth().currentUser;
