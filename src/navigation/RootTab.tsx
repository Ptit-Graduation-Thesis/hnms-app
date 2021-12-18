import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'

import Assets from '@/assets'
import ROUTER from '@/navigation/config/router'
import ItemStack from '@/navigation/stacks/ItemStack'
import ChatStack from '@/navigation/stacks/ChatStack'
import ProfileStack from '@/navigation/stacks/ProfileStack'

type TabStackType = {
  key: number
  name: string
  component: React.ComponentType<any>
  tabBarLabel: string
  tabBarIcon: ({ color }: any) => React.ReactNode
}

const Tab = createBottomTabNavigator()

const TabBarIcon: React.FC<{ color: string; source: any }> = ({ color, source }) => (
  <Image source={source} style={[styles.icon, { tintColor: color }]} />
)

const ArrayTabs: TabStackType[] = [
  {
    key: 1,
    name: ROUTER.APP.ITEM.TAB,
    component: ItemStack,
    tabBarLabel: 'item.title',
    tabBarIcon: ({ color }) => <TabBarIcon color={color} source={Assets.icon.item} />,
  },
  {
    key: 2,
    name: ROUTER.APP.CHAT.TAB,
    component: ChatStack,
    tabBarLabel: 'chat.title',
    tabBarIcon: ({ color }) => <TabBarIcon color={color} source={Assets.icon.chat} />,
  },
  {
    key: 3,
    name: ROUTER.APP.PROFILE.TAB,
    component: ProfileStack,
    tabBarLabel: 'profile.title',
    tabBarIcon: ({ color }) => <TabBarIcon color={color} source={Assets.icon.profile} />,
  },
]

const RootTab = () => {
  const { t } = useTranslation()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#000',
      }}
    >
      {ArrayTabs.map((tab) => (
        <Tab.Screen {...tab} key={tab.key} options={{ tabBarLabel: t(tab.tabBarLabel), tabBarIcon: tab.tabBarIcon }} />
      ))}
    </Tab.Navigator>
  )
}

const styles = ScaledSheet.create({
  icon: {
    width: '20@s',
    height: '20@s',
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: '10@s',
  },
})

export default RootTab
