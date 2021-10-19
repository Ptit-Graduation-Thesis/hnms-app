import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import navigationConfigs from '@/navigation/config/options'
import ROUTER from '@/navigation/config/router'
import Chat from '@/screens/chat/Chat'

const Stack = createStackNavigator()

const ChatStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.CHAT.ROOT} component={Chat} />
  </Stack.Navigator>
)

export default ChatStack
