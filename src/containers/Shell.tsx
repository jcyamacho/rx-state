import React from 'react'
import { Layout } from 'antd'

import DrinkList from 'components/DrinkList'
import CategoryMenu from './CategoryMenu'

import { useRxPipe } from 'core/hooks'
import * as drinks from 'services/drinks'

const { Header, Sider, Content } = Layout

export default () => {
  const [cocktails, setCategory] = useRxPipe(drinks.byCategory)

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>Cocktails</Header>
      <Layout>
        <Sider width={250} style={{ backgroundColor: 'rgb(20,20,20)' }}>
          <CategoryMenu onSelect={setCategory} />
        </Sider>
        <Content style={{ overflowY: 'auto' }}>
          <div style={{ padding: 20 }}>
            <DrinkList items={cocktails || []} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
