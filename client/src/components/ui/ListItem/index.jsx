// ui/ListItem/index.jsx

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'

import styles from './index.module.css'

export const ListItem = memo(
  ({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
    return (
      <li className={styles['list-item']}>
        {/* // ToDoの状態変更（完了・未完了の切り替え） */}
        {todo.isCompleted ? (
          <Button
            buttonStyle='icon-only'
            className={styles['complete-button']}
            onClick={() => onToggleButtonClick(todo.id)}
          >
            <Icon iconName='check' size='large' color='orange' />
          </Button>
        ) : (
          <Button
            buttonStyle='icon-only'
            className={styles['complete-button']}
            onClick={() => onToggleButtonClick(todo.id)}
          >
            <Icon
              iconName='circle'
              size='medium'
              className={styles['circle-icon']}
            />
          </Button>
        )}

        <div className={styles.task}>
          <div
            // ↓ classNameに'task-completed'を追加
            // todo.isCompletedがtrueの場合は、task-completedというクラスを付与するようにしています。
            // task-completedクラスには、打ち消し線を引くためのスタイルが定義されています。
            className={`${styles.title} ${todo.isCompleted ? styles['task-completed'] : ''
              }`}
          >
            {todo.title}
          </div>
          {todo.description && (
            <div
              // ↓ classNameに'task-completed'を追加
              className={`${styles.description} ${todo.isCompleted ? styles['task-completed'] : ''
                }`}
            >
              {todo.description}
            </div>
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
          {/* 削除ボタン */}
          <Button
            buttonStyle='icon-only'
            onClick={() => onDeleteButtonClick(todo.id)}
          >
            <Icon iconName='trash' color='indigo-blue' size='medium' />
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
  onEditButtonClick: PropTypes.func.isRequired, // 編集
  onDeleteButtonClick: PropTypes.func.isRequired, // 削除
  onToggleButtonClick: PropTypes.func.isRequired, // 追加
}