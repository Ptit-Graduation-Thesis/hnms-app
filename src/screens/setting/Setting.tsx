import React from 'react'

import { Header, Layout } from '@/common'
import SettingComponent from '@/screens/components/setting/Setting'

const Setting = () => (
  <Layout>
    <Header i18nText="setting.title" />
    <SettingComponent />
  </Layout>
)

export default Setting
