import React, { useCallback, useEffect } from 'react'
import { Menu } from 'antd'

import { useObservable } from 'core/reactive'
import { categories$ } from 'services/cocktail'
import { take, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'

const selected$ = categories$.pipe(
  switchMap((list) => from(list)),
  take(1)
)

interface Props {
  onSelect?: (c: string) => any
}

const CategoryList: React.FC<Props> = ({ onSelect }) => {
  const categories = useObservable(categories$)
  const selected = useObservable(selected$)

  const selectCallback = useCallback(
    (ev) => {
      onSelect && onSelect(ev.key)
    },
    [onSelect]
  )

  useEffect(() => {
    if (selected) {
      onSelect && onSelect(selected)
    }
  }, [onSelect, selected])

  if (!selected) {
    return null
  }

  return (
    <Menu mode="inline" onSelect={selectCallback} defaultSelectedKeys={[selected]}>
      {categories?.map((c) => (
        <Menu.Item key={c}>{c}</Menu.Item>
      ))}
    </Menu>
  )
}

export default CategoryList
