import React from 'react'
import Config from 'react-native-config'

import { AppReducer, initialState } from '@/contexts/app.reducer'
import { AppActionType, AppStateType } from '@/contexts/app.type'
import { updateContext } from '@/contexts/app.action'
import { getItem, setItem } from '@/utils/storage'

type ContextType = {
  state: AppStateType
  dispatch: React.Dispatch<AppActionType>
}

const AppContext = React.createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
})

export const useAppContext = () => React.useContext(AppContext)

export const getAppContext = async (callback = (state: AppStateType): any => state) => {
  const appStateString = await getItem(Config.PERSIST_KEY)
  const appState = JSON.parse(appStateString) as AppStateType
  return callback(appState)
}

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState)

  React.useEffect(() => {
    getItem(Config.PERSIST_KEY).then((value) => {
      const appState = JSON.parse(value || '{}')
      dispatch(updateContext(appState))
    })
  }, [])

  React.useEffect(() => {
    const appState = JSON.stringify(state)
    setItem(Config.PERSIST_KEY, appState)
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
