import React from 'react'
import { Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { scale, ScaledSheet } from 'react-native-size-matters'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import { Searchbar, Title, Subheading, FAB } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'

import { ListView, OverlayLoading, Touchable } from '@/common'
import Assets from '@/assets'
import { useItems, useProfile } from '@/data'
import { formatMoney } from '@/utils/helper'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'
import ModalQrScan from './ModalQrScan'
import { RoleStatus } from '@/enums/role-status.enum'

const Item: React.FC = () => {
  const { t } = useTranslation()

  const [search, setSearch] = React.useState('')
  const [keyword, setKeyword] = React.useState('')
  const [isOpen, setOpen] = React.useState(false)
  const [modalScanQrVisible, setModalScanQrVisible] = React.useState(false)

  const { data: items, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useItems(keyword)
  const { data: profile } = useProfile()

  const gotoDetail = React.useCallback((id: number) => navigate(ROUTER.APP.ITEM.DETAIL, { id }), [])

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Touchable style={styles.itemView} onPress={() => gotoDetail(item.id)}>
        <Image source={{ uri: item.pictureUrl }} style={styles.itemPicture} />
        <View style={styles.itemInfo}>
          <Title>{item.name}</Title>
          <Subheading style={styles.price}>{formatMoney(item.price)}</Subheading>
        </View>
      </Touchable>
    ),
    [gotoDetail],
  )

  const handleSearch = React.useMemo(() => debounce((value) => setKeyword(value), 500), [])

  const handleChangeText = React.useCallback(
    (value) => {
      handleSearch(value)
      setSearch(value)
    },
    [handleSearch],
  )

  const actions = React.useMemo(() => {
    let result: any[] = []
    switch (profile?.roleId) {
      case RoleStatus.ADMIN:
        result = [
          ...result,
          { icon: Assets.icon.bill, label: 'Sell', onPress: () => navigate(ROUTER.APP.ITEM.SELL_ITEM) },
          { icon: Assets.icon.import, label: 'Import', onPress: () => navigate(ROUTER.APP.ITEM.IMPORT_ITEM) },
        ]
        break
      case RoleStatus.ACCOUNTANT:
        result = [
          ...result,
          { icon: Assets.icon.import, label: 'Import', onPress: () => navigate(ROUTER.APP.ITEM.IMPORT_ITEM) },
        ]
        break
      case RoleStatus.SALE_EMPLOYEE:
        result = [
          ...result,
          { icon: Assets.icon.bill, label: 'Sell', onPress: () => navigate(ROUTER.APP.ITEM.SELL_ITEM) },
        ]
        break

      default:
        break
    }
    return [...result, { icon: Assets.icon.qrCode, label: 'Qr scann', onPress: () => setModalScanQrVisible(true) }]
  }, [profile?.roleId])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            />
          </View>
          <View style={styles.content}>
            <ListView
              queryData={items}
              renderItem={renderItem}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              refetch={refetch}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
          <FAB.Group
            visible
            color="white"
            fabStyle={styles.fab}
            open={isOpen}
            icon={isOpen ? Assets.icon.close : Assets.icon.arrowUp}
            actions={actions}
            onStateChange={({ open }) => setOpen(open)}
          />
          <ModalQrScan
            visible={modalScanQrVisible}
            setVisible={setModalScanQrVisible}
            onRead={(item) => gotoDetail(item.id)}
          />
        </View>
      </TouchableWithoutFeedback>
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
  itemView: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    flexDirection: 'row',
  },
  itemInfo: {
    justifyContent: 'center',
    marginLeft: '20@vs',
    paddingRight: '30@vs',
  },
  price: {
    color: 'red',
  },
  itemPicture: {
    width: '50@s',
    height: '50@s',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  btnQrCode: {
    position: 'absolute',
    bottom: '20@s',
    right: '20@s',
  },
  fab: {
    backgroundColor: '#2C3A47',
  },
})

export default Item
