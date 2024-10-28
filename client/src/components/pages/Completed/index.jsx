import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useCallback, useEffect } from 'react'
import { Layout } from '../../ui/Layout'
import styles from './index.module.css'
import { completedTodoListState, todoState } from '../../../stores/todoState'
import { axios } from '../../../utils/axiosConfig'
import { errorToast } from '../../../utils/errorToast'
import { ListItem } from '../../ui/ListItem'

export const Completed = () => {
  const todos = useRecoilValue(completedTodoListState)
  const setTodos = useSetRecoilState(todoState)

  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({
          data
        }) => {
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

  useEffect(() => {
    axios
      .get('http://localhost:3000/todo')
      .then(({
        data
      }) => {
        setTodos(data)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }, [setTodos])


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