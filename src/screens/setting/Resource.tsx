import React from 'react'

import { Header, Layout } from '@/common'
import ResourceComponent from '@/screens/components/setting/Resource'

const Resource = () => (
  <Layout>
    <Header i18nText="setting.resource.title" canBack />
    <ResourceComponent />
  </Layout>
)

export default Resource
