import React, { useCallback, useRef } from 'react'
import { View, Image, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import { useMutation } from 'react-query'
import { TextInput } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import i18next from 'i18next'

import { useAppContext } from '@/contexts/app.context'
import { api } from '@/utils/axios'
import { updateContext } from '@/contexts/app.action'
import { OverlayLoading, Text, Touchable } from '@/common'
import Assets from '@/assets'
import { LoginType } from '@/types/login.types'

const schema = yup
  .object({
    username: yup.string().required(i18next.t('validate.required', { field: 'Username' })),
    password: yup.string().min(6, i18next.t('validate.min', { field: 'Password', length: 6 })),
  })
  .required()

const Login = () => {
  const { dispatch } = useAppContext()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const passwordRef = useRef<any>()

  const { mutate: login, isLoading } = useMutation((params: LoginType) => api.post('/auth/login', params), {
    onSuccess: (res) => {
      dispatch(updateContext(res.data))
    },
    onError: (err: AxiosError) => Alert.alert(err?.response?.data?.message),
  })

  const onSubmit = useCallback(
    (params: LoginType) => {
      login(params)
    },
    [login],
  )

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.bacgroundBlue} />
          <OverlayLoading visible={isLoading} />

          <Image source={Assets.image.logoSquares} style={styles.logo} />
          <View style={styles.form}>
            <Text i18nText="auth.login" style={styles.login} />
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  label={t('auth.username')}
                  value={value}
                  onSubmitEditing={() => passwordRef.current.focus()}
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
                  ref={passwordRef}
                  mode="outlined"
                  style={styles.input}
                  label={t('auth.password')}
                  value={value}
                  secureTextEntry
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  onBlur={onBlur}
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && <Text text={errors.password?.message} style={styles.errorText} />}
            <Touchable style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text i18nText="auth.login" style={styles.btnText} />
            </Touchable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = ScaledSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bacgroundBlue: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#1B9CFC',
  },
  logo: {
    width: '100@s',
    height: '100@s',
    borderRadius: '50@s',
  },
  form: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: '5@s',
    shadowColor: '#000',
    marginVertical: '50@s',
    padding: '15@s',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  login: {
    textAlign: 'center',
    fontSize: '25@s',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: '40@s',
    marginTop: '20@s',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9CFC',
    borderRadius: '20@s',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontSize: '15@s',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: '10@vs',
  },
  input: {
    marginTop: '10@s',
  },
})

export default Login
