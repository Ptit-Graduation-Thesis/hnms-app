import React from 'react'

import { Header, Layout } from '@/common'
import UserDetailComponent from '@/screens/components/home/UserDetail'

const UserDetail = () => (
  <Layout>
    <Header i18nText="home.userDetail" canBack />
    <UserDetailComponent />
  </Layout>
)

export default UserDetail
