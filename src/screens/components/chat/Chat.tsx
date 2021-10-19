import React from 'react'
import { View } from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { ScaledSheet } from 'react-native-size-matters'

import Size from '@/assets/size'

interface IMessage {
  _id: number
  text: string
  createdAt: Date
  user: {
    _id: number
    name: string
    avatar: string
  }
}

const Chat = () => {
  const [messages, setMessages] = React.useState<IMessage[]>([])

  const onSend = React.useCallback((mess = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, mess))
  }, [])

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'How are you doing?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://hieunguyen300199.github.io/static-file/react-native-guide/react-native.png',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://hieunguyen300199.github.io/static-file/react-native-guide/react-native.png',
        },
      },
    ])
  }, [])

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        bottomOffset={Size.tabBarHeight}
        user={{ _id: 1 }}
        onSend={onSend}
        renderAvatarOnTop={true}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{ left: { backgroundColor: 'white' }, right: { backgroundColor: '#0084ff' } }}
          />
        )}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})

export default Chat
