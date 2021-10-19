import React from 'react'
import { Keyboard } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { ActivityIndicator } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'

interface IProps {
  visible: boolean
}

const OverlayLoadingComponent: React.FC<IProps> = ({ visible }) => {
  React.useEffect(() => {
    Keyboard.dismiss()
  }, [visible])

  return (
    <Spinner
      visible={visible}
      animation="fade"
      customIndicator={<ActivityIndicator style={styles.indicator} size={25} color="#000" />}
    />
  )
}

const styles = ScaledSheet.create({
  indicator: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
  },
})

export const OverlayLoading = React.memo(OverlayLoadingComponent)
