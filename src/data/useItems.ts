import { useInfiniteQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useItems = (keyword: string) =>
  useInfiniteQuery(
    [QUERY_KEY.ITEMS, keyword],
    async ({ pageParam }) => {
      const response = await api.get('/items', { params: { page: pageParam, keyword } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page * lastPage.limit >= lastPage.total) return undefined
        return +lastPage.page + 1
      },
    },
  )
