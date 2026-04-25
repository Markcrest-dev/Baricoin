import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Storage set error', e);
    }
  },
  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Storage get error', e);
      return null;
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error', e);
    }
  }
};
