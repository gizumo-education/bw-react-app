// ui/Form/index.jsx

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'

import styles from './index.module.css'

export const Form = memo(({ value, editTodoId, onChange, onCancelClick, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles['input-field']}>
        <input
          type='text'
          name='title'
          placeholder='タスク名'
          autoFocus
          value={value.title}
          onChange={onChange}
          className={styles['input-title']}
        />
        <textarea
          name='description'
          placeholder='説明'
          value={value.description}
          onChange={onChange}
          className={styles['input-description']}
        />
      </div>
      <div className={styles['button-area']}>
        <Button
          buttonStyle='cancel'
          className={styles['cancel-button']}
          onClick={onCancelClick}
        >
          キャンセル
        </Button>
        <Button
          type='submit' //formタグのonSubmitにとぶ＿11行目
          disabled={!value.title}
          className={styles['submit-button']}
        >
          {editTodoId ? '保存' : 'タスクを追加'}
        </Button>
      </div>
    </form>
  )
})
// editTodoIdをpropsとして受け取り、editTodoIdの値によって以下のように表示する文言を変更するようにしている。
  //●editTodoIdにidがセットされている場合は、ToDoの編集フォームが開いている時なので「保存」を表示
  //●editTodoIdにidがセットされていない場合は、ToDoの編集フォームが閉じている時なので「タスクを追加」を表示

Form.displayName = 'Form'
Form.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  editTodoId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
Form.defaultProps = {
  editTodoId: '',
}

// 入力値が変更された時に実行したいstateの更新関数を親コンポーネントからonChangeという名前で受け取り、onChange propsに指定している。