import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Home from '@/screens/home/Home'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.HOME.ROOT} component={Home} />
  </Stack.Navigator>
)

export default HomeStack
