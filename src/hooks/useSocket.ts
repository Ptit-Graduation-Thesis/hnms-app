import { useEffect, useState } from 'react'

import socketIO, { Socket } from 'socket.io-client'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useAppContext } from '@/contexts/app.context'
import { SocketEvent } from '@/enums/socket-event'

import Config from 'react-native-config'

export const useSocket = () => {
  const { state } = useAppContext()
  const { t } = useTranslation()

  const [socket, setSoket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = socketIO(`${Config.API_URL}/chat-socket`, {
      timeout: 3000,
      transports: ['websocket'],
    })

    newSocket.on('connect', () => {
      newSocket?.emit(SocketEvent.AUTHENTICATE, { token: state.accessToken })
      newSocket.on(SocketEvent.UNAUTHORIZED, () => Alert.alert(t('alert.socketError')))
      setSoket(newSocket)
    })

    return () => {
      newSocket?.off(SocketEvent.UNAUTHORIZED)
      newSocket?.off('connect')
      newSocket.disconnect()
    }
  }, [state.accessToken, t])

  return socket
}
