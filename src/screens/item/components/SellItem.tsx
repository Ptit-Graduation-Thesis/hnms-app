import React from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { Appbar, Subheading, Title } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import { goBack } from '@/navigation/NavigationService'
import Assets from '@/assets'
import ModalSearchItem from './ModalSearchItem'
import { OverlayLoading, Text, Touchable } from '@/common'
import { formatMoney } from '@/utils/helper'
import { CustomerType, SellItemType } from '@/types/item.type'
import ModalSelectCustomer from './ModalSelectCustomer'
import ModalCreateCustomer from './ModalCreateCustomer'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data'

const SellItem = () => {
  const [modalItemVisible, setModalItemVisible] = React.useState(false)
  const [modalCustomerVisible, setModalCustomerVisible] = React.useState(false)
  const [modalCreateCustomerVisible, setModalCreateCustomerVisible] = React.useState(false)
  const [items, setItems] = React.useState<SellItemType[]>([])
  const [customer, setCustomer] = React.useState<CustomerType>()

  const queryClient = useQueryClient()

  const { mutate: sellItem, isLoading } = useMutation((params: any) => api.post('/items/sell', params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.DETAIL_ITEM)
      Alert.alert('Items sold successfully')
      setTimeout(goBack, 500)
    },
    onError: (err: AxiosError) => Alert.alert(err?.response?.data?.message),
  })

  const totalPrice = React.useMemo(
    () => items.map((item) => item.price * item.amount).reduce((a, b) => a + b, 0),
    [items],
  )

  const onSelectItem = React.useCallback((item: SellItemType) => {
    setItems((old) => {
      const newItems = [...old]
      const itemIndex = newItems.findIndex((cur) => item.id === cur.id)
      if (itemIndex !== -1) {
        newItems[itemIndex].amount += 1
        return newItems
      }

      return [...newItems, { ...item, amount: 1 }]
    })
  }, [])

  const onSelectCustomer = React.useCallback((value: CustomerType) => setCustomer(value), [])

  const incrementItem = React.useCallback((itemId: number) => {
    setItems((old) => {
      const newItems = [...old]
      const itemIndex = newItems.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) newItems[itemIndex].amount += 1
      return newItems
    })
  }, [])

  const decrementItem = React.useCallback((itemId: number) => {
    setItems((old) => {
      const newItems = [...old]
      const itemIndex = newItems.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1 && newItems[itemIndex].amount > 1) newItems[itemIndex].amount -= 1
      return newItems
    })
  }, [])

  const onRemoveItem = React.useCallback((itemId) => {
    setItems((old) => old.filter((item) => item.id !== itemId))
  }, [])

  const onConfirm = React.useCallback(() => {
    sellItem({
      customerId: customer?.id,
      items: items.map((item) => ({ itemId: item.id, amount: item.amount })),
    })
  }, [customer?.id, items, sellItem])

  return (
    <View style={styles.container}>
      <OverlayLoading visible={isLoading} />
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon={Assets.icon.leftArrow} onPress={goBack} />
        <Appbar.Content title="Sell item" titleStyle={styles.title} />
        <Appbar.Action icon={Assets.icon.search} onPress={() => setModalItemVisible(true)} />
        <Appbar.Action icon={Assets.icon.qrCode} />
      </Appbar.Header>
      <View style={styles.content}>
        <ScrollView style={styles.itemSell}>
          {items.map((item, index) => (
            <View key={item.id} style={[styles.itemView, { borderBottomWidth: index !== items.length - 1 ? 0.2 : 0 }]}>
              <Image source={{ uri: item.pictureUrl }} style={styles.itemPicture} />
              <View style={styles.itemInfo}>
                <Title numberOfLines={1}>{item.name}</Title>
                <Subheading style={styles.price}>{formatMoney(item.price)}</Subheading>
                <View style={styles.itemAction}>
                  <Touchable style={styles.btnItemAction} onPress={() => decrementItem(item.id)}>
                    <Text text="-" style={styles.actionLabel} />
                  </Touchable>
                  <Text text={`${item.amount}`} style={styles.amount} />
                  <Touchable style={styles.btnItemAction} onPress={() => incrementItem(item.id)}>
                    <Text text="+" style={styles.actionLabel} />
                  </Touchable>
                  <Touchable style={[styles.btnRemoveItem]} onPress={() => onRemoveItem(item.id)}>
                    <Text text="x" style={styles.actionLabel} />
                  </Touchable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.btnSell}>
          <View style={styles.sellInfo}>
            <View style={styles.row}>
              <Text text="Total price: " />
              <Text text={formatMoney(totalPrice)} color="red" />
            </View>
            <View style={styles.row}>
              <Text text="Customer: " />
              {!!customer && (
                <>
                  <Text text={customer?.fullName || ''} />
                  <Touchable style={styles.btnRemoveCustomer} onPress={() => setCustomer(undefined)}>
                    <Text text="x" style={styles.actionLabel} />
                  </Touchable>
                </>
              )}
            </View>
          </View>
          {customer ? (
            <Touchable style={styles.sell} onPress={onConfirm}>
              <Text text="Confirm" style={styles.btnLabel} />
            </Touchable>
          ) : (
            <Touchable style={styles.selectCustomer} onPress={() => setModalCustomerVisible(true)}>
              <Text text="Select customer" style={styles.btnLabel} />
            </Touchable>
          )}
        </View>
      </View>
      <ModalSearchItem visible={modalItemVisible} setVisible={setModalItemVisible} onItemPress={onSelectItem} />
      <ModalSelectCustomer
        visible={modalCustomerVisible}
        setVisible={setModalCustomerVisible}
        onCustomerPress={onSelectCustomer}
        setCreateCustomerVisible={setModalCreateCustomerVisible}
      />
      <ModalCreateCustomer
        visible={modalCreateCustomerVisible}
        setVisible={setModalCreateCustomerVisible}
        setCustomer={setCustomer}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    fontSize: '18@vs',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: '10@s',
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
  },
  itemSell: {
    flex: 1,
  },
  btnSell: {
    marginHorizontal: '-10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  btnLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemView: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    flexDirection: 'row',
    borderBottomColor: '#2C3A47',
  },
  itemInfo: {
    justifyContent: 'center',
    marginLeft: '20@vs',
    paddingRight: '20@vs',
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
  itemAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnItemAction: {
    paddingHorizontal: '15@s',
    paddingVertical: '2@vs',
    backgroundColor: '#1B9CFC',
    borderRadius: '5@s',
  },
  btnRemoveItem: {
    paddingHorizontal: '15@s',
    paddingVertical: '2@vs',
    backgroundColor: '#eb4d4b',
    borderRadius: '5@s',
    marginLeft: '10@vs',
  },
  amount: {
    marginHorizontal: '10@s',
  },
  actionLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  sellInfo: {
    paddingHorizontal: '10@s',
    paddingVertical: '5@vs',
  },
  row: {
    flexDirection: 'row',
  },
  sell: {
    backgroundColor: '#1B9CFC',
    paddingHorizontal: '10@s',
    justifyContent: 'center',
  },
  selectCustomer: {
    backgroundColor: '#f0932b',
    paddingHorizontal: '10@s',
    justifyContent: 'center',
  },
  btnRemoveCustomer: {
    backgroundColor: '#eb4d4b',
    paddingHorizontal: '5@s',
    borderRadius: '5@s',
    marginLeft: '5@vs',
  },
})

export default SellItem
