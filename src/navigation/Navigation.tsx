import React from 'react'

import AppStack from '@/navigation/stacks/AppStack'
import AuthStack from '@/navigation/stacks/AuthStack'
import { useAppContext } from '@/contexts/app.context'

const Navigation = () => {
  const { state } = useAppContext()

  if (!state.user?.id) return <AuthStack />

  return <AppStack />
}

export default Navigation
