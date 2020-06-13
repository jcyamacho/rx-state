import React from 'react'
import { Layout } from 'antd'

import CategoryList from './CategoryList'
import CocktailList from 'components/CocktailList'

import { useSwitchMap } from 'core/reactive'
import { getCocktailsByCategory } from 'services/cocktail'

const { Header, Sider, Content } = Layout

export default () => {
  const [cocktails, setCategory] = useSwitchMap(getCocktailsByCategory)

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>Cocktails</Header>
      <Layout>
        <Sider width={250} style={{ backgroundColor: 'rgb(20,20,20)' }}>
          <CategoryList onSelect={setCategory} />
        </Sider>
        <Content style={{ overflowY: 'auto' }}>
          <div style={{ padding: 20 }}>
            <CocktailList items={cocktails || []} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
