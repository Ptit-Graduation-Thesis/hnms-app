import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View } from 'react-native'

export const Layout: React.FC = ({ children }) => <View style={styles.container}>{children}</View>

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
