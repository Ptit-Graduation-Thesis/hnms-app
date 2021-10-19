import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAppContext } from '@/contexts/app.context'

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value || ''
  } catch (error) {
    return ''
  }
}

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    return false
  }
}

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export const getToken = async () => {
  const accessToken = await getAppContext((state) => state.accessToken)
  return accessToken
}
