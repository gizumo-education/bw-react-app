import { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../ui/Layout'
import styles from './index.module.css'
import { axios } from '../../../utils/axiosConfig'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { incompleteTodoListState, todoState } from '../../../stores/todoState'

export const Top = () => {
  // const [todos, setTodos] = useState([])
  // 読み取り専用のフック atomの値は読み込みたいが更新が必要ない場合にしようする。
  const todos = useRecoilValue(incompleteTodoListState)
  // 書き込み専用のフック atomの値は読み込まないけど、更新は行いたい場合
  // useSetRecoilStateはコンポーネントに再レンダリングが発生しない
  // Recoilは、Atomの値が更新された時に、
  // そのAtomを読み込んでいるコンポーネントで再レンダリングを行います。
  const setTodos = useSetRecoilState(todoState)

  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  const [editTodoId, setEditTodoId] = useState('')

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    // console.log(name)
    // 指定されたname属性のvalueが更新される。
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])
  // state更新関数 コールバック関数

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        // 第一引数にapiのurlを指定、第二引数でサーバーに送信するデータを指定。
        .post('http://localhost:3000/todo', inputValues)
        .then(({ data }) => {
          // もとあるtodosをスプレッド構文で展開し新しく受け取ったtodoのdataを追加する。
          // console.log(data)
          setTodos((prevTodos) => [...prevTodos, data])
          setInputValues({
            title: '',
            description: '',
          })
          setIsAddTaskFormOpen(false)
        })
        .catch((error) => {
          errorToast(error.message)
        })
    },
    [inputValues, setTodos]
  )

  const handleEditButtonClick = useCallback(
    (id) => {
      setIsAddTaskFormOpen(false)
      // setEditTodoIdに引数で取ってきたidが入る
      setEditTodoId(id)

      // todos配列内の各要素を順番に調べている。
      // findメソッドは与えられた条件を満たす最初の要素を見つけ、その要素を返す。
      // 指定されたidに対応するToDo項目のisCompletedプロパティの値を取得している。
      // inputValuesに格納する。= フォームを開いた時にtodoのタイトルと説明が表示される。
      // findメソッドが自分が指定した条件を走らせてくれている。
      // その条件に合った時にfindメソッドが完了になる。
      const targetTodo = todos.find((todo) => todo.id === id)
      setInputValues({
        title: targetTodo.title,
        description: targetTodo.description,
      })
    },
    [todos]
  )

  const handleEditedTodoSubmit = useCallback(
    (event) => {
      // 元機能を停止する。
      event.preventDefault()
      // axiosを使用しAPI通信を行い、todoのタイトルと説明を更新
      // 第一引数にapiのurlを指定、第二引数でサーバーに送信するデータを指定。
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          // console.log(data)
          // 成功した時の処理。
          // prev.idとdata.idが一緒ならば編集されたdataを返しそれ以外ならば元のdataを返す。
          // 表示されているtodosをmapで回し、引数prevをとりprev.idとdata.idが
          // 一緒ならばdataを返す。そうでなければprevを返す。
          // 現在表示されているtodoをmapで回し、ひとつづつ確認

          setTodos((prevTodos) =>
            // 実行された時にあるtodoをmapで一つ一つ関数処理が走る。
            // 今回の場合で言うとクリックされたdata.idと全体を走らせたprev.idが一致した場合
            // dataを返す。そうでない場合はprevを返すと言う処理が走る。
            prevTodos.map((prev) => (prev.id === data.id ? data : prev))
          )
          // 直前のインプット内容が反映されてしまうから。初期化する
          setInputValues({ title: '', description: '' })
          // フォームが表示されたままになってしまうのでsetedittodoidも初期化
          setEditTodoId('')
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '更新するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [editTodoId, inputValues, setTodos]
  )

  const handleDeleteButtonClick = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:3000/todo/${id}`)
        .then(({ data }) => {
          setTodos(data)
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '削除するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [setTodos]
  )

  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          // todos配列内の各要素を順番に調べている。
          // findメソッドは与えられた条件を満たす最初の要素を見つけ、その要素を返す。
          // = 指定されたidに対応するToDo項目のisCompletedプロパティの値を取得している。
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // console.log(data)
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              // todo.idとdata.idが一致していた場合、isCompletedをtrueにかえる
              todo.id === data.id
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo
            )
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
  }, [setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // editTodoIdに格納されたTodoのidと、表示されているToDoのidが一致するかどうかで
          // 編集フォームの表示・非表示を切り替えていきましょう。
          // console.log(todo)
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <Form
                  value={inputValues}
                  editTodoId={editTodoId}
                  onChange={handleInputChange}
                  onCancelClick={handleCancelButtonClick}
                  onSubmit={handleEditedTodoSubmit}
                />
              </li>
            )
          }
          return (
            <ListItem
              key={todo.id}
              todo={todo}
              onEditButtonClick={handleEditButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick}
              onToggleButtonClick={handleToggleButtonClick}
            />
          )
        })}

        <li>
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onCancelClick={handleCancelButtonClick}
              onChange={handleInputChange}
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              className={styles['add-task']}
              onClick={handleAddTaskButtonClick}
            >
              <Icon
                iconName='plus'
                color='orange'
                size='medium'
                className={styles['plus-icon']}
              />
              タスクを追加
            </Button>
          )}
        </li>
      </ul>
    </Layout>
  )
}
