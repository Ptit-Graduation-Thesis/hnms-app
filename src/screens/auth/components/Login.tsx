import React, { useCallback, useRef, useState } from 'react'
import { View, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useMutation } from 'react-query'
import { TextInput } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

import { useAppContext } from '@/contexts/app.context'
import { api } from '@/utils/axios'
import { updateContext } from '@/contexts/app.action'
import { OverlayLoading, Text, Touchable } from '@/common'
import Assets from '@/assets'
import { LoginType } from '@/types/login.types'
import { validateLogin } from '@/utils/validate'

const Login = () => {
  const { dispatch } = useAppContext()
  const { t } = useTranslation()

  const passwordRef = useRef<any>()
  const [loginInfo, setLoginInfo] = useState<LoginType>()

  const { mutate: login, isLoading } = useMutation(() => api.post('/auth/login', loginInfo), {
    onSuccess: async (res) => {
      dispatch(updateContext({ ...res.data }))
    },
    onError: (err: AxiosError) => Alert.alert('Error', err?.response?.data?.message),
  })

  const onSubmit = useCallback(() => {
    if (!validateLogin(loginInfo)) {
      Alert.alert('Bad reqest')
      return
    }
    login()
  }, [login, loginInfo])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.bacgroundBlue} />
        <OverlayLoading visible={isLoading} />

        <Image source={Assets.image.logoSquares} style={styles.logo} />
        <View style={styles.form}>
          <Text i18nText="auth.login" style={styles.login} />
          <TextInput
            mode="outlined"
            label={t('auth.username')}
            value={loginInfo?.username}
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={(text) => setLoginInfo((old) => ({ ...old, username: text }))}
          />
          <TextInput
            ref={passwordRef}
            mode="outlined"
            label={t('auth.password')}
            value={loginInfo?.password}
            secureTextEntry
            onChangeText={(text) => setLoginInfo((old) => ({ ...old, password: text }))}
            onSubmitEditing={onSubmit}
          />
          <Touchable style={styles.button} onPress={onSubmit}>
            <Text i18nText="auth.login" style={styles.btnText} />
          </Touchable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = ScaledSheet.create({
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
    height: '240@s',
    backgroundColor: 'white',
    borderRadius: '5@s',
    shadowColor: '#000',
    marginVertical: '50@s',
    justifyContent: 'space-around',
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
})

export default Login
