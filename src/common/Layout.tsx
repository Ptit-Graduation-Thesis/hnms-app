import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'

import { useProfile } from '@/data'
import { useAppContext } from '@/contexts/app.context'
import { removeContext } from '@/contexts/app.action'

export const Layout: React.FC = ({ children }) => {
  const { dispatch } = useAppContext()
  const queryClient = useQueryClient()

  const { error } = useProfile()

  React.useEffect(() => {
    if ((error as any)?.response?.status === 401) {
      queryClient.getQueryCache().clear()
      dispatch(removeContext())
    }
  }, [dispatch, error, queryClient])

  return <View style={styles.container}>{children}</View>
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
