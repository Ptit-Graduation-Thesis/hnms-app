import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RootTab from '@/navigation/RootTab'
import navigationConfigs from '@/navigation/config/options'
import ROUTER from '@/navigation/config/router'
import Room from '@/screens/chat/Room'

const Stack = createStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.ROOT} component={RootTab} />
    <Stack.Screen name={ROUTER.APP.CHAT.ROOM} component={Room} />
  </Stack.Navigator>
)

export default AppStack
