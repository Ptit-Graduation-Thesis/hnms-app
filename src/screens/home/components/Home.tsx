import React from 'react'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Text } from '@/common'

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text text="Home" />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
