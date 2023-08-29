import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'

export const Top = () => {
  // 取得したToDoの一覧を管理するstate
  const [todos, setTodos] = useState([])

  // ToDoの編集フォームの表示・非表示を切り替えるためのstate
  const [editTodoId, setEditTodoId] = useState('')

  // ToDoの追加フォームに入力された値を保持するためのstate
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  // 追加フォームの表示・非表示を管理するためのstate
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // 「タスクを追加」ボタンをクリックした時に実行する関数
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  // 追加フォームのキャンセルボタンをクリックした時に実行する関数
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  // ToDoのタイトルと説明の入力欄に入力した値をstateのinputValuesに反映する
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // ToDoの一覧を取得するAPIリクエスト
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // ▼ToDoの一覧を表示する 練習問題１＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▼
      // console.log(data)
      setTodos(data)
      // ▲ ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
    })
      .catch((error) => {
        errorToast(error.message)
      })
  }, [])

  // 追加したToDoが一覧に表示される処理
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // ▼練習問題２＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▼
        // 追加したToDoが一覧に表示される処理
        setTodos((prevTodos) => [...prevTodos, data]);
        // ToDoの追加フォームを非表示にする
        setIsAddTaskFormOpen(false)
        // ToDoの追加フォームの入力欄を空にする
        setInputValues({ title: '', description: '' })
        // ▲＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
      })
    },
    [inputValues]
  )

  // 保存ボタンをクリックした時にToDoのタイトルと説明を更新する処理
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          console.log(data)
          // ▼練習問題３＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▼
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === data.id
                ? {
                  ...todo,
                  title: data.title,
                  description: data.description,
                }
                : todo
            )
          )

          // ToDoの編集フォームを非表示に
          setEditTodoId('')
        })
        // ▲＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
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

  // 編集ボタンがクリックされた時にeditTodoIdに編集するToDoのidを格納
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])


  const handleDeleteButtonClick = useCallback((id) => {
    // ▼ToDoの削除ボタンをクリックした時に実行する関数 練習問題４＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▼
    axios.delete(`http://localhost:3000/todo/${id}`).then((data) => {
      // 削除が成功した場合、レスポンスのdataの値をsetTodosに反映
      setTodos(data.data);
      console.log(data)
    })
      // ▲＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
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

  // 切り替えボタンをクリックした時にToDoの完了・未完了を切り替える処理
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // ▼練習問題切り替え後のToDoの完了・未完了の状態を画面に反映させる処理＊＊＊＊＊＊＊＊＊＊＊＊▼
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === data.id ? { ...todo, isCompleted: data.isCompleted } : todo
            )
          )
          console.log(data)
        })
        // ▲＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊▲
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
  )

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {

          // 編集フォームの表示・非表示を切り替え
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

          return <ListItem
            key={todo.id}
            todo={todo}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            onToggleButtonClick={handleToggleButtonClick}
          />
        })}

        <li>
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              onClick={handleAddTaskButtonClick}
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
        </li>
      </ul>
    </Layout>
  )
}
