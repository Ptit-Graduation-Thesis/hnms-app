import React from 'react'
import { Keyboard, ActivityIndicator } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { ScaledSheet } from 'react-native-size-matters'

interface IProps {
  visible: boolean
  isDismissKeyboard?: false
}

const OverlayLoadingComponent: React.FC<IProps> = ({ visible, isDismissKeyboard }) => {
  React.useEffect(() => {
    if (isDismissKeyboard) Keyboard.dismiss()
  }, [visible, isDismissKeyboard])

  return (
    <Spinner
      visible={visible}
      animation="fade"
      customIndicator={<ActivityIndicator style={styles.indicator} size={30} color="#000" />}
    />
  )
}

const styles = ScaledSheet.create({
  indicator: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
})

export const OverlayLoading = React.memo(OverlayLoadingComponent)
