import React from 'react'
import { FlatList, RefreshControl, FlatListProps } from 'react-native'
import { Divider, ActivityIndicator } from 'react-native-paper'
import { InfiniteData } from 'react-query'

type DataResponseType = {
  data: any[]
}

interface IListView extends Omit<FlatListProps<any>, 'data'> {
  queryData: InfiniteData<DataResponseType> | undefined
  isFetchingNextPage: boolean
  isFetching: boolean
  fetchNextPage: () => void
  refetch: () => void
  data?: any[] | null | undefined
}

const ListViewComponent: React.FC<IListView> = ({
  queryData,
  isFetchingNextPage,
  isFetching,
  fetchNextPage,
  refetch,
  renderItem,
}) => {
  const [allData, setData] = React.useState<any[]>([])

  const renderFooter = () => {
    if (!isFetchingNextPage) return null
    return <ActivityIndicator color="#000" />
  }

  React.useEffect(() => {
    if (queryData) {
      let newData: any[] = []
      queryData.pages.forEach((item) => {
        newData = [...newData, ...item.data]
      })
      setData(newData)
    }
  }, [queryData])

  return (
    <FlatList
      data={allData}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      ListFooterComponent={renderFooter}
      onEndReached={fetchNextPage}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
    />
  )
}

export const ListView = React.memo(ListViewComponent)
