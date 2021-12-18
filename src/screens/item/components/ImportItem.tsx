import React from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'

import { goBack } from '@/navigation/NavigationService'
import Assets from '@/assets'

const ImportItem = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon={Assets.icon.leftArrow} onPress={goBack} />
        <Appbar.Content title="Import item" titleStyle={styles.title} />
        <Appbar.Action icon={Assets.icon.search} />
        <Appbar.Action icon={Assets.icon.qrCode} />
      </Appbar.Header>
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
})

export default ImportItem
