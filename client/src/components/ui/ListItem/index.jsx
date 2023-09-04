// todoアプリ作成
import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'

import styles from './index.module.css'

export const ListItem = memo(({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
  return (
    <li className={styles['list-item']}>
      {/* 下記から完了未完了 */}
      {todo.isCompleted ? (
        <Button
          buttonStyle='icon-only'
          className={styles['complete-button']}
          onClick={() => onToggleButtonClick(todo.id)}
        >
          <Icon
            iconName='check'
            size='large'
            color='orange'
          />
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
      {/* 上記まで完了未完了 */}
      <div className={styles.task}>
        <div
          className={`${styles.title}
          ${todo.isCompleted ? styles['task-completed'] : '' // 完了未完了のcssをisCompletedがforusの時にtask-completedを付与して、turuの時に無くす処理
            }`}
        >
          {todo.title}
        </div>
        {todo.description && (
          <div
            className={`${styles.description}
            ${todo.isCompleted ? styles['task-completed'] : '' // 完了未完了の
              }`}
          >
            {todo.description}
          </div>
        )}
      </div>

      <div className={styles['task-action']}>
        {/* <Button
          buttonStyle='icon-only'
          onClick={() => onEditButtonClick(todo.id)}
        >
          <Icon iconName='edit' color='indigo-blue' size='medium' />
        </Button>
        {/* 下記から消去 */}
        {/* <Button
          buttonStyle='icon-only'
          onClick={() => onDeleteButtonClick(todo.id)}
        >
          <Icon iconName='trash' color='indigo-blue' size='medium' />
        </Button> */}
        {/* 消去終わり */}
        {/*↓ divタグの中を全て置き換え、完了済みのToDoの場合は表示しないように変更 */}
        {!todo.isCompleted && (
          <>
            <Button
              buttonStyle='icon-only'
              onClick={() => onEditButtonClick(todo.id)}
            >
              <Icon iconName='edit' color='indigo-blue' size='medium' />
            </Button>
            <Button
              buttonStyle='icon-only'
              onClick={() => onDeleteButtonClick(todo.id)}
            >
              <Icon iconName='trash' color='indigo-blue' size='medium' />
            </Button>
          </>
        )}
        {/*↑ divタグの中を全て置き換え、完了済みのToDoの場合は表示しないように変更 */}
      </div>
    </li>
  )
})

// todoアプリ作成
ListItem.displayName = 'ListItem'
ListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
    // ここまでtodoアプリ作成の記述
  }).isRequired,

  // ↓ isRequiredを削除
  // onEditButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func,

  // ↓ isRequiredを削除
  // 下記消去
  // onDeleteButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func,

  // 下記完了未完了
  onToggleButtonClick: PropTypes.func.isRequired,
}

// ↓ defaultPropsを追加（リコイル）
ListItem.defaultProps = {
  onEditButtonClick: () => {},
  onDeleteButtonClick: () => {},
}
