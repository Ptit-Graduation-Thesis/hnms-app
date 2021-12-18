import React from 'react'
import { Keyboard, ActivityIndicator, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import ReactNativeModal from 'react-native-modal'

interface IProps {
  visible: boolean
  isDismissKeyboard?: false
}

const OverlayLoadingComponent: React.FC<IProps> = ({ visible, isDismissKeyboard }) => {
  React.useEffect(() => {
    if (isDismissKeyboard) Keyboard.dismiss()
  }, [visible, isDismissKeyboard])

  return (
    <ReactNativeModal
      style={styles.modal}
      isVisible={visible}
      coverScreen={false}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator style={styles.indicator} size={30} color="#000" />
      </View>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
})

export const OverlayLoading = React.memo(OverlayLoadingComponent)
