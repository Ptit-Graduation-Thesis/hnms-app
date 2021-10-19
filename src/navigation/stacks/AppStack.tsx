import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RootTab from '@/navigation/RootTab'
import navigationConfigs from '@/navigation/config/options'

const Stack = createStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name="APP_ROOT" component={RootTab} />
  </Stack.Navigator>
)

export default AppStack
