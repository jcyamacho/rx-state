import React from 'react'
import { List } from 'antd'
import CocktailCard from './CocktailCard'
import { Drink } from 'services/cocktail'

interface Props {
  items: Drink[]
}

const CocktailList: React.FC<Props> = ({ items }) => {
  return (
    <List
      grid={{
        gutter: 4,
        column: 5,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5
      }}
      rowKey="id"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <CocktailCard value={item} />
        </List.Item>
      )}
    />
  )
}

export default CocktailList
