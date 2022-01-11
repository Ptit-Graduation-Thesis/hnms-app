import React from 'react'

import { Image, Keyboard, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { Searchbar, Subheading, Title } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

import { ListView, OverlayLoading, Text, Touchable } from '@/common'
import Assets from '@/assets'
import { useItems } from '@/data'
import { formatMoney } from '@/utils/helper'

interface ModalSearchItemProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onItemPress: (item: any) => void
}

const ModalSearchItem: React.FC<ModalSearchItemProps> = ({ visible, setVisible, onItemPress }) => {
  const { t } = useTranslation()

  const [search, setSearch] = React.useState('')
  const [keyword, setKeyword] = React.useState('')

  const { data: items, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useItems(keyword)

  const cancelSearch = React.useCallback(() => {
    Keyboard.dismiss()
    setSearch('')
    setKeyword('')
    setVisible(false)
  }, [setVisible])

  const onSelectItem = React.useCallback(
    (item: any) => {
      onItemPress(item)
      cancelSearch()
    },
    [cancelSearch, onItemPress],
  )

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Touchable style={styles.itemView} onPress={() => onSelectItem(item)}>
        <Image source={{ uri: item.pictureUrl }} style={styles.itemPicture} />
        <View style={styles.itemInfo}>
          <Title>{item.name}</Title>
          <Subheading style={styles.price}>{formatMoney(item.price)}</Subheading>
        </View>
      </Touchable>
    ),
    [onSelectItem],
  )

  const handleSearch = React.useMemo(() => debounce((value) => setKeyword(value), 500), [])

  const handleChangeText = React.useCallback(
    (value) => {
      handleSearch(value)
      setSearch(value)
    },
    [handleSearch],
  )

  return (
    <ReactNativeModal
      isVisible={visible}
      coverScreen={false}
      style={styles.modal}
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalContaoner}>
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
          <Touchable style={styles.btnCancel} onPress={cancelSearch}>
            <Text i18nText="common.cancel" />
          </Touchable>
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
    width: '60@vs',
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
  content: {
    flex: 1,
  },
})

export default ModalSearchItem
