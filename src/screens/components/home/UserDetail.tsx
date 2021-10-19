import React from 'react'
import { View } from 'react-native'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'
import { Avatar, Subheading, Title } from 'react-native-paper'

import { useDetailUser } from '@/data'
import { OverlayLoading } from '@/common'

interface IRoute extends RouteProp<ParamListBase> {
  params: {
    userId: number | string
  }
}

const UserDetail = () => {
  const route = useRoute() as IRoute
  const { data: user, isLoading } = useDetailUser(route.params.userId)

  return (
    <View style={styles.container}>
      <OverlayLoading visible={isLoading} />

      <View style={styles.avatar}>
        <Avatar.Image source={{ uri: user?.data.avatar }} size={200} />
        <View style={styles.userInfo}>
          <Title>{`${user?.data.first_name} ${user?.data.last_name}`}</Title>
          <Subheading>{user?.data.email}</Subheading>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20@s',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: '15@s',
  },
})

export default UserDetail
