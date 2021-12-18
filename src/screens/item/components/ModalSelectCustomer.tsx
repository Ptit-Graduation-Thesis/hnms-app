import React, { useCallback } from 'react'
import { Keyboard, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { Searchbar, Subheading, Title, FAB } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'

import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import { ListView, OverlayLoading, Text, Touchable } from '@/common'
import Assets from '@/assets'
import { useCustomers } from '@/data'

interface ModalSelectCustomerProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onCustomerPress: (customer: any) => void
  setCreateCustomerVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalSelectCustomer: React.FC<ModalSelectCustomerProps> = ({
  visible,
  setVisible,
  onCustomerPress,
  setCreateCustomerVisible,
}) => {
  const { t } = useTranslation()

  const [search, setSearch] = React.useState('')
  const [keyword, setKeyword] = React.useState('')

  const { data: customers, isLoading, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useCustomers(keyword)

  const cancelSearch = React.useCallback(() => {
    Keyboard.dismiss()
    setSearch('')
    setKeyword('')
    setVisible(false)
  }, [setVisible])

  const onSelectCustomer = React.useCallback(
    (customer: any) => {
      onCustomerPress(customer)
      cancelSearch()
    },
    [cancelSearch, onCustomerPress],
  )

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Touchable style={styles.itemView} onPress={() => onSelectCustomer(item)}>
        <View style={styles.itemInfo}>
          <Title>{item.fullName}</Title>
          <Subheading>{item.phoneNumber}</Subheading>
        </View>
      </Touchable>
    ),
    [onSelectCustomer],
  )

  const handleSearch = React.useMemo(() => debounce((value) => setKeyword(value), 500), [])

  const handleChangeText = React.useCallback(
    (value) => {
      handleSearch(value)
      setSearch(value)
    },
    [handleSearch],
  )

  const onOpenCreateCustomer = useCallback(() => {
    cancelSearch()
    setCreateCustomerVisible(true)
  }, [cancelSearch, setCreateCustomerVisible])

  return (
    <ReactNativeModal
      isVisible={visible}
      coverScreen={false}
      style={styles.modal}
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalContainer}>
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
            queryData={customers}
            renderItem={renderItem}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refetch={refetch}
            keyExtractor={(customer) => `${customer.id}`}
          />
          <FAB style={styles.fab} icon={Assets.icon.plus} color="white" onPress={onOpenCreateCustomer} />
        </View>
      </View>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
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
    width: '50@vs',
  },
  itemView: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
  },
  itemInfo: {
    justifyContent: 'center',
    marginLeft: '20@vs',
    paddingRight: '30@vs',
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
  fab: {
    position: 'absolute',
    marginBottom: StaticSafeAreaInsets.safeAreaInsetsBottom + scale(10),
    marginRight: '10@s',
    right: 0,
    bottom: 0,
    backgroundColor: '#1B9CFC',
  },
})

export default ModalSelectCustomer
