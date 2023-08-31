// フォーム作成
import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'

import styles from './index.module.css'

// value, onChange, onCancelClick, onSubmitを追加機能で使用
// memoは再度読み込んだ時に変化がない値は、コンピュータの画面に対する表示をしないと言うことができるメゾット
export const Form = memo(({ value, onChange, onCancelClick, onSubmit, editTodoId }) => {
  return (
    // onSubmitが送信ボタンがクリックされたときの記述
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles['input-field']}>
        <input
          type='text'
          name='title'
          placeholder='タスク名'
          autoFocus
          value={value.title}
          // onChangeがフォームの入力が更新された時の記述
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
          // キャンセルボタンがクリックされたとき記述
          onClick={onCancelClick}
        >
          キャンセル
        </Button>
        <Button
          type='submit'
          disabled={!value.title }
          className={styles['submit-button']}
        >
          {editTodoId ? '保存' : 'タスクを追加'}
        </Button>
      </div>
    </form>
  )
})

// editTodoId以外を追加で使用記述
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
