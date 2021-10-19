import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useMe = () =>
  useQuery(
    QUERY_KEY.ME,
    async () => {
      const res = await api.get('/auth/me')
      return res.data
    },
    {
      staleTime: 300000,
    },
  )
