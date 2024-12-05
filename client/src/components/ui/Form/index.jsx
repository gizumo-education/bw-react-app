import PropTypes from 'prop-types'
import { memo } from 'react'
import { Button } from '../Button'

import styles from './index.module.css'
//value	object	ToDoの追加フォームに入力された値を保持するstateを受け取る
//onChange	function	ToDoの追加フォームに入力された値をstateに反映させる関数を受け取る
//onCancelClick	function	ToDoの追加フォームを閉じる関数を受け取る
//onSubmit	function	ToDoの追加フォームの送信処理を行う関数を受け取る
export const Form = memo(({ value, onChange, onCancelClick, onSubmit }) => {
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
          type='submit'
          disabled={!value.title}
          className={styles['submit-button']}
        >
          タスクを追加
        </Button>
      </div>
    </form>
  )
})

Form.displayName = 'Form'
Form.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}