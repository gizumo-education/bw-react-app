// ui/ListItem/index.jsx

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'

import styles from './index.module.css'

export const ListItem = memo(({ todo, onEditButtonClick }) => {
  return (
    <li className={styles['list-item']}>
      <div className={styles.task}>
        <div className={styles.title}>{todo.title}</div>
        {todo.description && (
          <div className={styles.description}>{todo.description}</div>
        )}
      </div>

    {/* 編集ボタンが表示されている */}
    {/* 編集ボタンをクリックした時に、onEditButtonClickというpropsで渡された関数を実行する */}
    <div className={styles['task-action']}>
      <Button
        buttonStyle='icon-only'
        onClick={() => onEditButtonClick(todo.id)}
      >
        <Icon iconName='edit' color='indigo-blue' size='medium' />
      </Button>
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
  onEditButtonClick: PropTypes.func.isRequired, // 追加
}