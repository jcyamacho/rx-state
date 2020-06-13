import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

type Props = {
  value: Pick<Drink, 'name' | 'thumb'>
}

const CocktailCard: React.FC<Props> = ({ value }) => {
  return (
    <Card hoverable style={{ width: 230 }} cover={<img alt="example" src={value.thumb} />}>
      <Meta title={value.name} />
    </Card>
  )
}

export default CocktailCard
