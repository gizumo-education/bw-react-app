import PropTypes from 'prop-types'
import { memo } from 'react'

import { Button } from '../Button' // 追加
import { Icon } from '../Icon' // 追加

import styles from './index.module.css'

export const ListItem = memo(({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
  return (
    <li className={styles['list-item']}>

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
      {/* // ↓ 追加 */}
      <div className={styles['task-action']}>
        <Button
          buttonStyle='icon-only'
          onClick={() => onEditButtonClick(todo.id)}
        >
          <Icon iconName='edit' color='indigo-blue' size='medium' />
        </Button>
      </div>
      {/* // ↑ 追加 */}
      <Button
        buttonStyle='icon-only'
        onClick={() => onDeleteButtonClick(todo.id)}
      >
        <Icon iconName='trash' color='indigo-blue' size='medium' />
      </Button>

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
  onDeleteButtonClick: PropTypes.func.isRequired,
  onToggleButtonClick: PropTypes.func.isRequired,
}