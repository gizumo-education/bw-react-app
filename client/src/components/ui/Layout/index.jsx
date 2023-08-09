import PropTypes from 'prop-types'
import { memo } from 'react'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

import styles from './index.module.css'
// children を受け取り→受け取ったもの<h1>をメインコンテンツとして表示されている。
// →→ メインコンテンツに表示したい要素を＜Layout＞タグの中に書く。
export const Layout = memo(({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
