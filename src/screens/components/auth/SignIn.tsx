import React from 'react'
import { View, Text } from 'react-native'
import { useMutation } from 'react-query'
import { Button } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'

import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'
import { useAppContext } from '@/contexts/app.context'
import { api } from '@/utils/axios'
import { updateContext } from '@/contexts/app.action'
import { OverlayLoading } from '@/common'

const params = {
  email: 'eve.holt@reqres.in',
  password: '123456',
}

const SignIn = () => {
  const { dispatch } = useAppContext()
  const { mutate, isLoading } = useMutation(() => api.post('/login', params), {
    onSuccess: async (res) => {
      dispatch(updateContext({ accessToken: res.data.token }))
    },
  })

  return (
    <View style={styles.container}>
      <OverlayLoading visible={isLoading} />

      <Text style={styles.textTitle}>Sign In</Text>
      <Button color="blue" onPress={() => mutate()}>
        Sign in
      </Button>
      <Button color="blue" onPress={() => navigate(ROUTER.AUTH.SIGN_UP)}>
        Go to Sign Up
      </Button>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
})

export default SignIn
