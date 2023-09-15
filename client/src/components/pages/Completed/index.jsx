// eslint-disable-next-line import/no-extraneous-dependencies
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Layout } from '../../ui/Layout'

import styles from './index.module.css'
import { errorToast } from '../../../utils/errorToast'
// eslint-disable-next-line import/order
import axios from 'axios'
// eslint-disable-next-line import/order
import { useCallback, useEffect } from 'react'
import { completedTodoListState, todoState } from '../../../stores/todoState'
import { ListItem } from '../../ui/ListItem'

export const Completed = () => {
  const todos = useRecoilValue(completedTodoListState) // 追加
  // マウント時、setTodosが更新された時に引数にdataを受け取りdataを保持している。
  // useSetRecoilValueは、コンポーネントに際レンダリングが発生しない
  // なぜuseSetRecoilStateを使っているかというと、
  // 不要なレンダリングが発生して欲しくないから。
  // そして、todoStateはatom内に書かれているので、
  // 保存したいため読み込みは必要ない。
  const setTodos = useSetRecoilState(todoState)

  // todosとsetTodosが更新された場合に実行される。
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          // クリックされたidとtodosという配列から特定のidをもつtodoを探し
          // そのtodoのisCompletedプロパティを取得
          // 取得したプロパティをサーバーに送信するデータを指定している
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // dataにはisCompletedがfalseの値のdataを受け取っている。
          console.log(data)
          // クリックされたdata.idとtodo配列にあるtodo.idが一致した場合クリックされた
          // dataを返す。それ以外はtodoを返す。
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
      .then(({ data }) => {
        setTodos(data)
      })
      .catch((error) => {
        errorToast(error.message)
      })
    // マウント時と、setTodos関数が更新されたときにuseEffect内の
    // 関数が処理される。
  }, [setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>完了済み一覧</h1>

      {todos.length ? (
        <ul className={styles.list}>
          {todos.map((todo) => (
            // console.log(todo)
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
