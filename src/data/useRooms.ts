import { useInfiniteQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useRooms = () =>
  useInfiniteQuery(
    QUERY_KEY.ROOMS,
    async ({ pageParam }) => {
      const response = await api.get('/rooms', { params: { page: pageParam } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page * lastPage.limit >= lastPage.total) return undefined
        return +lastPage.page + 1
      },
    },
  )
