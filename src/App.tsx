import React from 'react'
import 'react-native-gesture-handler'
import 'react-native-url-polyfill/auto'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as PaperProvider } from 'react-native-paper'

import '@/utils/i18next'
import { navigationRef } from '@/navigation/NavigationService'
import Navogation from '@/navigation/Navigation'
import { AppContextProvider } from '@/contexts/app.context'
import { RNPThemes } from '@/assets/themes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <PaperProvider theme={RNPThemes}>
        <NavigationContainer ref={navigationRef}>
          <Navogation />
        </NavigationContainer>
      </PaperProvider>
    </AppContextProvider>
  </QueryClientProvider>
)

export default App
