import { useEffect, useCallback } from 'react' // 追加
import { useRecoilValue, useSetRecoilState } from 'recoil' // 追加
import { axios } from '../../../utils/axiosConfig' // 追加
import { todoState, completedTodoListState } from '../../../stores/todoState' // 追加

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem' // 追加

import { errorToast } from '../../../utils/errorToast' // 追加

import styles from './index.module.css'

export const Completed = () => {
  const todos = useRecoilValue(completedTodoListState) // 追加
  const setTodos = useSetRecoilState(todoState) // 追加

  // ↓ 追加
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === data.id ? data : todo))
          )
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '完了・未完了を切り替えるToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [todos, setTodos]
  )
  // ↑ 追加

  // ↓ 追加
  useEffect(() => {
    axios
      .get('http://localhost:3000/todo')
      .then(({ data }) => {
        setTodos(data)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }, [setTodos])
  // ↑ 追加

  return (
    <Layout>
      <h1 className={styles.heading}>完了済み一覧</h1>
      {todos.length ? (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              onToggleButtonClick={handleToggleButtonClick}
            />
          ))}
        </ul>
      ) : (
        <p className={styles['no-todo']}>完了済みのToDoはありません。</p>
      )}
    </Layout>
  )
}