const common = {
  white: '#fff',
  transparent: 'transparent',
  black: '#000',
  blue: 'blue',
  placeHolderGray: 'rgba(216, 216, 216, 0.6)',
  borderInputError: '#ff0000',
  green: 'green',
  red: 'red',
  periwinkle: '#CBD9FF',
  pattensBlue: '#DBEFFF',
  mandysPink: '#F0ADB4',
  bananaMania: '#FBE4AD',
  iceCold: '#BAF7E3',
  lightGray: '#F8F8F8',
  purpure: '#7B80FF',
  manatee: '#9496A6',
  frenchGray: '#C4C4C4',
}

const Light = {
  colors: {
    ...common,
    primary: '#1B3372',
    secondary: '#6C93F9',
    periwinkle: '#B0C4FA',
    textPrimary: '#000000',
    textSecondary: '#607d8b',
    doneOderColor: '#35D287',
    deliverOderColor: '#F5B210',
    lineSecondary: '#E3E5FD',
    collectionOrder: '#DDCDF4',
  },
}

const Dark = {
  colors: {
    ...common,
    primary: '#607d8b',
    secondary: '#607d8b',
    textPrimary: '#607d8b',
    textSecondary: '#607d8b',
    doneOderColor: '#35D287',
    deliverOderColor: '#F5B210',
    lineSecondary: '#E3E5FD',
  },
}

export const Themes = Light

export const ThemesDark = Dark
