import React from 'react'
import { StyleProp, ViewStyle, Pressable, PressableProps } from 'react-native'

interface TouchableProps extends PressableProps {
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?(): void
  onPressIn?(): void
  onPressOut?(): void
  onLongPress?(): void
}

const TouchableComponent: React.FC<TouchableProps> = ({ disabled, style, children, ...props }) => {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      android_disableSound
      focusable
      hitSlop={5}
      style={({ pressed }) => [
        style,
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export const Touchable = React.memo(TouchableComponent)
