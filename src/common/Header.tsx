import React from 'react'
import { Appbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ScaledSheet } from 'react-native-size-matters'

import { goBack } from '@/navigation/NavigationService'
import Assets from '@/assets'

interface IProps {
  i18nText: string
  canBack?: boolean
}

const HeaderComponent: React.FC<IProps> = ({ i18nText, canBack }) => {
  const { t } = useTranslation()

  return (
    <Appbar.Header style={styles.container}>
      {canBack && <Appbar.Action icon={Assets.icon.leftArrow} onPress={goBack} />}
      <Appbar.Content title={t(i18nText)} titleStyle={styles.title} />
    </Appbar.Header>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export const Header = React.memo(HeaderComponent)
