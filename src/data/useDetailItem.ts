import { useQuery } from 'react-query'

import { api } from '@/utils/axios'

import { QUERY_KEY } from './query-key'

export const useDetailItem = (id: number) =>
  useQuery([QUERY_KEY.DETAIL_ITEM, id], async () => {
    const response = await api.get(`/items/${id}`)
    return response.data
  })
