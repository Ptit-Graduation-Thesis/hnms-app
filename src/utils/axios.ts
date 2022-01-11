import axios from 'axios'

import { getToken } from '@/utils/storage'

import Config from 'react-native-config'

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
