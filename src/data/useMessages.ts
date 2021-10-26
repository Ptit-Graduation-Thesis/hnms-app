import { useInfiniteQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useMessages = (roomId: number) =>
  useInfiniteQuery(
    [QUERY_KEY.MESSAGES, roomId],
    async ({ pageParam }) => {
      const response = await api.get(`/rooms/${roomId}/messages`, { params: { page: pageParam } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page * lastPage.limit >= lastPage.total) return undefined
        return +lastPage.page + 1
      },
    },
  )
