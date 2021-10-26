import { useEffect, useState } from 'react'
import socketIO, { Socket } from 'socket.io-client'
import Config from 'react-native-config'

import { Alert } from 'react-native'
import { useAppContext } from '@/contexts/app.context'
import { SocketEvent } from '@/enums/socket-event'

export const useSocket = () => {
  const { state } = useAppContext()
  const [socket, setSoket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = socketIO(`${Config.API_URL}/chat-socket`, {
      timeout: 3000,
      transports: ['websocket'],
    })

    newSocket.on('connect', () => {
      newSocket?.emit(SocketEvent.AUTHENTICATE, { token: state.accessToken })
      newSocket.on(SocketEvent.UNAUTHORIZED, () => Alert.alert('Socket unauthorized'))
      setSoket(newSocket)
    })

    return () => {
      newSocket?.off(SocketEvent.UNAUTHORIZED)
      newSocket?.off('connect')
      newSocket.disconnect()
    }
  }, [state.accessToken])

  return socket
}
