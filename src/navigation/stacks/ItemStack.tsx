import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Item from '@/screens/item/Item'

const Stack = createStackNavigator()

const ItemStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.ITEM.ROOT} component={Item} />
  </Stack.Navigator>
)

export default ItemStack
