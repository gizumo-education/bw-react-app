import { memo } from 'react'
import styles from './index.module.css'

const NaviList = [
  {
    id: 1,
    lineName: 'Todo一覧',
    path: '/top',
  },
  {
    id: 2,
    lineName: 'アカウント情報',
    path: '/account',
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
