import React from 'react'
import { View, Linking } from 'react-native'
import { useQueryClient } from 'react-query'
import { Avatar, List, Subheading, Title } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'

import { useAppContext } from '@/contexts/app.context'
import { removeContext } from '@/contexts/app.action'
import { Touchable } from '@/common'
import Assets from '@/assets'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'

const Setting = () => {
  const { state, dispatch } = useAppContext()
  const queryClient = useQueryClient()
  const { i18n, t } = useTranslation()

  const logout = () => {
    dispatch(removeContext())
    queryClient.getQueryCache().clear()
  }

  const changeLanguage = () => {
    const language = i18n.language === 'en' ? 'vi' : 'en'
    i18n.changeLanguage(language)
  }

  const openPage = async () => {
    const url = 'https://github.com/hieunguyen300199'
    const supported = await Linking.canOpenURL(url)

    if (supported) await Linking.openURL(url)
  }

  const openResource = () => {
    navigate(ROUTER.APP.SETTING.RESOURCE)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image source={{ uri: state.user?.avatar }} size={180} />
        <View style={styles.userInfo}>
          <Title>{state.user?.fullName}</Title>
          <Subheading>{state.user?.email}</Subheading>
        </View>
      </View>

      <View style={styles.actionView}>
        <View style={styles.bgWhite}>
          <View style={styles.borderTop} />
          <Touchable style={styles.action} onPress={changeLanguage}>
            <List.Item
              style={styles.noPadding}
              title={t('setting.changeLanguage')}
              titleStyle={styles.actionText}
              left={() => <List.Icon icon={Assets.icon.language} />}
            />
          </Touchable>
          <View style={styles.borderMiddle} />
          <Touchable style={styles.action} onPress={openResource}>
            <List.Item
              style={styles.noPadding}
              title={t('setting.resource.title')}
              titleStyle={styles.actionText}
              left={() => <List.Icon icon={Assets.icon.resources} />}
            />
          </Touchable>
          <View style={styles.borderMiddle} />
          <Touchable style={styles.action} onPress={openPage}>
            <List.Item
              style={styles.noPadding}
              title={t('setting.aboutMe')}
              titleStyle={styles.actionText}
              left={() => <List.Icon icon={Assets.icon.info} />}
            />
          </Touchable>
          <View style={styles.borderMiddle} />
          <Touchable style={styles.action} disabled>
            <List.Item
              style={styles.noPadding}
              title={`${t('setting.version')} 1.0.0`}
              titleStyle={styles.muteText}
              left={() => <List.Icon icon={Assets.icon.physics} color="gray" />}
            />
          </Touchable>
          <View style={styles.borderBottom} />
        </View>
        <Touchable style={styles.actionLogout} onPress={logout}>
          <List.Item
            style={styles.noPadding}
            title={t('setting.logout')}
            titleStyle={styles.actionText}
            left={() => <List.Icon icon={Assets.icon.logout} />}
          />
        </Touchable>
      </View>
    </ScrollView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
    marginTop: '20@s',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: '15@s',
  },
  actionView: {
    marginVertical: '50@s',
  },
  action: {
    backgroundColor: 'white',
  },
  actionText: {
    fontSize: '15@s',
    fontWeight: 'bold',
  },
  noPadding: {
    padding: 0,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  borderMiddle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginLeft: '50@s',
    backgroundColor: 'white',
  },
  actionLogout: {
    backgroundColor: 'white',
    marginTop: '20@s',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  muteText: {
    fontSize: '15@s',
    fontWeight: 'bold',
    color: 'gray',
  },
})

export default Setting
