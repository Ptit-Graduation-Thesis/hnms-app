import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Home from '@/screens/home/Home'
import UserDetail from '@/screens/home/UserDetail'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.HOME.ROOT} component={Home} />
    <Stack.Screen name={ROUTER.APP.HOME.USER_DETAIL} component={UserDetail} />
  </Stack.Navigator>
)

export default HomeStack
