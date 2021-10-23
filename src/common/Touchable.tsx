import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface TouchableProps extends TouchableOpacityProps {
  children: React.ReactNode
}

const TouchableComponent: React.FC<TouchableProps> = ({ children, ...props }) => {
  return (
    <TouchableOpacity accessibilityRole="button" activeOpacity={0.5} {...props}>
      {children}
    </TouchableOpacity>
  )
}

export const Touchable = React.memo(TouchableComponent)
