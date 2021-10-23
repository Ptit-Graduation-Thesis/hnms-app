import { DefaultTheme } from 'react-native-paper'

const common = {
  white: '#fff',
  transparent: 'transparent',
}

const fonts = {
  defaultFont: 'Montserrat-Regular',
  boldFont: 'Montserrat-SemiBold',
  thinFont: 'Montserrat-Light',
}

const Light = {
  colors: {
    ...common,
    primary: '#EE1B54',
    secondary: '#2E75B6',
    black: '#000000',
    white: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#607d8b',
    iron: '#DADCE0',
    jacksonsPurple: '#1c348c',
    blackRussian: '#010002',
    athensGray: '#E4E6EB',
    tundora: '#484848',
    fiord: '#475574',
    meteorite: '#2A226A',
    shark: '#1E1E21',
    alabaster: '#FAFAFA',
    steelBlue: '#4886BF',
    mauve: '#F194FF',
  },
  fonts,
}

const Dark = {
  colors: {
    ...common,
    primary: '#607d8b',
    secondary: '#607d8b',
    textPrimary: '#607d8b',
    textSecondary: '#607d8b',
  },
  fonts,
}

export const RNPThemes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B9CFC',
  },
}

export const Themes = Light
export const ThemeDark = Dark
