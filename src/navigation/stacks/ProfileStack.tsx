import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Setting from '@/screens/profile/Profile'

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.PROFILE.ROOT} component={Setting} />
  </Stack.Navigator>
)

export default ProfileStack
