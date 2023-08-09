
import { useState, useEffect, useCallback } from 'react' // 追加１ ＋useStateを追加２
import { axios } from '../../../utils/axiosConfig'
import { ListItem } from '../../ui/ListItem'
import { Layout } from '../../ui/Layout'
import { Button } from '../../ui/Button' //追加15
import { Icon } from '../../ui/Icon'  //追加15
import { Form } from '../../ui/Form' // 追加15
import { errorToast } from '../../../utils/errorToast'
import styles from './index.module.css'


// Topコンポーネント（親）
export const Top = () => {
  const [todos, setTodos] = useState([]) // 追加14
  const [editTodoId, setEditTodoId] = useState('') // 追加
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  const handleAddTaskButtonClick = useCallback(() => {//「タスクを追加」ボタンをクリックした時に実行される関数
    setInputValues({ title: '', description: '' })
    setEditTodoId('') // 追加
    setIsAddTaskFormOpen(true)
  }, [])
  // ↑ ToDoの追加フォームを表示する処理を実装

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')  // 追加
    setIsAddTaskFormOpen(false)
    setInputValues({ title: '', description: '' })
  }, []) //まずは、キャンセルボタンをクリックした時に実行するhandleCancelButtonClick関数
  // ↑ ToDoの追加フォームを非表示にする処理を実装

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])
  // ↑ ToDoのタイトルと説明の入力欄に入力した値をstateのinputValuesに反映する処理

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        setTodos((prevTodos) => [...prevTodos, data])// 追加したToDoを一覧に表示する
        // ToDoの追加フォームを非表示に
        setIsAddTaskFormOpen(false)
        setInputValues({ title: '', description: '' })
      })

        .catch((error) => {
          errorToast(error.message)
        })

    },
    [inputValues]
  )

  const handleEditedTodoSubmit = useCallback(  //編入するAPI通信
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/editTodoId`, inputValues)
        .then(({ data }) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === editTodoId ? { ...inputValues, ...data } : todo
            )  //  ↑三項演算子（? : ）を使った条件付きレンダー
          )
          setEditTodoId('')
          setInputValues({ title: '', description: '' })

        })
        // ToDoの編集のエラーハンドリングは、ToDoの編集のAPIを呼び出すhandleEditedTodoSubmit関数で行う
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
    [editTodoId, inputValues]
  )



  const handleEditButtonClick = useCallback(//編集ボタンが押された時の処理
    (id) => {
      setIsAddTaskFormOpen(false) //追加
      setEditTodoId(id)
      // ↓追加
      const targetTodo = todos.find((todo) => todo.id === id)
      setInputValues({
        title: targetTodo.title,
        description: targetTodo.description,
      })
      // ↑追加
    },
    [todos]
  )//依存配列にtodosを追加

  const handleDeleteButtonClick = useCallback((id) => {  //↓削除クリック
    // handleDeleteButtonClick関数は、引数に削除するToDoのidを受け取る
    axios
      .delete(`http://localhost:3000/todo/${id}`).then(({ data }) => {
        setTodos(data)
      })
      // ToDoの削除のエラーハンドリングは、ToDoの削除のAPIを呼び出すhandleDeleteButtonClick関数で行う。
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
  }, [])

  const handleToggleButtonClick = useCallback(  //18_完了・未完了API通信
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })

        .then(({ data }) => {
          // console.log(data)
          setTodos((prevTodos) =>
            // console.log(todos)
            prevTodos.map((todo) =>
              (todo.id === data.id ? data : todo))

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
    [todos]
  ) //105

  // 以下のuseEffectの処理を追加１
  //初回のレンダリング時に一回だけToDoリストを取得する↓
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data);      ////////解答＿ToDoの一覧表示

    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [])

  // レンダリング間でデータを保持することができる”state変数”（「state」）→todos
  // Reactに再度コンポーネントをレンダリングして欲しいと伝えることができるstate更新関数（「更新関数」）→setToDOs


  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
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
          // value...ToDoの追加フォームに入力された値を保持するstateを受け取る
          //  editTodoId...ToDoの追加フォームに入力された値をstateに反映させる関数を受け取る
          // onCancelClick...ToDoの追加フォームを閉じる関数を受け取る
          // onSubmit...ToDoの追加フォームの送信処理を行う関数を受け取る
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
          {/* ↓ liタグの中を全て置き換え */}
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onChange={handleInputChange} // onChangeを追加
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit} //追加 送信
            />
            //isAddTaskFormOpenがtrueの場合はToDoの追加フォームを表示
          ) : (   //////←何？
            <Button
              buttonStyle='indigo-blue'
              onClick={handleAddTaskButtonClick} // 追加
              className={styles['add-task']}
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
          {/*  ↑ liタグの中を全て置き換え */}
        </li>
      </ul>
    </Layout>
  )
}

// 追加１...[ToDoの一覧を取得]
///APIにリクエストを送ってToDoの一覧を取得していく。
///ToDoの一覧を取得する処理はレンダリング後に実行したい副作用にあたるので、useEffectを使用してAPI通信を行なっていきます。

// 追加２...

// useEffect()の第２関数に、空配列 [] を指定すると、初回のレンダリング(マウント)時にのみ、第１引数で指定したコールバック関数の中の処理が呼び出される。