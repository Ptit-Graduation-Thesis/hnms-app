import React from 'react'

import { Image, ImageProps } from 'react-native'

interface IconProps extends ImageProps {
  size: number
  tintColor?: string
}

const IconComponent: React.FC<IconProps> = ({ size, tintColor, style, ...props }) => {
  return <Image style={[{ width: size, height: size, resizeMode: 'contain', tintColor }, style]} {...props} />
}

export const Icon = React.memo(IconComponent)
