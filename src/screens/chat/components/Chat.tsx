import React from 'react'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Text } from '@/common'

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text text="Chat" />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})

export default Chat
