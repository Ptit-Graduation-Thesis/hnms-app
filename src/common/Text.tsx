import React from 'react'
import { StringMap, TOptions } from 'i18next'
import { useTranslation } from 'react-i18next'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Themes } from '@/assets/themes'

interface TextProps extends RNTextProps {
  text: string
  color?: string
  i18nText?: never
  i18nValue?: never
}

interface I18nTextProps extends RNTextProps {
  text?: never
  color?: string
  i18nText: string
  i18nValue?: TOptions<StringMap>
}

const TextComponent: React.FC<TextProps | I18nTextProps> = ({ text, i18nText, i18nValue, color, style, ...props }) => {
  const { t } = useTranslation()

  return (
    <RNText style={[{ color }, styles.text, style]} {...props}>
      {text || t(i18nText || '', i18nValue)}
    </RNText>
  )
}

const styles = ScaledSheet.create({
  text: {
    fontFamily: Themes.fonts.defaultFont,
    color: '#2C3A47',
  },
})

export const Text = React.memo(TextComponent)
