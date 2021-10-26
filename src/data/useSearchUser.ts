import { useInfiniteQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

export const useSearchUser = (keyword: string) =>
  useInfiniteQuery(
    [QUERY_KEY.SEARCH_USER, keyword],
    async ({ pageParam }) => {
      const response = await api.get('/users/search', { params: { keyword, page: pageParam } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page * lastPage.limit >= lastPage.total) return undefined
        return +lastPage.page + 1
      },
    },
  )
