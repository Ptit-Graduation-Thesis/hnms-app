import React from 'react'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Avatar, Subheading, Title } from 'react-native-paper'

import { useUsers } from '@/data'
import { ListView, OverlayLoading, Touchable } from '@/common'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'

const Home: React.FC = () => {
  const { data: users, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useUsers()

  const goToDetail = (userId: string | number) => {
    navigate(ROUTER.APP.HOME.USER_DETAIL, { userId })
  }

  const renderItem = ({ item }: any) => (
    <Touchable style={styles.userView} onPress={goToDetail.bind(this, item.id)}>
      <Avatar.Image size={100} source={{ uri: item.avatar }} />
      <View style={styles.userInfo}>
        <Title>{`${item.first_name} ${item.last_name}`}</Title>
        <Subheading>{item.email}</Subheading>
      </View>
    </Touchable>
  )

  return (
    <View style={styles.container}>
      <OverlayLoading visible={isLoading} />

      <ListView
        queryData={users}
        renderItem={renderItem}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  userView: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@s',
    flexDirection: 'row',
  },
  userInfo: {
    justifyContent: 'center',
    marginLeft: '20@s',
  },
})

export default Home
