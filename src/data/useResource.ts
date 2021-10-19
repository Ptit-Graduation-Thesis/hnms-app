import { useInfiniteQuery } from 'react-query'
import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'

export const useResource = () =>
  useInfiniteQuery(
    QUERY_KEY.RESOURCE,
    async ({ pageParam }) => {
      const response = await api.get('/unknown', { params: { page: pageParam, per_page: 10 } })
      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.total_pages) return undefined
        return lastPage.page + 1
      },
    },
  )
