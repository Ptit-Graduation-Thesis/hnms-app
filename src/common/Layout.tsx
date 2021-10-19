import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View } from 'react-native'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => <View style={styles.container}>{children}</View>

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
