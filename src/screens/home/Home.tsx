import React from 'react'

import { Header, Layout } from '@/common'
import HomeComponent from '@/screens/components/home/Home'

const Home = () => (
  <Layout>
    <Header i18nText="home.title" />
    <HomeComponent />
  </Layout>
)

export default Home
