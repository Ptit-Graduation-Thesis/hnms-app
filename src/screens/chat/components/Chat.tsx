import React from 'react'

import { Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import debounce from 'lodash.debounce'
import { Title, Searchbar } from 'react-native-paper'

import { ListView, OverlayLoading, Text, Touchable, AvatarText } from '@/common'
import { useRooms } from '@/data'
import Assets from '@/assets'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'

import ModalSearchUser from './ModalSearchUser'

const Chat = () => {
  const { t } = useTranslation()
  const { data: rooms, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useRooms()

  const [search, setSearch] = React.useState('')
  const [keyword, setKeyword] = React.useState('')
  const [isSearch, setIsSearch] = React.useState(false)

  const gotoRoom = React.useCallback(
    (roomId: number, otherUserName: string) => navigate(ROUTER.APP.CHAT.ROOM, { roomId, otherUserName }),
    [],
  )

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Touchable style={styles.userView} onPress={() => gotoRoom(item.id, item.otherUserName)}>
        <AvatarText size={verticalScale(45)} label={item.otherUserName} />
        <View style={styles.userInfo}>
          <Title>{item.otherUserName}</Title>
        </View>
      </Touchable>
    ),
    [gotoRoom],
  )

  const handleSearch = React.useMemo(() => debounce((value) => setKeyword(value), 500), [])

  const cancelSearch = React.useCallback(() => {
    Keyboard.dismiss()
    setIsSearch(false)
  }, [])

  const handleChangeText = React.useCallback(
    (value) => {
      handleSearch(value)
      setSearch(value)
    },
    [handleSearch],
  )

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <OverlayLoading visible={isLoading} />

        <View style={styles.header}>
          <Searchbar
            style={styles.search}
            placeholder={t('chat.search')}
            value={search}
            onChangeText={handleChangeText}
            icon={Assets.icon.search}
            clearIcon={Assets.icon.clear}
            onFocus={() => setIsSearch(true)}
          />
          <Touchable style={[styles.btnCancel, { width: isSearch ? verticalScale(60) : 0 }]} onPress={cancelSearch}>
            <Text i18nText="common.cancel" />
          </Touchable>
        </View>
        <View style={styles.content}>
          <ModalSearchUser visible={isSearch} setVisible={setIsSearch} keyword={keyword} refetchRoom={refetch} />
          <ListView
            queryData={rooms}
            renderItem={renderItem}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refetch={refetch}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + scale(13),
    paddingHorizontal: '10@s',
    paddingBottom: '10@s',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdde1',
    flexDirection: 'row',
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
  search: {
    elevation: 0,
    backgroundColor: '#dcdde1',
    height: '30@s',
    borderRadius: '15@s',
    flex: 1,
  },
  btnCancel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContent: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

export default Chat
