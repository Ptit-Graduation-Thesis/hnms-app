import React, { useCallback } from 'react'
import { View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { ScaledSheet } from 'react-native-size-matters'
import { TextInputMask } from 'react-native-masked-text'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import i18next from 'i18next'

import { Text } from '@/common'

const schema = yup
  .object({
    importPrice: yup.string().required(i18next.t('validate.required', { field: 'Import price' })),
  })
  .required()

interface ModalInputPriceProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onAddItem: (price: number) => void
}

const ModalInputPrice: React.FC<ModalInputPriceProps> = ({ visible, setVisible, onAddItem }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = useCallback(
    ({ importPrice }) => {
      const price = importPrice.replace(/\./g, '')
      reset()
      setVisible(false)
      onAddItem(Number.parseInt(price, 10))
    },
    [onAddItem, reset, setVisible],
  )

  return (
    <ReactNativeModal isVisible={visible}>
      <View style={styles.modalContainer}>
        <Text text="Enter import price" style={styles.header} />
        <Controller
          control={control}
          name="importPrice"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Inport price"
              right={<TextInput.Affix text="₫" />}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.importPrice}
              render={(props: any) => (
                <TextInputMask
                  {...props}
                  type="money"
                  options={{
                    precision: 0,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                  }}
                />
              )}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.importPrice}>
          {errors.importPrice?.message}
        </HelperText>
        <View style={styles.btnWrap}>
          <Button mode="outlined" onPress={() => setVisible(false)}>
            Cancel
          </Button>
          <Button mode="contained" labelStyle={styles.btnLabel} onPress={handleSubmit(onSubmit)}>
            Add item
          </Button>
        </View>
      </View>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: '10@s',
    padding: '10@s',
  },
  header: {
    fontSize: '18@vs',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10@s',
  },
  btnLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10@s',
    justifyContent: 'space-around',
  },
})

export default ModalInputPrice
