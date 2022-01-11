import React from 'react'

import { Image, ScrollView, View } from 'react-native'
import { Appbar, Divider, Title } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'

import Assets from '@/assets'
import { goBack } from '@/navigation/NavigationService'
import { useDetailItem } from '@/data'
import { OverlayLoading, Text } from '@/common'
import { formatMoney } from '@/utils/helper'

interface IRoute extends RouteProp<ParamListBase> {
  params: {
    id: number
  }
}

const DetailItem = () => {
  const route = useRoute() as IRoute

  const { data: item, isLoading } = useDetailItem(route.params.id)

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon={Assets.icon.leftArrow} onPress={goBack} />
        <Appbar.Content title={item?.name} titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.content}>
        <OverlayLoading visible={isLoading} />
        <ScrollView style={styles.container}>
          <View style={styles.itemInfo}>
            <Image source={{ uri: item?.pictureUrl }} style={styles.itemPic} />
            <View style={styles.itemDetail}>
              <Title>{item?.name}</Title>
              <Text text={formatMoney(item?.price)} style={styles.price} />
              <Text text={item?.des} />
            </View>
            <View style={styles.itemBranch}>
              <Text text="In stock address" style={styles.branchTitle} />
              {item?.branchItems.map((branchItem: any) => (
                <View key={branchItem.id}>
                  <Divider />
                  <View style={{ paddingVertical: 10 }}>
                    <Text text={branchItem.branch.name} style={styles.branchName} />
                    <Text text={branchItem.branch.address} />
                    <Text text={`Amount: ${branchItem.amount}`} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
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
    padding: '10@s',
  },
  itemInfo: {
    alignItems: 'center',
  },
  itemPic: {
    width: '200@s',
    height: '200@s',
  },
  itemDetail: {
    marginTop: '20@s',
    width: '100%',
  },
  price: {
    color: 'red',
  },
  itemBranch: {
    width: '100%',
    marginTop: '20@s',
  },
  branchTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  branchName: {
    fontSize: '15@s',
  },
})

export default DetailItem
