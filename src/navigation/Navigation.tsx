import React from 'react'
import { useTranslation } from 'react-i18next'

import AppStack from '@/navigation/stacks/AppStack'
import AuthStack from '@/navigation/stacks/AuthStack'
import { useAppContext } from '@/contexts/app.context'

const Navigation = () => {
  const { state } = useAppContext()
  const { i18n } = useTranslation()

  React.useEffect(() => {
    i18n.changeLanguage(state.language)
  }, [i18n, state.language])

  if (!state.accessToken) return <AuthStack />

  return <AppStack />
}

export default Navigation
