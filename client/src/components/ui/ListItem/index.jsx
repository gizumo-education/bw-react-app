import PropTypes from 'prop-types'
import { memo } from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './index.module.css'

export const ListItem = memo(({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
  return (
    <li className={styles['list-item']}>
    <div className={styles['task-action']}>
      {todo.isCompleted ? (
          // ToDoボタンの実装
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
    </div>

      <div className={styles.task}>
      <div
        // ↓ classNameに'task-completed'を追加
        className={`${styles.title}
                    ${todo.isCompleted ? styles['task-completed'] : ''}`}
      >{todo.title}</div>

        {todo.description && (
      <div
        // ↓ classNameに'task-completed'を追加
        className={`${styles.description}
                    ${todo.isCompleted ? styles['task-completed'] : ''}`}
      >{todo.description}</div>
        )}
      </div>

      <div className={styles['task-action']}>
      {!todo.isCompleted && (
        <>
          {/* 編集ボタンの実装 */}
          <Button
              buttonStyle='icon-only'
              onClick={() => onEditButtonClick(todo.id)}
            >
              <Icon iconName='edit' color='indigo-blue' size='medium' />
            </Button>
            {/* 削除ボタンの実装 */}
            <Button
              buttonStyle='icon-only'
              onClick={() => onDeleteButtonClick(todo.id)}
            >
              <Icon iconName='trash' color='indigo-blue' size='medium' />
            </Button>
        </>
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
  onEditButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onToggleButtonClick: PropTypes.func.isRequired,
}

ListItem.defaultProps = {
  onEditButtonClick: () => {},
  onDeleteButtonClick: () => {},
}