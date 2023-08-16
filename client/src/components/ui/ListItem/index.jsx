// ui/ListItem/index.jsx

// ListItemコンポーネント ↓
// ToDoのデータを受け取って、ToDoのタイトルと説明を表示するコンポーネント

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button' //追加
import { Icon } from '../Icon' //追加

import styles from './index.module.css'

// ListItemコンポーネントは、ToDoのデータをpropsとして受け取り、ToDoのタイトルと説明を表示するコンポーネントです.
// つまり、＊ListItemコンポーネントは1つのToDoを表示するためのコンポーネントということ
// ListItem コンポーネント（子）
export const ListItem = memo(({ todo, onEditButtonClick, onDeleteButtonClick, onToggleButtonClick }) => {
  return (
    <li className={styles['list-item']}>


      {/* ↓完了・未完了＿切り替えボタンの表示 */}
      {/* 切り替えボタンをクリックした時に、onToggleButtonClickというpropsで渡された関数を実行するようにしている↓ */}
      {/* 条件演算子を使用して、 */}
      {/* ToDoが完了しているかどうかで表示するアイコンが変わるため、todo.isCompletedの値によって表示するアイコンが変わるように! */}

      {todo.isCompleted ? (   //isCompleted→Top>138行目
        <Button  //↓クリックアクション有りの場合： ✔️
          buttonStyle='icon-only'
          className={styles['complete-button']}
          onClick={() => onToggleButtonClick(todo.id)}
        >
          <Icon iconName='check' size='large' color='orange' />
        </Button>
      ) : (  //↓クリックアクション無しの場合： ◯
        <Button
          buttonStyle='icon-only'
          className={styles['complete-button']}
          onClick={() => onToggleButtonClick(todo.id)}
        >
          <Icon iconName='circle' size='medium' className={styles['circle-icon']} />
        </Button>
      )}
      {/* ↓完了済みToDoには打ち消しぼう↓ */}
      <div className={styles.task}>
        {/*↓ classNameに'task-completed'を追加 */}
        <div
        className={`${styles.title} ${
          todo.isCompleted ? styles['task-completed'] : ''
        }`}
      >
        {todo.title}
        </div>
        {todo.description && (
          <div
            // ↓ classNameに'task-completed' を追加
            className={`${styles.description} ${
              todo.isCompleted ? styles['task-completed'] : ''
            }`}
          >
            {todo.description}
          </div>
        )}


      </div>
      {/* //↓編集ボタンの追加// */}
      <div className={styles['task-action']}>
        <Button
          buttonStyle='icon-only'
          onClick={() => onEditButtonClick(todo.id)}
        >
          <Icon iconName='edit' color='indigo-blue' size='medium' />
        </Button>


        {/* //↓削除ボタンの追加// */}
        {/* 削除ボタンをクリックした時に、onDeleteButtonClickというpropsで渡された関数を実行するようにしている。↓ */}
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

  // 10行目で、propsとして受け取るtodoは、以下のようなデータ構造のオブジェクト
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onToggleButtonClick: PropTypes.func.isRequired,
}