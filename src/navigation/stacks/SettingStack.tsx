import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Setting from '@/screens/setting/Setting'
import Resource from '@/screens/setting/Resource'

const Stack = createStackNavigator()

const SettingStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.SETTING.ROOT} component={Setting} />
    <Stack.Screen name={ROUTER.APP.SETTING.RESOURCE} component={Resource} />
  </Stack.Navigator>
)

export default SettingStack
