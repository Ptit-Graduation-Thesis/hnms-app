import { useState } from 'react'

export const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState)

  const onChangeText = (text: string) => {
    setValue(text)
  }

  return [value, onChangeText]
}
