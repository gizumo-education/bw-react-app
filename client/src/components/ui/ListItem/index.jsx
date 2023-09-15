import PropTypes from 'prop-types'
import { memo } from 'react'

import styles from './index.module.css'
import { Button } from '../Button'
import { Icon } from '../Icon'

export const ListItem = memo(
  ({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
    return (
      <li className={styles['list-item']}>
        {todo.isCompleted ? (
          <Button
            buttonStyle='icon-only'
            className={styles['complete-button']}
            // ここの説明のところに関してもう少し具体的な理由が知りたい。
            // 考え的にListItem.defaultPropsでdefaultの返し方？を
            // 指定しているためそったdataの渡し方をしている。
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
            className={`{styles.title} ${
              todo.isCompleted ? styles['task-completed'] : ''
            }`}
          >
            {todo.title}
          </div>
          {todo.description && (
            <div
              className={`{styles.description} ${
                todo.isCompleted ? styles['task-completed'] : ''
              }`}
            >
              {todo.description}
            </div>
          )}
        </div>

        <div className={styles['task-action']}>
          {/* falseの時以下のhtml要素を表示する。 */}
          {!todo.isCompleted && (
            <>
              <Button
                buttonStyle='icon-only'
                // onEditButtonClickは引数にtodo.idが入って実行される関数だから
                // 関数名だけを渡してもエラーが発生する。
                // 一致していたら<Form />が表示される。
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
        </div>
      </li>
    )
  }
)

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
