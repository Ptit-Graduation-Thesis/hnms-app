import React from 'react'

import AppStack from '@/navigation/stacks/AppStack'
import AuthStack from '@/navigation/stacks/AuthStack'
import { useAppContext } from '@/contexts/app.context'
import { api } from '@/utils/axios'
import { removeContext, updateContext } from '@/contexts/app.action'
import { OverlayLoading } from '@/common'

const Navigation = () => {
  const { state, dispatch } = useAppContext()
  const [isloading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!state.accessToken) return
    setLoading(true)
    api
      .get('/users/5')
      .then(({ data: user }) => {
        const fullName = `${user.data.first_name} ${user.data.last_name}`
        dispatch(updateContext({ user: { ...user.data, fullName } }))
      })
      .catch(() => dispatch(removeContext()))
      .finally(() => setLoading(false))
  }, [state.accessToken])

  if (isloading) return <OverlayLoading visible />

  if (!state.user?.id) return <AuthStack />

  return <AppStack />
}

export default Navigation
