import { memo } from 'react'
import { NavLink } from 'react-router-dom' // 追加
// ↑ NavLinkコンポーネント...クリックした際にページ遷移を行うためのコンポーネント.
  // 動きとしてはHTMLのaタグと一緒だが、aタグとは違い、ページ遷移を行う際にページ全体がリロードされない。
    // これにより、SPAの特徴である高速なページ遷移を実現することが出来る。
import { Icon } from '../Icon' // 追加

import styles from './index.module.css'

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
    ////////////////////
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
  ////////////////////
  )
})

Sidebar.displayName = 'Sidebar'




// 追記
// ２行目＿もう一つの特徴として、現在のURLとNavLinkコンポーネントのpropsであるtoの値が一致している場合には、
// activeクラスが付与されます。これにより、現在表示しているページのリンクの背景色を変更するなどして、
// ユーザーに現在表示しているページであることをわかりやすくすることができます。


// 元
// import { memo } from 'react'

// import styles from './index.module.css'

// const NaviList = [
//   {
//     id: 1,
//     lineName: 'ToDo一覧',
//     path: '/top',
//   },
// ]

// export const Sidebar = memo(() => {
//   return (
//     <ul className={styles.sidebar}>
//       {NaviList.map((list) => {
//         return (
//           <li className={styles.list} key={list.id}>
//             <a href='/' className={styles['navi-item']}>
//               {list.lineName}
//             </a>
//           </li>
//         )
//       })}
//     </ul>
//   )
// })

// Sidebar.displayName = 'Sidebar'