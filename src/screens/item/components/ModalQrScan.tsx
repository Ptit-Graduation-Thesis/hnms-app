import React from 'react'

import ReactNativeModal from 'react-native-modal'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Alert, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Appbar, Button } from 'react-native-paper'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { api } from '@/utils/axios'
import { OverlayLoading } from '@/common'

interface ModalQrScanProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onRead: (item: any) => void
}

const ModalQrScan: React.FC<ModalQrScanProps> = ({ visible, setVisible, onRead }) => {
  const { mutate: getItem, isLoading } = useMutation((qrCode: string) => api.get(`/items/${qrCode}`), {
    onSuccess: (res) => {
      setTimeout(() => {
        setVisible(false)
        onRead(res.data)
      }, 500)
    },
    onError: (err: AxiosError) => Alert.alert(err?.response?.data?.message),
  })

  return (
    <ReactNativeModal
      isVisible={visible}
      coverScreen={false}
      style={styles.modal}
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalContaoner}>
        <OverlayLoading visible={isLoading} />
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Qr scan" titleStyle={styles.title} />
        </Appbar.Header>
        <QRCodeScanner
          reactivate
          reactivateTimeout={3000}
          showMarker
          fadeIn
          onRead={(e) => getItem(e.data)}
          bottomContent={
            <Button mode="outlined" onPress={() => setVisible(false)}>
              Cancel
            </Button>
          }
        />
      </View>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },
  modalContaoner: {
    flex: 1,
    backgroundColor: 'white',
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

export default ModalQrScan
