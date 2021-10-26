import React from 'react'
import { Alert, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'
import { Title } from 'react-native-paper'
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query'

import { useSearchUser } from '@/data'
import { AvatarText, ListView, OverlayLoading, Touchable } from '@/common'
import { api } from '@/utils/axios'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'

type ModalProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  keyword: string
  refetchRoom: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>
}

const ModalSearchUser: React.FC<ModalProps> = ({ visible, keyword, setVisible, refetchRoom }) => {
  const { data: users, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useSearchUser(keyword)

  const { mutate: enterRoom, isLoading: enterRoomLoading } = useMutation(
    (userTwoId) => api.post('/rooms/enter', { userTwoId }),
    {
      onSuccess: (res) => {
        refetchRoom()
        setVisible(false)
        navigate(ROUTER.APP.CHAT.ROOM, { roomId: res.data.roomId, otherUserName: res.data.otherUserName })
      },
      onError: () => Alert.alert('Error', "Can't enter room"),
    },
  )

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Touchable style={styles.userView} onPress={() => enterRoom(item.id)}>
        <AvatarText size={verticalScale(45)} label={item.fullName} />
        <View style={styles.userInfo}>
          <Title>{item.fullName}</Title>
        </View>
      </Touchable>
    ),
    [enterRoom],
  )

  return (
    <ReactNativeModal
      isVisible={visible}
      coverScreen={false}
      style={styles.modal}
      animationInTiming={500}
      animationOutTiming={1000}
    >
      <View style={styles.modalContaoner}>
        <OverlayLoading visible={enterRoomLoading} />
        <ListView
          queryData={users}
          renderItem={renderItem}
          isFetching={isFetching || isLoading}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },
  modalContaoner: {
    flex: 1,
    backgroundColor: 'white',
  },
  userView: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    flexDirection: 'row',
  },
  userInfo: {
    justifyContent: 'center',
    marginLeft: '20@vs',
  },
})

export default ModalSearchUser
