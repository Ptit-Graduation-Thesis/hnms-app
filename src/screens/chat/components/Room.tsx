import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

import { goBack } from '@/navigation/NavigationService'
import { useSocket } from '@/hooks'
import Assets from '@/assets'
import { SocketEvent } from '@/enums/socket-event'
import { useAppContext } from '@/contexts/app.context'
import { useMessages } from '@/data/useMessages'

interface IRoute extends RouteProp<ParamListBase> {
  params: {
    roomId: number
    otherUserName: string
  }
}

interface IMessage {
  _id: number
  text: string
  createdAt: Date
  user: {
    _id: number
    name: string
  }
}

const Room = () => {
  const { state } = useAppContext()
  const route = useRoute() as IRoute
  const socket = useSocket()
  const { data: queryData, isFetchingNextPage, fetchNextPage, refetch } = useMessages(route.params.roomId)

  const [messages, setMessages] = React.useState<IMessage[]>([])

  const onSend = React.useCallback(
    (mess = []) => {
      socket?.emit(SocketEvent.CLIENT_SEND, { ...mess[0], roomId: route.params.roomId })
      setMessages((previousMessages) => GiftedChat.append(previousMessages, mess))
    },
    [socket, route],
  )

  const renderFooter = React.useCallback(() => {
    if (!isFetchingNextPage) return null
    return <ActivityIndicator color="#000" />
  }, [isFetchingNextPage])

  const handleBack = React.useCallback(() => {
    socket?.emit(SocketEvent.LEAVE_ROOM, { roomId: route.params.roomId })
    goBack()
  }, [route, socket])

  React.useEffect(() => {
    refetch()
  }, [refetch])

  React.useEffect(() => {
    if (queryData) {
      let newData: any[] = []
      queryData.pages.forEach((item) => {
        const messagesFormat = item.data?.map((mess: any) => ({
          _id: mess.id,
          text: mess.text,
          createdAt: mess.createdAt,
          user: {
            _id: mess.userId,
            name: mess.user.fullName,
          },
        }))
        newData = [...newData, ...messagesFormat]
      })
      setMessages(newData)
    }
  }, [queryData])

  React.useEffect(() => {
    socket?.emit(SocketEvent.JOIN_ROOM, { roomId: route.params.roomId })
    socket?.on(SocketEvent.CLIENT_RECIEPT, (payload) =>
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [payload])),
    )
    return () => {
      socket?.off(SocketEvent.CLIENT_RECIEPT)
    }
  }, [socket, route])

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon={Assets.icon.leftArrow} onPress={handleBack} />
        <Appbar.Content title={route.params.otherUserName} titleStyle={styles.title} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        user={{ _id: state.user?.id || 0 }}
        bottomOffset={StaticSafeAreaInsets.safeAreaInsetsBottom}
        onSend={onSend}
        renderAvatarOnTop
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{ left: { backgroundColor: 'white' }, right: { backgroundColor: '#0084ff' } }}
          />
        )}
        listViewProps={{
          onEndReachedThreshold: 0.5,
          onEndReached: fetchNextPage,
          ListFooterComponent: renderFooter,
        }}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Room
