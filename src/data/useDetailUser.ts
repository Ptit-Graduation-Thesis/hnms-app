import { useQuery } from 'react-query'
import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'

export const useDetailUser = (userId: number | string) =>
  useQuery([QUERY_KEY.DETAIL_USER, userId], async () => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  })
