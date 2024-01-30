// 取得したtodoの一覧を表示する
//ListItemコンポーネントは1つのToDoを表示するためのコンポーネント

import PropTypes from 'prop-types'
import { memo } from 'react'

import styles from './index.module.css'

export const ListItem = memo(({ todo }) => {
  // memoコンポーネントの props が変更された場合のみ再レンダリングを行うためのもの
  return (
    <li className={styles['list-item']}>
      <div className={styles.task}>
        <div className={styles.title}>{todo.title}</div>
        {todo.description && (
          <div className={styles.description}>{todo.description}</div>
          //
        )}
      </div>
    </li>
  )
})

ListItem.displayName = 'ListItem'
ListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
}
