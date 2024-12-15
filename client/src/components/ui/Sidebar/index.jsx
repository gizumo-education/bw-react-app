import { memo } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom'
// NavLinkコンポーネント：クリックした際にページ遷移を行うためのコンポーネント
// 動きとしてはHTMLのaタグと同じですが、aタグと違いページ遷移を行う際にページ全体がリロードされないため、
// SPAの特徴である高速なページ遷移を実現することができます。
// また、もう一つの特徴として、現在のURLとNavLinkコンポーネントのpropsであるtoの値が一致している場合には、activeクラスが付与されます。
// これにより、現在表示しているページのリンクの背景色を変更するなどして、ユーザーに現在表示しているページであることをわかりやすくすることができます。
import { Icon } from '../Icon'

import styles from './index.module.css'

// サイドバーリンク用リスト
const NaviList = [
  {
    id: 1,
    lineName: 'すべて',
    path: '/',
    iconName: 'todoList',
  },
  {
    id: 2,
    lineName: '完了済み',
    path: '/completed',
    iconName: 'completeList',
  },
]

export const Sidebar = memo(() => {
  return (
    <ul className={styles.sidebar}>
      <li className={['sidebar-list']}>
        <p className={styles.category}>ToDo</p>
        <ul className={styles.list}>
          {NaviList.map((list) => {
            return (
              <li className={styles['list-item']} key={list.id}>
                <NavLink
                  to={list.path}
                  end
                  className={({ isActive }) => {
                    return isActive
                      ? `${styles['navi-item']} ${styles.active}`
                      : [styles['navi-item']]
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        iconName={list.iconName}
                        color={isActive ? 'dark-blue' : 'indigo-blue'}
                        size='medium'
                        className={styles.icon}
                      />
                      <span className={styles.text}>{list.lineName}</span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </li>
    </ul>
  )
})

Sidebar.displayName = 'Sidebar'
