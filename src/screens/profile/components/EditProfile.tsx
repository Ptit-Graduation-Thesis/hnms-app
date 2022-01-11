import React from 'react'

import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Modalize } from 'react-native-modalize'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import i18next from 'i18next'
import { useMutation } from 'react-query'

import Assets from '@/assets'
import { goBack } from '@/navigation/NavigationService'
import { useAppContext } from '@/contexts/app.context'
import { AvatarText, Text, Touchable } from '@/common'
import { formatInputDate } from '@/utils/date'
import { api } from '@/utils/axios'
import { updateUser } from '@/contexts/app.action'
import { ProfileParams } from '@/types/profile.type'
import { getRoleName } from '@/enums/role-status.enum'

const schema = yup
  .object({
    fullName: yup.string().required(i18next.t('validate.required', { field: 'Full name' })),
    username: yup.string(),
    password: yup
      .string()
      .test(
        'min',
        i18next.t('validate.min', { field: 'Password', length: 6 }),
        (value) => value === '' || (!!value && value.length >= 6),
      ),
    confirmPassword: yup.string().oneOf([yup.ref('password')], i18next.t('validate.match')),
    phoneNumber: yup
      .string()
      .matches(/^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-0-9]*$/, i18next.t('validate.invalid', { field: 'Phone number' }))
      .required(i18next.t('validate.required', { field: 'Phone number' })),
    address: yup.string().required(i18next.t('validate.required', { field: 'Address' })),
    dob: yup.date().required(i18next.t('validate.required', { field: 'Date of birth' })),
  })
  .required()

const EditProfile = () => {
  const { state, dispatch } = useAppContext()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) })

  const { mutate: updateProfile, isLoading } = useMutation((params: ProfileParams) => api.put('/profile', params), {
    onSuccess: (res) => {
      goBack()
      Alert.alert(t('alert.editProfileSuccess'))
      dispatch(updateUser(res.data))
    },
    onError: () => Alert.alert(t('alert.editProfileFail')),
  })

  const [isEdit, setEdit] = React.useState(false)
  const modalizeRef = React.useRef<Modalize>(null)

  const dob = watch('dob', new Date(state.user?.dob || 0))

  const onSave = React.useCallback(
    (params: ProfileParams) => {
      updateProfile({
        fullName: params.fullName || undefined,
        username: params.username || undefined,
        password: params.password || undefined,
        confirmPassword: params.confirmPassword || undefined,
        phoneNumber: params.phoneNumber || undefined,
        address: params.address || undefined,
        dob: params.dob ? formatInputDate(params.dob) : undefined,
      })
    },
    [updateProfile],
  )

  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Action icon={Assets.icon.leftArrow} onPress={goBack} />
            <Appbar.Content title={t('profile.title')} titleStyle={styles.title} />
            {!isEdit && <Appbar.Action icon={Assets.icon.edit} onPress={() => setEdit(true)} />}
          </Appbar.Header>
          <ScrollView style={styles.content}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={styles.avatar}>
                  <AvatarText label={state.user?.fullName || ''} size={scale(100)} />
                </View>
                <Controller
                  control={control}
                  name="fullName"
                  defaultValue={state.user?.fullName}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.fullName')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.fullName}
                    />
                  )}
                />
                {errors.fullName && <Text text={errors.fullName?.message} style={styles.errorText} />}
                <Controller
                  control={control}
                  name="phoneNumber"
                  defaultValue={state.user?.phoneNumber}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.phoneNumber')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.phoneNumber}
                    />
                  )}
                />
                {errors.phoneNumber && <Text text={errors.phoneNumber?.message} style={styles.errorText} />}
                <Controller
                  control={control}
                  name="address"
                  defaultValue={state.user?.address}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.address')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.address}
                    />
                  )}
                />
                {errors.address && <Text text={errors.address?.message} style={styles.errorText} />}
                <Controller
                  control={control}
                  name="dob"
                  defaultValue={new Date(state.user?.dob || 0)}
                  render={() => (
                    <Touchable
                      style={[styles.dob, { borderBottomWidth: !isEdit ? 0 : 1 }]}
                      onPress={() => modalizeRef.current?.open()}
                      disabled={!isEdit}
                    >
                      <Text i18nText="profile.dob" style={styles.dobTitle} />
                      <Text
                        text={formatInputDate(dob)}
                        style={[styles.dobValue, { color: !isEdit ? 'rgb(126, 126, 126)' : 'rgb(14, 14, 14)' }]}
                      />
                    </Touchable>
                  )}
                />
                {errors.dob && <Text text={errors.dob?.message} style={styles.errorText} />}
                <TextInput
                  label={t('profile.credentialId')}
                  style={styles.input}
                  value={state.user?.credentialId}
                  disabled
                />
                <TextInput
                  label={t('profile.role')}
                  style={styles.input}
                  value={getRoleName(state.user?.role?.id || 0)}
                  disabled
                />
                <TextInput label={t('profile.branch')} style={styles.input} value={state.user?.branch?.name} disabled />
                <Controller
                  control={control}
                  name="username"
                  defaultValue={state.user?.username}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.username')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.username}
                    />
                  )}
                />
                {errors.username && <Text text={errors.username?.message} style={styles.errorText} />}
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.password')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.password}
                    />
                  )}
                />
                {errors.password && <Text text={errors.password?.message} style={styles.errorText} />}
                <Controller
                  control={control}
                  name="confirmPassword"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('profile.confirmPassword')}
                      style={styles.input}
                      disabled={!isEdit}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.confirmPassword}
                    />
                  )}
                />
                {errors.confirmPassword && <Text text={errors.confirmPassword?.message} style={styles.errorText} />}
                {!isEdit ? (
                  <Button
                    mode="contained"
                    style={styles.btnEdit}
                    labelStyle={styles.btnLabel}
                    onPress={() => setEdit(true)}
                  >
                    {t('common.edit')}
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    style={styles.btnEdit}
                    labelStyle={styles.btnLabel}
                    onPress={handleSubmit(onSave)}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {t('common.save')}
                  </Button>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.modalContainer}>
          <Text i18nText="profile.dob" style={styles.modalTitle} />
          <Controller
            control={control}
            name="dob"
            defaultValue={new Date(state.user?.dob || 0)}
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
  )
}

const styles = ScaledSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    marginBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    fontSize: '18@vs',
    fontWeight: 'bold',
  },
  avatar: {
    alignItems: 'center',
    marginVertical: '20@s',
  },
  content: {
    flex: 1,
    padding: '10@s',
  },
  input: {
    backgroundColor: 'white',
    marginTop: '20@s',
  },
  dob: {
    backgroundColor: 'white',
    marginTop: '20@s',
    paddingHorizontal: '12@s',
    paddingVertical: '10@s',
    borderTopLeftRadius: '4@s',
    borderTopRightRadius: '4@s',
    borderBottomColor: 'rgb(180, 180, 180)',
  },
  dobTitle: {
    color: 'rgb(126, 126, 126)',
    fontSize: '11@s',
  },
  dobValue: {
    fontSize: '15@s',
    marginTop: '8@s',
  },
  btnEdit: {
    marginTop: '20@s',
    marginBottom: '40@s',
    height: '40@s',
    justifyContent: 'center',
  },
  btnLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16@s',
  },
  modalContainer: {
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
  },
  modalTitle: {
    fontSize: '25@s',
    fontWeight: 'bold',
    paddingVertical: '20@s',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: '10@vs',
  },
})

export default EditProfile
