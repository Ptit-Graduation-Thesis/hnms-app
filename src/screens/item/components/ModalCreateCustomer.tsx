import React from 'react'

import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { ScaledSheet } from 'react-native-size-matters'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { Modalize } from 'react-native-modalize'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import i18next from 'i18next'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import { OverlayLoading, Text, Touchable } from '@/common'
import { formatInputDate } from '@/utils/date'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data'
import { CustomerType } from '@/types/item.type'

interface ModalCreateCustomerProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setCustomer: React.Dispatch<React.SetStateAction<CustomerType | undefined>>
}

const schema = yup
  .object({
    fullName: yup.string().required(i18next.t('validate.required', { field: 'Full name' })),
    dob: yup.date().required(i18next.t('validate.required', { field: 'Date of birth' })),
    phoneNumber: yup
      .string()
      .matches(/^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-0-9]*$/, i18next.t('validate.invalid', { field: 'Phone number' }))
      .required(i18next.t('validate.required', { field: 'Phone number' })),
    address: yup.string().required(i18next.t('validate.required', { field: 'Address' })),
  })
  .required()

const ModalCreateCustomer: React.FC<ModalCreateCustomerProps> = ({ visible, setVisible, setCustomer }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) })
  const queryClient = useQueryClient()

  const modalizeRef = React.useRef<Modalize>(null)

  const dob = watch('dob')

  const onCancel = React.useCallback(() => {
    reset()
    setVisible(false)
  }, [reset, setVisible])

  const { mutate: createCustomer, isLoading } = useMutation((params) => api.post('/customers', params), {
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(QUERY_KEY.CUSTOMERS)
      setCustomer(res.data)
      setTimeout(onCancel, 500)
    },
    onError: (err: AxiosError) => Alert.alert(err?.response?.data?.message),
  })

  const onSubmit = React.useCallback(
    (params: any) => {
      createCustomer({ ...params, dob: formatInputDate(params.dob) })
    },
    [createCustomer],
  )

  const onModalizeOpen = React.useCallback(() => {
    modalizeRef.current?.open()
    Keyboard.dismiss()
  }, [])

  return (
    <ReactNativeModal isVisible={visible} style={styles.modal}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={styles.modalContainer}>
              <OverlayLoading visible={isLoading} />
              <Text text="Create customer" style={styles.header} />
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Full name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.fullName}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.fullName}>
                {errors.fullName?.message}
              </HelperText>
              <Controller
                control={control}
                name="dob"
                defaultValue={new Date()}
                render={() => (
                  <Touchable style={styles.dob} onPress={onModalizeOpen}>
                    <Text text="Date of birth" style={styles.dobTitle} />
                    <Text text={formatInputDate(dob)} style={styles.dobValue} />
                  </Touchable>
                )}
              />
              <HelperText type="error" visible={!!errors.dob}>
                {errors.dob?.message}
              </HelperText>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Phone number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.phoneNumber}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.phoneNumber}>
                {errors.phoneNumber?.message}
              </HelperText>
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.address}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.address}>
                {errors.address?.message}
              </HelperText>
              <View style={styles.btnContainer}>
                <Button mode="contained" color="white" onPress={onCancel}>
                  Cancel
                </Button>
                <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleSubmit(onSubmit)}>
                  Add
                </Button>
              </View>
            </View>
            <Modalize ref={modalizeRef} adjustToContentHeight>
              <View style={styles.modalContainer}>
                <Text text="Date of birth" style={styles.modalTitle} />
                <Controller
                  control={control}
                  name="dob"
                  defaultValue={new Date()}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      display="spinner"
                      value={value}
                      onChange={(_: Event, date: Date | undefined) => onChange(date)}
                    />
                  )}
                />
              </View>
            </Modalize>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  )
}

const styles = ScaledSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: '10@s',
    padding: '10@s',
    margin: '20@s',
  },
  header: {
    fontSize: '18@vs',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20@s',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '20@s',
  },
  dob: {
    backgroundColor: 'rgb(231, 231, 231)',
    paddingHorizontal: '12@s',
    paddingVertical: '10@s',
    borderTopLeftRadius: '4@s',
    borderTopRightRadius: '4@s',
    borderBottomColor: 'rgb(180, 180, 180)',
    borderBottomWidth: 1.3,
  },
  dobTitle: {
    color: 'rgb(126, 126, 126)',
    fontSize: '11@s',
  },
  dobValue: {
    fontSize: '15@s',
    marginTop: '8@s',
    color: 'rgb(14, 14, 14)',
  },
  modalTitle: {
    fontSize: '25@s',
    fontWeight: 'bold',
    paddingVertical: '20@s',
    textAlign: 'center',
  },
})

export default ModalCreateCustomer
