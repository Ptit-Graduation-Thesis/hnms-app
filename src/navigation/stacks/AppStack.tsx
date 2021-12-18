import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RootTab from '@/navigation/RootTab'
import navigationConfigs from '@/navigation/config/options'
import ROUTER from '@/navigation/config/router'
import Room from '@/screens/chat/Room'
import EditProfile from '@/screens/profile/EditProfile'
import DetailItem from '@/screens/item/DetailItem'
import SellItem from '@/screens/item/SellItem'
import ImportItem from '@/screens/item/ImportItem'

const Stack = createStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={ROUTER.APP.ROOT} component={RootTab} />
    <Stack.Screen name={ROUTER.APP.CHAT.ROOM} component={Room} />
    <Stack.Screen name={ROUTER.APP.PROFILE.EDIT_PROFILE} component={EditProfile} />
    <Stack.Screen name={ROUTER.APP.ITEM.DETAIL} component={DetailItem} />
    <Stack.Screen name={ROUTER.APP.ITEM.SELL_ITEM} component={SellItem} />
    <Stack.Screen name={ROUTER.APP.ITEM.IMPORT_ITEM} component={ImportItem} />
  </Stack.Navigator>
)

export default AppStack
