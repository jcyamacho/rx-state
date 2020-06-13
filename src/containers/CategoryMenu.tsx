import React, { useCallback, useEffect } from 'react'
import { take, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'
import { Menu } from 'antd'

import { useRxValue } from 'core/hooks'
import { categories$ } from 'services/drinks'

type Props = {
  onSelect?: Action<string>
}

const firstCategory$ = categories$.pipe(
  switchMap((list) => from(list)),
  take(1)
)

const CategoryMenu: React.FC<Props> = ({ onSelect }) => {
  const categories = useRxValue(categories$)
  const defaultSelected = useRxValue(firstCategory$)

  const selectCallback = useCallback(
    (ev) => {
      onSelect && onSelect(ev.key)
    },
    [onSelect]
  )

  useEffect(() => {
    if (defaultSelected) {
      onSelect && onSelect(defaultSelected)
    }
  }, [onSelect, defaultSelected])

  if (!defaultSelected) {
    return null
  }

  return (
    <Menu mode="inline" onSelect={selectCallback} defaultSelectedKeys={[defaultSelected]}>
      {categories?.map((c) => (
        <Menu.Item key={c}>{c}</Menu.Item>
      ))}
    </Menu>
  )
}

export default CategoryMenu
