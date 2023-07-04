import { memo } from 'react'
import styles from './index.module.css'

const NaviList = [
  {
    id: 1,
    lineName: 'ToDo一覧',
    path: '/top',
  },
]

export const Sidebar = memo(() => {
  return (
    <ul className={styles.sidebar}>
      {NaviList.map((list) => {
        return (
          <li className={styles.list} key={list.id}>
            <a href='/' className={styles['navi-item']}>
              {list.lineName}
            </a>
          </li>
        )
      })}
    </ul>
  )
})

Sidebar.displayName = 'Sidebar'
