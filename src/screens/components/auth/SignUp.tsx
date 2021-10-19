import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Button } from 'react-native-paper'

import { navigate } from '@/navigation/NavigationService'
import APP_ROUTER from '@/navigation/config/router'

const SignUp = () => (
  <View style={styles.container}>
    <Text style={styles.textTitle}>Sign Up</Text>

    <Button color="blue" onPress={() => navigate(APP_ROUTER.AUTH.SIGN_IN)}>
      Go to Sign In
    </Button>
  </View>
)

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

export default SignUp
