import React from 'react'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'
import { List, Subheading, Title } from 'react-native-paper'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

import { useAppContext } from '@/contexts/app.context'
import { changeLanguage, removeContext } from '@/contexts/app.action'
import { AvatarText, Touchable } from '@/common'
import Assets from '@/assets'
import { navigate } from '@/navigation/NavigationService'
import ROUTER from '@/navigation/config/router'

const Setting = () => {
  const { state, dispatch } = useAppContext()
  const queryClient = useQueryClient()
  const { i18n, t } = useTranslation()

  const logout = React.useCallback(() => {
    dispatch(removeContext())
    queryClient.getQueryCache().clear()
  }, [dispatch, queryClient])

  const toggleLanguage = React.useCallback(() => {
    const language = i18n.language === 'en' ? 'vi' : 'en'
    dispatch(changeLanguage(language))
  }, [dispatch, i18n.language])

  const gotoEditProfile = React.useCallback(() => navigate(ROUTER.APP.PROFILE.EDIT_PROFILE), [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatar}>
        <AvatarText label={state.user?.fullName || ''} size={scale(100)} />
        <View style={styles.userInfo}>
          <Title>{state.user?.fullName}</Title>
          <Subheading>{state?.user?.branch?.name}</Subheading>
        </View>
      </View>

      <View style={styles.actionView}>
        <View style={styles.bgWhite}>
          <View style={styles.borderTop} />
          <Touchable style={styles.action} onPress={gotoEditProfile}>
            <List.Item
              style={styles.noPadding}
              title={t('profile.editProfile')}
              titleStyle={styles.actionText}
              left={() => <List.Icon icon={Assets.icon.editProfile} />}
            />
          </Touchable>
          <View style={styles.borderMiddle} />
          <Touchable style={styles.action} onPress={toggleLanguage}>
            <List.Item
              style={styles.noPadding}
              title={t('profile.changeLanguage')}
              titleStyle={styles.actionText}
              left={() => <List.Icon icon={Assets.icon.language} />}
            />
          </Touchable>
          <View style={styles.borderMiddle} />
          <Touchable style={styles.action} disabled>
            <List.Item
              style={styles.noPadding}
              title={`${t('profile.version')} 1.0.0`}
              titleStyle={styles.muteText}
              left={() => <List.Icon icon={Assets.icon.physics} color="gray" />}
            />
          </Touchable>
          <View style={styles.borderBottom} />
        </View>
        <Touchable style={styles.actionLogout} onPress={logout}>
          <List.Item
            style={styles.noPadding}
            title={t('profile.logout')}
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
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop,
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
