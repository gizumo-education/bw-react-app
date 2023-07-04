import { memo } from 'react'
import styles from './index.module.css'

export const Header = memo(() => {
  return (
    <header className={styles.header}>
      <p className={styles.text}>React ToDo App</p>
    </header>
  )
})

Header.displayName = 'Header'
