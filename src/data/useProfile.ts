import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'

export const useProfile = () =>
  useQuery(
    QUERY_KEY.PROFILE,
    async () => {
      const response = await api.get('/profile')
      return response.data
    },
    { retry: false },
  )
