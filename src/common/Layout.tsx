import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
