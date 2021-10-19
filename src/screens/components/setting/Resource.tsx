import React from 'react'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { List } from 'react-native-paper'
import { ListView, OverlayLoading } from '@/common'
import { useResource } from '@/data'
import Assets from '@/assets'

const Resource = () => {
  const { data: resources, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useResource()

  const renderItem = ({ item }: any) => (
    <List.Item
      title={`${item.id} . ${item.name} . ${item.year}`}
      left={() => <List.Icon icon={Assets.icon.resources} color={item.color} />}
    />
  )

  return (
    <View style={styles.container}>
      <OverlayLoading visible={isLoading} />

      <ListView
        queryData={resources}
        renderItem={renderItem}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        fetchNextPage={fetchNextPage}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})

export default Resource
