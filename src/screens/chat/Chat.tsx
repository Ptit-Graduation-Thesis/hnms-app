import React from 'react'

import { Header, Layout } from '@/common'
import ChatComponent from '@/screens/components/chat/Chat'

const Chat = () => {
  return (
    <Layout>
      <Header i18nText="chat.title" />
      <ChatComponent />
    </Layout>
  )
}

export default Chat
