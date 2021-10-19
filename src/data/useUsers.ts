import { useInfiniteQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useUsers = () =>
  useInfiniteQuery(
    QUERY_KEY.USERS,
    async ({ pageParam }) => {
      const response = await api.get('/users', { params: { page: pageParam } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.total_pages) return undefined
        return lastPage.page + 1
      },
    },
  )
