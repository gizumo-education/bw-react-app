import PropTypes from 'prop-types'
import { memo } from 'react'
import { Top } from '../../pages/Top/index'
import { ListItem } from '../ListItem/index'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

import styles from './index.module.css'

export const Layout = memo(({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <Top />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
