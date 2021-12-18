import React from 'react'
import { Avatar } from 'react-native-paper'

import { nonAccentVietnamese } from '@/utils/helper'

type AvatarProps = {
  label: string
  size: number
}

const AvatarTextComponent: React.FC<AvatarProps> = ({ label, size }) => {
  return (
    <Avatar.Text
      label={
        nonAccentVietnamese(label)
          .match(/\b(\w)/g)
          ?.join('')
          ?.toUpperCase() || ''
      }
      size={size}
      color={'white'}
      theme={{ colors: { primary: 'rgb(44, 63, 80)' } }}
    />
  )
}

export const AvatarText = React.memo(AvatarTextComponent)
