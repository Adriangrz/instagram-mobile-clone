import * as SecureStore from 'expo-secure-store';

export const storeItemInSecureStore = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.log('Setting secure item went wrong', error);
  }
};

export async function getValueFromSecureStoreFor(key: string) {
  try {
    const storeData = await SecureStore.getItemAsync(key);
    if (storeData) return storeData;

    return null;
  } catch (error) {
    console.log('Getting secure item went wrong', error);
  }
}
